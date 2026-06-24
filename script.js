/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║   MOTOR DA PÁGINA · Lucca Cafés Especiais                                 ║
   ║   Você normalmente NÃO precisa mexer aqui. Para trocar de café, edite     ║
   ║   apenas o arquivo dados-receita.js.                                      ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */
(function () {
  'use strict';

  const DEBUG = false;
  const log = (...a) => { if (DEBUG) console.log(...a); };

  /* ───────── Conteúdo (vem do dados-receita.js) ───────── */
  const R = window.RECIPE;
  if (!R || !R.method) {
    console.error('[Receita] dados-receita.js não carregou — RECIPE indefinido. A página não foi montada.');
    return;
  }
  const M = R.method;

  /* ───────── Atalhos ───────── */
  const $     = id => document.getElementById(id);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const WA    = R.whatsapp;
  const METHOD_LABEL = M.name;

  /* ───────── Configuração derivada do método ───────── */
  const cfg = {
    ratio:    M.ratio,
    ideal:    M.ideal,
    min:      M.min,
    max:      M.max,
    temp:     M.tempDisplay,
    grind:    M.grind,
    ratioLbl: M.ratioLabel,
    bloomMult: M.bloomMult,
    times:  M.steps.map(s => s.end),     // segundo em que cada passo termina
    starts: M.steps.map(s => s.start),   // segundo em que cada passo começa a encher
    labels: M.steps.map(s => s.title)
  };
  const _ft = M.steps.findIndex(s => s.end > 0);
  cfg.firstTimed = _ft < 0 ? 0 : _ft;    // 1º passo cronometrado (o timer pula pra ele)

  /* ════════════════════════════════════════════════════════════════════════
     RENDERIZAÇÃO · monta a página a partir do RECIPE
     ════════════════════════════════════════════════════════════════════════ */

  /* Formatação leve de texto: *itálico terracota*, **negrito**, quebra de linha,
     e os tokens globais {nomeCafe} / {metodo}. */
  function rich(s) {
    if (s == null) return '';
    s = String(s)
      .replace(/\{nomeCafe\}/g, R.coffeeName || '')
      .replace(/\{metodo\}/g,   M.name || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    return s;
  }

  /* Texto puro (sem marcação) — usado em atributos como alt="" */
  function plain(s) {
    return String(s == null ? '' : s).replace(/\*\*/g, '').replace(/\*/g, '').replace(/\n/g, ' ').trim();
  }

  /* Escape para uso dentro de atributos HTML */
  function attr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function applyNameTokens(s) {
    return String(s || '').replace(/\{nomeCafe\}/g, R.coffeeName || '').replace(/\{metodo\}/g, M.name || '');
  }

  /* Valores de água a partir de uma dose de café */
  function doseVals(c) {
    const w = Math.round(c * cfg.ratio);
    const bloom = Math.round(c * cfg.bloomMult);
    return { c, w, bloom, main: w - bloom };
  }

  /* Substitui {cafe}/{bloom}/{main}/{total} por spans que atualizam ao vivo.
     Roda DEPOIS do rich() (os tokens não têm < > e sobrevivem ao escape). */
  function gramSpans(html, v) {
    return String(html)
      .replace(/\{cafe\}/g,  '<strong class="t-coffee">' + v.c + 'g</strong>')
      .replace(/\{bloom\}/g, '<strong class="t-bloom">' + v.bloom + 'g</strong>')
      .replace(/\{main\}/g,  '<strong class="t-main">' + v.main + 'g</strong>')
      .replace(/\{total\}/g, '<strong class="t-total">' + v.w + 'g</strong>');
  }

  function fmtClock(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  /* Resolve um caminho tipo "lote.score.num" dentro do RECIPE */
  function get(path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), R);
  }

  let brewTotal = 0;

  function renderContent() {
    /* aba do navegador + descrição */
    if (R.pageTitle) document.title = R.pageTitle;
    const md = $('metaDescription');
    if (md && R.pageDescription) md.setAttribute('content', R.pageDescription);

    /* campos simples via data-* */
    document.querySelectorAll('[data-text]').forEach(el => {
      const v = get(el.getAttribute('data-text'));
      if (v != null) el.innerHTML = rich(v);
    });
    document.querySelectorAll('[data-href]').forEach(el => {
      const v = get(el.getAttribute('data-href'));
      if (v != null) el.setAttribute('href', v);
    });
    document.querySelectorAll('[data-src]').forEach(el => {
      const v = get(el.getAttribute('data-src'));
      if (v != null) el.setAttribute('src', v);
    });
    document.querySelectorAll('[data-bg]').forEach(el => {
      const v = get(el.getAttribute('data-bg'));
      if (v != null) el.style.backgroundImage = "url('" + v + "')";
    });

    const cImg = document.querySelector('[data-src="curator.photo"]');
    if (cImg) cImg.setAttribute('alt', plain(R.curator && R.curator.name) || R.coffeeName || '');

    /* hero: título em linhas (mantém a animação de subida) */
    const ht = $('heroTitle');
    if (ht) ht.innerHTML = (R.hero.titleLines || []).map((ln, i) =>
      '<span class="line l' + (i + 1) + '"><span class="word"><span>' + rich(ln) + '</span></span></span>'
    ).join('');

    /* hero: três números */
    const hm = $('heroMeta');
    if (hm) hm.innerHTML = (R.hero.meta || []).map(m =>
      '<strong>' + rich(m.value) + '</strong> ' + rich(m.rest || '')
    ).join('<br>');

    /* ficha técnica */
    const sg = $('specsGrid');
    if (sg) sg.innerHTML = (R.lote.specs || []).map(pair =>
      '<div class="spec-cell"><div class="spec-cell-label">' + rich(pair[0]) +
      '</div><div class="spec-cell-value">' + rich(pair[1]) + '</div></div>'
    ).join('');

    /* cartões de sabor */
    const fg = $('flavorGrid');
    if (fg) fg.innerHTML = (R.sensorial.flavors || []).map(f =>
      '<div class="flavor-card reveal"><span class="flavor-rank">' + rich(f.rank) +
      '</span><h3 class="flavor-name">' + rich(f.name) +
      '</h3><p class="flavor-desc">' + rich(f.desc) + '</p></div>'
    ).join('');

    /* jornada de temperatura (data-body evita conflito com [data-text]) */
    const tt = $('tempTrack');
    if (tt) tt.innerHTML = (R.sensorial.cooling || []).map((cl, i) =>
      '<button class="temp-item' + (i === 0 ? ' active' : '') + '" data-idx="' + i +
        '" data-deg="' + attr(cl.deg) + '" data-title="' + attr(cl.title) +
        '" data-body="' + attr(cl.text) + '" data-notes="' + attr((cl.notes || []).join(' · ')) + '">' +
        '<span class="temp-dot"></span>' +
        '<span class="temp-deg">' + rich(cl.short || cl.deg) + '</span>' +
        '<span class="temp-title">' + rich(cl.title) + '</span>' +
      '</button>'
    ).join('');

    /* "por que esse método" — numeração automática */
    const wg = $('whyGrid');
    if (wg) wg.innerHTML = (R.recipe.why || []).map((w, i) =>
      '<div class="why-card reveal"><span class="why-num">' + String(i + 1).padStart(2, '0') +
      '</span><h3 class="why-title">' + rich(w.title) +
      '</h3><p class="why-desc">' + rich(w.desc) + '</p></div>'
    ).join('');

    /* painel de parâmetros (pCoffee/pWater são atualizados pela dose) */
    const pT = $('pTemp');  if (pT) pT.textContent = M.tempDisplay;
    const pG = $('pGrind'); if (pG) pG.textContent = M.grind;
    const rp = $('ratioPill'); if (rp) rp.textContent = cfg.ratioLbl;
    const it = $('idealTxt');  if (it) it.textContent = 'Nossa receita · ' + cfg.ideal + 'g';

    /* grade de água */
    const v0 = doseVals(cfg.ideal);
    const wgr = $('waterGrid');
    if (wgr) wgr.innerHTML =
      '<div class="wg"><span class="wg-l">Pré-infusão</span><span class="wg-v" id="w0">' + v0.bloom + '</span><span class="wg-s">g · ' + attr(M.bloomTemp) + '</span></div>' +
      '<div class="wg"><span class="wg-l">Despejo</span><span class="wg-v" id="w1">' + v0.main + '</span><span class="wg-s">g · ' + attr(M.mainTemp) + '</span></div>' +
      '<div class="wg"><span class="wg-l">Total</span><span class="wg-v" id="w2">' + v0.w + '</span><span class="wg-s">g</span></div>';

    /* passo a passo */
    const sc = $('stepsClever');
    if (sc) {
      sc.innerHTML = (M.steps || []).map((s, i) => {
        const text  = gramSpans(rich(s.text), v0);
        const time  = gramSpans(rich(s.time), v0);
        const badge = gramSpans(rich(s.badge || ''), v0);
        return '<article class="step' + (i === 0 ? ' active' : '') + '" data-step="' + i + '" onclick="goStep(' + i + ')">' +
          '<div class="step-media skeleton">' +
            '<img src="' + attr(s.img) + '" alt="' + attr(plain(s.alt || s.title)) + '" loading="lazy">' +
            '<span class="step-num">' + rich(s.num || String(i + 1).padStart(2, '0')) + '</span>' +
          '</div>' +
          '<div class="step-body">' +
            '<div class="step-head"><h3 class="step-title">' + rich(s.title) + '</h3>' +
              (s.badge ? '<span class="step-badge">' + badge + '</span>' : '') + '</div>' +
            '<p class="step-time">' + time + '</p>' +
            '<p class="step-text">' + text + '</p>' +
            '<div class="step-prog"><span class="step-prog-fill"></span></div>' +
          '</div>' +
        '</article>';
      }).join('');

      /* shimmer: revela cada imagem quando carrega */
      sc.querySelectorAll('.step-media.skeleton img').forEach(img => {
        const done = () => { const p = img.closest('.step-media'); if (p) p.classList.add('is-loaded'); };
        if (img.complete) done();
        else { img.addEventListener('load', done); img.addEventListener('error', done); }
      });
    }

    /* dica */
    const tip = $('tipTxt');
    if (tip) tip.innerHTML = (R.recipe.tip || []).map(p => '<p>' + rich(p) + '</p>').join('');

    /* cursos do curador */
    const cc = $('ccLinks');
    if (cc) cc.innerHTML = (R.curator.courses || []).map(c =>
      c.href
        ? '<a href="' + attr(c.href) + '" target="_blank" rel="noopener" class="cc-link">' + rich(c.label) + '</a>'
        : '<span class="cc-link cc-static">' + rich(c.label) + '</span>'
    ).join('');

    /* opções de feedback (WhatsApp) */
    const fb = $('fbOpts');
    if (fb) fb.innerHTML = (R.closing.feedback || []).map(f =>
      '<button class="fb-opt" data-msg="' + attr(applyNameTokens(f.msg)) + '">' +
        '<span class="fb-label">' + rich(f.label) + '</span>' +
        '<span class="fb-sub">' + rich(f.sub) + '</span></button>'
    ).join('');

    buildDotNav();
    buildBrewline();
  }

  /* ───────── Menu lateral de bolinhas ───────── */
  let dotSections = [];

  function buildDotNav() {
    const dn = $('dotnav');
    if (!dn || !R.nav || !R.nav.sections) return;
    dn.innerHTML = R.nav.sections.map(s => {
      const href = s.id === 'hero' ? '#hero-wrap' : '#' + s.id;
      return '<a href="' + attr(href) + '" class="dotnav-item" data-target="' + attr(s.id) + '">' +
        '<span class="dotnav-label">' + rich(s.label) + '</span>' +
        '<span class="dotnav-dot"></span></a>';
    }).join('');
  }

  function initDotNav() {
    const dn = $('dotnav');
    if (!dn || !R.nav || !R.nav.sections) return;
    dotSections = R.nav.sections.map(s => ({
      dark: !!s.dark,
      el:  document.getElementById(s.id),
      dot: dn.querySelector('.dotnav-item[data-target="' + (window.CSS && CSS.escape ? CSS.escape(s.id) : s.id) + '"]')
    })).filter(x => x.el && x.dot);
  }

  /* ───────── Linha do tempo do preparo ───────── */
  function buildBrewline() {
    const bl = $('brewline');
    if (!bl) return;
    const timed = M.steps.filter(s => s.end > s.start);
    if (!timed.length) { bl.style.display = 'none'; return; }
    const total = M.steps[M.steps.length - 1].end || timed[timed.length - 1].end;
    brewTotal = total;

    const segs = timed.map(s =>
      '<div class="brewline-seg" data-step="' + M.steps.indexOf(s) + '" style="flex:' + (s.end - s.start) + '">' +
        '<span class="brewline-seg-name">' + rich(s.title) + '</span></div>'
    ).join('');

    const bounds = timed.map(s => s.start).concat([total]);
    const axis = bounds.map((t, i) => {
      const pct = total ? (t / total * 100) : 0;
      const cls = i === 0 ? ' is-first' : (i === bounds.length - 1 ? ' is-last' : '');
      return '<span class="brewline-pt' + cls + '" style="left:' + pct + '%">' + fmtClock(t) + '</span>';
    }).join('');

    bl.innerHTML =
      '<div class="brewline-bar"><div class="brewline-fill" id="brewlineFill"></div>' + segs + '</div>' +
      '<div class="brewline-axis">' + axis + '</div>';
  }

  function setBrewActive(n) {
    document.querySelectorAll('.brewline-seg').forEach(seg => {
      const si = +seg.dataset.step;
      seg.classList.toggle('active', si === n);
      seg.classList.toggle('done', si < n);
    });
  }

  function setBrewFill(sec) {
    const bf = $('brewlineFill');
    if (bf && brewTotal) bf.style.width = clamp(sec / brewTotal * 100, 0, 100) + '%';
  }

  /* ───────── Storage ───────── */
  const STORE = {
    k: 'lucca_receita:' + (M.name || 'x').toLowerCase().replace(/[^a-z0-9]+/g, '') + ':',
    get(key) { try { return JSON.parse(localStorage.getItem(this.k + key)); } catch { return null; } },
    set(key, val) { try { localStorage.setItem(this.k + key, JSON.stringify(val)); } catch {} }
  };

  /* ───────── Toast ───────── */
  let toastT;
  function toast(msg) {
    const t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 4200);
  }

  /* ───────── Áudio ───────── */
  let soundOn  = STORE.get('sound') ?? true;
  let audioCtx = null;

  function ensureAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
    }
    if (audioCtx?.state === 'suspended') audioCtx.resume();
  }

  function chime(big = false) {
    if (!soundOn || !audioCtx) return;
    const now   = audioCtx.currentTime;
    const notes = big ? [523.25, 659.25, 783.99] : [659.25];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(g); g.connect(audioCtx.destination);
      const t0 = now + i * 0.14;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.16, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
      o.start(t0); o.stop(t0 + 0.55);
    });
  }

  window.toggleSound = function () {
    soundOn = !soundOn;
    STORE.set('sound', soundOn);
    const btn = $('soundBtn');
    if (btn) btn.classList.toggle('is-muted', !soundOn);
    toast(soundOn ? 'Som dos avisos ativado' : 'Som dos avisos desativado');
    if (soundOn) { ensureAudio(); chime(false); }
  };

  /* ───────── Wake Lock ───────── */
  let wakeLock = null;
  async function reqWake() {
    try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch {}
  }
  function relWake() {
    try { if (wakeLock) wakeLock.release(); } catch {} finally { wakeLock = null; }
  }
  document.addEventListener('visibilitychange', () => {
    if (running && document.visibilityState === 'visible') reqWake();
  });

  /* ───────── Dose & Slider ───────── */
  let slider;

  function render() {
    if (!slider) return;
    const c     = +slider.value;
    const w     = Math.round(c * cfg.ratio);
    const bloom = Math.round(c * cfg.bloomMult);
    const main  = w - bloom;

    const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };

    set('pCoffee', c + 'g');
    set('pWater',  w + 'g');
    set('doseN',   c);
    set('doseW',   w);
    set('w0',      bloom);
    set('w1',      main);
    set('w2',      w);

    const bloomPct = w ? (bloom / w * 100) : 0;
    const fB = $('fBloom'), fM = $('fMain');
    if (fB) fB.style.width = bloomPct + '%';
    if (fM) { fM.style.left = bloomPct + '%'; fM.style.width = (100 - bloomPct) + '%'; }

    document.querySelectorAll('.t-coffee').forEach(el => el.textContent = c     + 'g');
    document.querySelectorAll('.t-bloom') .forEach(el => el.textContent = bloom + 'g');
    document.querySelectorAll('.t-main')  .forEach(el => el.textContent = main  + 'g');
    document.querySelectorAll('.t-total') .forEach(el => el.textContent = w     + 'g');

    const isIdeal = c === cfg.ideal;
    const doseN = $('doseN');
    if (doseN)  doseN.classList.toggle('is-ideal', isIdeal);
    if (slider) slider.classList.toggle('ideal-pos', isIdeal);
    const idealTag = $('idealTag');
    if (idealTag) idealTag.classList.toggle('on', isIdeal);

    const cur  = $('calibCursor');
    const zone = $('calibZone');
    if (cur) {
      const pos = c <= cfg.ideal
        ? 8  + (c - cfg.min)   / (cfg.ideal - cfg.min) * 27
        : 35 + (c - cfg.ideal) / (cfg.max - cfg.ideal) * 55;
      cur.style.left = clamp(pos, 2, 96) + '%';
    }
    if (zone) {
      zone.classList.remove('under', 'ideal', 'over');
      if (c === cfg.ideal) { zone.classList.add('ideal'); zone.textContent = 'No ponto · ' + cfg.ratioLbl + ' equilibrado'; }
      else if (c < cfg.ideal) { zone.classList.add('under'); zone.textContent = 'Mais leve · acidez e clareza'; }
      else { zone.classList.add('over'); zone.textContent = 'Mais intenso · corpo e doçura'; }
    }
    positionIdealMark();
  }

  function positionIdealMark() {
    const iMark = $('iMark');
    if (!iMark || !slider) return;
    const w = slider.offsetWidth;
    if (!w) return;
    const pct   = (cfg.ideal - cfg.min) / (cfg.max - cfg.min);
    const thumb = 24;
    iMark.style.left = (pct * (w - thumb) + thumb / 2) + 'px';
  }

  function saveDose() {
    if (!slider) return;
    const c = +slider.value;
    STORE.set('dose', c);
    const ld = $('lastDose');
    if (ld) {
      const v = ld.querySelector('.ld-val');
      if (v) v.textContent = c + 'g · ' + Math.round(c * cfg.ratio) + 'g de água';
      ld.classList.add('on');
    }
  }

  /* ───────── Steps ───────── */
  let steps = [];
  let activeStep = 0;

  window.goStep = function (n, fromTimer = false) {
    n = clamp(n, 0, steps.length - 1);
    activeStep = n;

    steps.forEach((s, i) => {
      s.classList.toggle('active', i === n);
      s.classList.toggle('done',   i < n);
      const fill = s.querySelector('.step-prog-fill');
      if (fill) fill.style.width = (i < n) ? '100%' : '0%';
    });
    setBrewActive(n);

    const lbl = $('timerLabel');
    if (lbl) lbl.textContent = cfg.labels[n] || '';

    if (fromTimer && steps[n]) steps[n].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  /* ───────── Timer ───────── */
  let timerInt = null, sec = 0, running = false;

  function updateClock() {
    const c = $('clock');
    if (!c) return;
    c.textContent = fmtClock(sec);
  }

  function setPlay() {
    const b = $('tPlay');
    if (b) { b.textContent = running ? '⏸' : '▶'; b.classList.toggle('active', running); }
  }

  window.toggleTimer = function () { running ? pauseTimer() : startTimer(); };

  function startTimer() {
    running = true;
    setPlay(); ensureAudio(); reqWake(); saveDose();
    if (activeStep < cfg.firstTimed) window.goStep(cfg.firstTimed, true);
    clearInterval(timerInt);
    timerInt = setInterval(tick, 1000);
  }

  function pauseTimer() {
    running = false;
    setPlay();
    clearInterval(timerInt); timerInt = null;
    relWake();
  }

  window.resetTimer = function () {
    pauseTimer();
    sec = 0;
    updateClock();
    const c = $('clock'); if (c) c.classList.remove('warn');
    steps.forEach(s => { const f = s.querySelector('.step-prog-fill'); if (f) f.style.width = '0%'; });
    setBrewFill(0);
    window.goStep(0);
  };

  function tick() {
    sec++;
    updateClock();
    setBrewFill(sec);

    while (activeStep < cfg.times.length - 1 && sec >= cfg.times[activeStep]) {
      const i = activeStep;
      const f = steps[i]?.querySelector('.step-prog-fill');
      if (f) f.style.width = '100%';
      window.goStep(i + 1, true);
      if (i >= 1) chime(false);
    }

    const i  = activeStep;
    const st = cfg.starts[i] ?? 0;
    const en = cfg.times[i]  ?? 0;
    const f  = steps[i]?.querySelector('.step-prog-fill');
    if (f && en > st) f.style.width = clamp((sec - st) / (en - st) * 100, 0, 100) + '%';

    const last    = cfg.times[cfg.times.length - 1];
    const clockEl = $('clock');
    if (clockEl && sec >= last - 15) clockEl.classList.add('warn');

    if (sec >= last) {
      pauseTimer();
      if (clockEl) clockEl.classList.add('warn');
      chime(true);
      toast('Pronto! Sua xícara está finalizada');
    }
  }

  /* ───────── Focus Mode ───────── */
  window.toggleFocus = function () {
    document.body.classList.toggle('focus-mode');
    const isFocus = document.body.classList.contains('focus-mode');
    if (isFocus) { const r = $('receita'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    toast(isFocus ? 'Modo timer ativado' : 'Modo timer desativado');
  };

  /* ───────── Feedback WhatsApp ───────── */
  function initFeedback() {
    document.querySelectorAll('.fb-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const base = btn.getAttribute('data-msg') || '';
        const c = slider ? +slider.value : cfg.ideal;
        const w = Math.round(c * cfg.ratio);
        const detail = ' (Método ' + METHOD_LABEL + ', ' + c + 'g de café para ' + w + 'g de água, ' + cfg.temp + ')';
        window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(base + detail), '_blank', 'noopener');
      });
    });
  }

  /* ───────── Jornada de temperatura ───────── */
  function initTempJourney() {
    const items  = document.querySelectorAll('.temp-item');
    const detail = $('tempDetail');
    if (!detail) return;
    let open = -1;

    items.forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.idx);
        if (open === idx) {
          detail.classList.remove('on');
          item.classList.remove('active');
          open = -1;
          return;
        }
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');

        const notes = (item.dataset.notes || '')
          .split(' · ').filter(Boolean)
          .map(n => '<span class="temp-note">' + n + '</span>').join('');

        detail.innerHTML =
          '<div class="temp-detail-deg">'   + (item.dataset.deg   || '') + '</div>' +
          '<div class="temp-detail-title">' + (item.dataset.title || '') + '</div>' +
          '<div class="temp-detail-text">'  + (item.dataset.body  || '') + '</div>' +
          '<div class="temp-detail-notes">' + notes + '</div>';
        detail.classList.add('on');
        open = idx;
      });
    });
  }

  /* ───────── Reveals ───────── */
  function initReveals() {
    const supportsScrollDriven = CSS.supports('animation-timeline: view()');
    if (supportsScrollDriven) return; // onde há scroll-timeline, o CSS anima sozinho (sempre)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
        if (document.querySelectorAll('.reveal:not(.in)').length === 0) observer.disconnect();
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('in');
      else observer.observe(el);
    });
  }

  /* ───────── Scroll Handler ───────── */
  let ticking = false;
  let lastDot = null;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y    = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const vh   = window.innerHeight;

      const nav      = $('nav');
      const progress = $('progress');
      const hero     = $('hero');
      const heroBg   = document.querySelector('.hero-bg');
      const fab      = $('fab');

      if (nav)      nav.classList.toggle('scrolled', y > 60);
      if (progress) progress.style.width = (docH > 0 ? (y / docH * 100) : 0) + '%';

      if (hero) {
        const shrink = Math.min(1, y / (vh * 0.7));
        hero.style.setProperty('--hero-progress', shrink.toFixed(4));
      }
      if (heroBg && y < vh * 1.3) heroBg.style.transform = `translate3d(0,${y * 0.18}px,0)`;
      if (fab) fab.classList.toggle('on', y > vh * 0.85);

      /* menu de bolinhas: seção ativa + tema claro/escuro */
      if (dotSections.length) {
        const mid = y + vh * 0.45;
        let act = dotSections[0];
        for (const s of dotSections) if (s.el.offsetTop <= mid) act = s;
        if (act !== lastDot) {
          dotSections.forEach(s => s.dot.classList.toggle('active', s === act));
          const dn = $('dotnav');
          if (dn) dn.dataset.theme = act.dark ? 'dark' : 'light';
          lastDot = act;
        }
      }

      ticking = false;
    });
  }

  /* ───────── Keyboard ───────── */
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
    if (e.code === 'Space')               { e.preventDefault(); window.toggleTimer(); }
    else if (e.key.toLowerCase() === 'r') window.resetTimer();
    else if (e.key.toLowerCase() === 'f') window.toggleFocus();
    else if (e.key.toLowerCase() === 'm') window.toggleSound();
  });

  /* ───────── Init ───────── */
  function init() {
    renderContent();

    slider = $('slider');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => { const hero = $('hero'); if (hero) hero.classList.add('loaded'); });
    });

    if (slider) {
      slider.min = cfg.min; slider.max = cfg.max; slider.step = 1;
      const saved = STORE.get('dose');
      slider.value = (saved != null && saved >= cfg.min && saved <= cfg.max) ? saved : cfg.ideal;
      slider.addEventListener('input',  render);
      slider.addEventListener('change', saveDose);
    }

    const sMin = $('sMin'), sMax = $('sMax');
    if (sMin) sMin.textContent = cfg.min + 'g';
    if (sMax) sMax.textContent = cfg.max + 'g';

    const soundBtn = $('soundBtn');
    if (soundBtn) soundBtn.classList.toggle('is-muted', !soundOn);

    steps = Array.from(document.querySelectorAll('#stepsClever .step'));

    initFeedback();
    initTempJourney();
    initReveals();
    initDotNav();
    render();

    if (STORE.get('dose') != null) saveDose();

    updateClock();
    setPlay();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { positionIdealMark(); onScroll(); }, { passive: true });
    window.addEventListener('load',   () => { positionIdealMark(); onScroll(); });

    requestAnimationFrame(() => { requestAnimationFrame(onScroll); });
    onScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
