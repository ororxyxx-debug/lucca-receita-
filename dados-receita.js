/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║                                                                          ║
   ║   📋  DADOS DA RECEITA  ·  Lucca Cafés Especiais                          ║
   ║                                                                          ║
   ║   Este é o ÚNICO arquivo que você precisa editar para trocar de café.    ║
   ║   Mude o texto, os números e as fotos aqui embaixo — a página se monta   ║
   ║   sozinha. Não precisa mexer no index.html nem no script.js.             ║
   ║                                                                          ║
   ╠══════════════════════════════════════════════════════════════════════════╣
   ║                                                                          ║
   ║   ✍️  COMO FORMATAR O TEXTO (vale em qualquer campo de texto):            ║
   ║                                                                          ║
   ║     *palavra*        →  destaque itálico terracota (a assinatura)        ║
   ║     **palavra**      →  negrito                                          ║
   ║     (apertar Enter)  →  quebra de linha na tela                          ║
   ║                                                                          ║
   ║   Ex.: 'Uma das fazendas\n*mais premiadas do Brasil.*'  vira duas linhas ║
   ║        com a 2ª em itálico terracota.                                    ║
   ║                                                                          ║
   ║   🔢  TOKENS QUE SE ATUALIZAM SOZINHOS (só nos passos do preparo):        ║
   ║                                                                          ║
   ║     {cafe}   →  gramas de café da dose      (ex.: 25g)                   ║
   ║     {bloom}  →  gramas da pré-infusão       (ex.: 50g)                   ║
   ║     {main}   →  gramas do despejo principal (ex.: 350g)                  ║
   ║     {total}  →  gramas de água no total     (ex.: 400g)                  ║
   ║                                                                          ║
   ║   Eles mudam de valor quando a pessoa mexe no controle de dose.          ║
   ║                                                                          ║
   ║   Nas mensagens de feedback dá pra usar {nomeCafe} e {metodo}.           ║
   ║                                                                          ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */

const RECIPE = {

  /* ─────────────────────────────────────────────────────────────────────────
     1) IDENTIFICAÇÃO  ·  o básico do projeto
     ───────────────────────────────────────────────────────────────────────── */
  coffeeName: 'Vargem Grande e Pinheiros',   // nome do café (usado em mensagens)
  whatsapp:   '554187627267',                // número do WhatsApp (só dígitos, com DDI 55)

  // Aparece na aba do navegador e quando o link é compartilhado:
  pageTitle:       'Receita Clever · Vargem Grande e Pinheiros — Lucca Cafés Especiais',
  pageDescription: 'Receita Lucca Lab para o café Vargem Grande e Pinheiros no método Clever — imersão limpa, doçura de morango e maracujá. Parâmetros, timer e passo a passo.',

  /* ─────────────────────────────────────────────────────────────────────────
     2) TOPO / MENU
     ───────────────────────────────────────────────────────────────────────── */
  nav: {
    brand:     'Lucca Cafés Especiais',
    brandHref: 'https://luccacafesespeciais.com.br/cafes/',
    cta:       { label: 'A receita', href: '#receita' },

    // Menu lateral de bolinhas (índice). 'dark: true' nas seções de fundo
    // escuro, para as bolinhas trocarem de cor e ficarem sempre visíveis.
    sections: [
      { id: 'hero',      label: 'Início',    dark: true  },
      { id: 'lote',      label: 'O lote',    dark: false },
      { id: 'sensorial', label: 'Na xícara', dark: false },
      { id: 'receita',   label: 'A receita', dark: false },
      { id: 'lucca-lab', label: 'Lucca Lab', dark: true  },
      { id: 'closing',   label: 'Feedback',  dark: false },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     3) HERO  ·  a abertura em tela cheia
     ───────────────────────────────────────────────────────────────────────── */
  hero: {
    eyebrow: 'Receita Lucca Lab · Método Clever',
    image:   'https://i.imgur.com/xMxcbQD.gif',   // fundo do hero (foto ou gif)

    // Título grande. Uma linha por item. Use *...* na que deve ficar terracota.
    titleLines: [
      'Vargem Grande',
      '*e Pinheiros.*',
    ],

    // Frase sensorial curta embaixo do título:
    sub: 'Morango, maracujá doce\ne um final **suculento.**',

    // Três números de destaque (valor em negrito + complemento):
    meta: [
      { value: '89,82',   rest: 'pts SCA'        },
      { value: '1.168 m', rest: '· Campos Altos' },
      { value: '1:16',    rest: '· Clever'        },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     4) O LOTE  ·  origem + dossiê do produtor
     ───────────────────────────────────────────────────────────────────────── */
  lote: {
    index:    '/ O lote · **Cerrado Mineiro**',
    headline: 'Uma das fazendas\n*mais premiadas do Brasil.*',
    lede:     'Ano após ano, lote após lote, a *Bioma* retorna ao pódio. Este café, da Fazenda Vargem Grande e Pinheiros, ficou em *2º lugar no Concurso do Cerrado*, categoria Fermentado, entre dezenas de lotes excepcionais.',

    photo: {
      image: 'https://i.imgur.com/qRgiyig.jpeg',         // foto da fazenda
      stamp: 'Faz. Vargem Grande e Pinheiros',           // selo (canto superior)
      tag:   '1.168 m · Cerrado Mineiro · MG',            // legenda (canto inferior)
    },

    producer: {
      eyebrow: 'Quem cultivou',
      name:    'Marcelo Assis\n*Nogueira.*',
      quote:   'Na Fazenda Vargem Grande e Pinheiros, dentro da M&F Coffee — Bioma Café, Marcelo conduz cada etapa com controle e intenção. A fermentação induzida não é tendência. É escolha de processo.',
    },

    specsLabel: 'Ficha técnica',
    // Tabela da ficha técnica — pares [rótulo, valor]. Pode ter mais ou menos linhas.
    specs: [
      ['Produtor',    'Marcelo Assis Nogueira'],
      ['Propriedade', '*M&F Coffee — Bioma Café*'],
      ['Fazenda',     'Vargem Grande e Pinheiros'],
      ['Região',      '*Cerrado Mineiro*'],
      ['Município',   'Campos Altos, MG'],
      ['Altitude',    '1.168 m'],
      ['Variedade',   'Paraíso MG2'],
      ['Processo',    '*Fermentação Induzida*'],
    ],

    score: {
      num:   '89,82',
      label: '/100 pontos SCA',
      note:  '2º lugar · Concurso do Cerrado · categoria Fermentado',
    },
  },

  /* ─────────────────────────────────────────────────────────────────────────
     5) SENSORIAL  ·  o que se sente na xícara
     ───────────────────────────────────────────────────────────────────────── */
  sensorial: {
    index:    '/ Na xícara',
    headline: 'Morango. Maracujá.\n*Suculento.*',
    lede:     'Aroma de morango, pêssego e floral. Na boca, *acidez málica* e corpo que abraça sem pesar. Retrogosto longo e frutado.',

    // Três cartões de sabor:
    flavors: [
      { rank: 'Sabor principal',  name: 'Geleia de Morango', desc: 'Doce e concentrada. Presente do aroma ao primeiro gole, assinatura da fermentação.' },
      { rank: 'Acidez & frescor', name: 'Maracujá Doce',     desc: 'Málica. Frescor tropical sem agredir, equilibrando a doçura do morango.' },
      { rank: 'Retrogosto',       name: 'Frutado Longo',     desc: 'Surge no fim com leve toque fermentado. Persistente.' },
    ],

    // Jornada de temperatura (como o café muda enquanto esfria):
    coolingLabel: 'Como muda enquanto esfria',
    cooling: [
      { deg: '88–93°C', short: '88–93°', title: 'Quente',
        text:  'Geleia de morango domina o aroma. A acidez málica fica contida pela temperatura. Corpo suculento, leve toque fermentado ao fundo.',
        notes: ['Geleia de morango', 'Corpo suculento', 'Aroma intenso'] },
      { deg: '60–70°C', short: '60–70°', title: 'Ponto ideal',
        text:  'Maracujá doce aparece com clareza. Acidez málica equilibra a doçura frutada. Corpo pleno. É aqui que a fermentação induzida se mostra.',
        notes: ['Maracujá doce vivo', 'Acidez málica', 'Morango pleno'] },
      { deg: '40–55°C', short: '40–55°', title: 'Esfriando',
        text:  'A acidez suaviza. O retrogosto frutado assume. A geleia de morango se transforma em fruta madura.',
        notes: ['Retrogosto frutado', 'Fruta madura', 'Leve fermentado'] },
      { deg: 'Ambiente', short: 'Frio', title: 'Transformado',
        text:  'Quase um suco de frutas tropicais. A acidez descansa, resta doçura limpa de morango e maracujá com leve toque floral.',
        notes: ['Suco tropical', 'Doçura pura', 'Morango persistente'] },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     6) BANDA EDITORIAL  ·  a frase grande sobre foto
     ───────────────────────────────────────────────────────────────────────── */
  band: {
    image: 'https://i.imgur.com/x3RQt0W.jpeg',
    quote: 'Campos Altos, 1.168 metros. Noites frias, dias secos. A Bioma transforma terroir em resultado. A *imersão do Clever* traduz esse cuidado.',
    cite:  '— Lucca Lab · sobre o lote Vargem Grande e Pinheiros',
  },

  /* ─────────────────────────────────────────────────────────────────────────
     7) A RECEITA  ·  textos de apresentação do método
     ───────────────────────────────────────────────────────────────────────── */
  recipe: {
    index:    '/ Lucca Lab · A receita',
    headline: 'A fermentação amplia.\nA extração *traduz.*',
    lede:     'O *Clever* é imersão com filtro de papel: a água fica em contato com todo o pó, depois drena limpa pela válvula. Corpo de prensa francesa, clareza de coado. Previsível, perdoa pequenos erros e *destaca a doçura* deste lote.',

    // Os três motivos "por que esse método":
    why: [
      { title: 'Imersão total',   desc: 'Toda a água trabalha o tempo todo. Extração uniforme, do primeiro ao último gole.' },
      { title: 'Limpeza do papel', desc: 'A válvula drena por filtro de papel: retém óleos pesados, entrega xícara nítida.' },
      { title: 'Perdoa erros',    desc: 'Você controla o tempo de imersão e a hora de drenar. Difícil errar. Fácil repetir.' },
    ],

    stepsIndex:    '/ Passo a passo',
    stepsHeadline: 'Imersão, turbulência\n*e drenagem.*',

    // Caixa de dica no fim (uma linha por parágrafo):
    tip: [
      '**Calibração.** Drenou antes de 2:30 → moa mais fino. Travou ou passou de 3:00 → mais grosso.',
      'Pré-infusão a **90°C**, despejo a **94°C**. As 10 mexidas em 1:00 fazem parte da receita.',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     8) MÉTODO  ·  números do preparo, controle de dose e timer
     ───────────────────────────────────────────────────────────────────────── */
  method: {
    name:       'Clever',     // nome do método (aparece em vários lugares)
    ratio:      16,           // proporção água:café (1:16). Água = café × ratio
    ratioLabel: '1 : 16',
    ideal:      25,           // dose ideal de café, em gramas
    min:        18,           // mínimo do controle deslizante
    max:        32,           // máximo do controle deslizante
    bloomMult:  2.0,          // pré-infusão = café × este número (2.0 → 25g vira 50g)

    tempDisplay: '90 → 94°C', // como a temperatura aparece no painel de parâmetros
    grind:       'Grossa',    // moagem (painel de parâmetros)
    bloomTemp:   '90°C',      // temperatura da pré-infusão (grade de água)
    mainTemp:    '94°C',      // temperatura do despejo principal (grade de água)

    // Passo a passo. Cada passo é auto-contido:
    //   start / end  →  segundos no timer (quando a barra começa e termina de encher).
    //                   O timer avança sozinho usando esses tempos.
    //   img          →  imagem/gif do passo
    //   badge        →  etiqueta no canto (aceita os tokens {bloom}, {main}, etc.)
    //   text/time    →  aceitam *itálico*, **negrito** e os tokens {cafe}/{bloom}/{main}/{total}
    steps: [
      {
        num: '01', title: 'Preparo', badge: 'antes',
        img: 'https://i.imgur.com/U5dNVJz.jpeg', alt: 'Preparo',
        time: 'Antes de iniciar o timer', start: 0, end: 0,
        text: 'Moa **grosso**. Coloque o filtro no Clever e **enxágue com água quente** para tirar o gosto de papel. Descarte essa água. Adicione {cafe} de café e nivele o leito.',
      },
      {
        num: '02', title: 'Pré-infusão', badge: '+{bloom}',
        img: 'https://i.imgur.com/G9kqroE.gif', alt: 'Pré-infusão',
        time: '0:00 — 0:30 · 90°C', start: 0, end: 30,
        text: 'Inicie o timer. Despeje {bloom} de água a **90°C** cobrindo todo o pó. Deixe em **imersão por 30s** para liberar o CO₂.',
      },
      {
        num: '03', title: 'Despejo principal', badge: '+{main}',
        img: 'https://i.imgur.com/pHMA7sE.gif', alt: 'Despejo principal',
        time: '0:30 · 94°C · Total: {total}', start: 30, end: 60,
        text: 'Aos **0:30**, complete com {main} de água a **94°C** até atingir o total. Despeje com calma, em movimentos circulares.',
      },
      {
        num: '04', title: 'Turbulência', badge: '10 mexidas',
        img: 'https://i.imgur.com/tFWNtU9.gif', alt: 'Turbulência',
        time: '1:00 → 1:15', start: 60, end: 75,
        text: 'Em **1:00**, mexa com uma colher em movimentos circulares. **10 mexidas** firmes. Isso homogeneíza a extração.',
      },
      {
        num: '05', title: 'Liberar o êmbolo', badge: 'até 2:30',
        img: 'https://i.imgur.com/hK3SvgQ.gif', alt: 'Liberar o êmbolo',
        time: '1:15 → 2:30', start: 75, end: 150,
        text: 'Em **1:15**, apoie o Clever sobre a xícara. Isso **libera o êmbolo** e inicia a drenagem. Deixe escoar por completo. A extração termina por volta de **2:30**.',
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     9) QUEM DESENVOLVEU  ·  o curador da receita
     ───────────────────────────────────────────────────────────────────────── */
  curator: {
    photo:    'https://i.imgur.com/jdelMZA.jpeg',
    fallback: 'JV',          // iniciais, caso a foto não carregue
    role:     'Receita desenvolvida por',
    name:     'João Vitor\n*Alves Mingorance.*',
    bio:      'Gerente do **Lucca Lab**. Q-Grader credenciado. Garimpa o portfólio anual da casa, lote a lote.',
    quote:    'A imersão do Clever é o método mais previsível para um fermentado tão expressivo. Pré-infusão a *90°C* para abrir os aromas sem comprometer a acidez málica. O restante a *94°C* extrai a doçura de morango e o maracujá. Turbulência uniformiza o leito. Drenagem controlada. Xícara limpa, doce, suculenta.',

    coursesLabel: 'Formações ministradas',
    // Links de cursos. Deixe href: null para virar só uma etiqueta (sem link).
    courses: [
      { label: 'Análise Sensorial Intermediário', href: 'https://luccacafesespeciais.com.br/produto/curso/sca/analise-sensorial-intermediario/' },
      { label: 'Análise Sensorial Profissional',  href: 'https://luccacafesespeciais.com.br/produto/curso/sca/analise-sensorial-profissional/' },
      { label: 'CVA For Cuppers',                 href: 'https://luccacafesespeciais.com.br/produto/curso/sca/coffee-value-assessment/' },
      { label: 'Q-Grader',                        href: null },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     10) FECHAMENTO  ·  pedido de feedback + botão final
     ───────────────────────────────────────────────────────────────────────── */
  closing: {
    index:    '/ Conta pra gente',
    headline: 'Como ficou\n*sua xícara?*',
    lede:     'Ajustou a moagem, mudou algo? A Lucca Lab lê todas.',

    // Botões de feedback (abrem o WhatsApp). {nomeCafe} e {metodo} entram sozinhos.
    feedback: [
      { label: 'No ponto',    sub: 'Ficou como descrito', msg: 'Oi! Fiz o {nomeCafe} no {metodo} e ficou no ponto. Quis contar como foi.' },
      { label: 'Mais ácido',  sub: 'Faltou doçura',       msg: 'Oi! Fiz o {nomeCafe} no {metodo} mas ficou mais ácido do que esperava. Pode me ajudar a calibrar?' },
      { label: 'Mais amargo', sub: 'Passou do ponto',     msg: 'Oi! Fiz o {nomeCafe} no {metodo} mas ficou mais amargo do que esperava. Pode me ajudar a calibrar?' },
    ],

    cta: { label: 'Ver outros cafés', href: 'https://luccacafesespeciais.com.br/cafes/' },
  },

  /* ─────────────────────────────────────────────────────────────────────────
     11) RODAPÉ
     ───────────────────────────────────────────────────────────────────────── */
  footer: {
    brand: 'Lucca Cafés Especiais',
    meta:  'Receita Lucca Lab · Clever · imersão limpa',
  },

};

// Deixa o conteúdo disponível para a página. (não precisa mexer nesta linha)
window.RECIPE = RECIPE;
