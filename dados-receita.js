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
  coffeeName: 'Canéfora Fazenda Venturim',   // nome do café (usado em mensagens)
  whatsapp:   '554187627267',                // número do WhatsApp (só dígitos, com DDI 55)

  // ── Estratégia / captura (versão BLOQUEADA para o Instagram) ──────────────
  // Página do produto (botão "comprar" da versão bloqueada):
  product: {
    url: 'https://luccacafesespeciais.com.br/produto/cafe-especial/250-g/cafe-especial-venturim/',
  },
  // Cartão de bloqueio — aparece SÓ quando a URL termina em ?ig
  // (ex.: .../lucca-receita-/?ig). No link normal/limpo a receita fica liberada.
  lock: {
    eyebrow:  'Receita exclusiva',
    title:    'A receita completa é\n*de quem leva o café.*',
    text:     'O sensorial está aí em cima. Os parâmetros, os tempos e o passo a passo no V60 ficam liberados para quem compra o Venturim. Garanta o seu — ou chame a gente.',
    buyLabel: 'Quero o Venturim',
    wppLabel: 'Falar no WhatsApp',
    wppMsg:   'Oi! Vi o Venturim no Instagram e quero saber mais sobre o café e a receita.',
  },

  // Aparece na aba do navegador e quando o link é compartilhado:
  pageTitle:       'Receita V60 · Canéfora Fazenda Venturim — Lucca Cafés Especiais',
  pageDescription: 'Receita Lucca Lab para o café Canéfora Fazenda Venturim no método V60. Parâmetros, timer e passo a passo.',

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
    eyebrow: 'Receita Lucca Lab · Método V60',
    image:   'https://i.imgur.com/BUzYHhV.png',   // fundo do hero (imagem)

    // Título grande. Uma linha por item. Use *...* na que deve ficar terracota.
    titleLines: [
      'Canéfora Fazenda',
      '*Venturim.*',
    ],

    // Frase sensorial curta embaixo do título:
    sub: 'Cacau, canela\ne um final de **whisky.**',

    // Três números de destaque (valor em negrito + complemento):
    meta: [
      { value: '200 m',  rest: '· Semi-árido Capixaba' },
      { value: 'Honey',  rest: '· Fermentado' },
      { value: '1:17,5', rest: '· V60' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     4) O LOTE  ·  origem + dossiê do produtor
     ───────────────────────────────────────────────────────────────────────── */
  lote: {
    index:    '/ O lote · **Espírito Santo**',
    headline: 'Conilon fino do\n*semi-árido capixaba.*',
    lede:     'Na *Fazenda Venturim*, em São Gabriel da Palha, os irmãos Isaac e Lucas conduzem um Conilon Diamante (Coffea Canephora) com *Honey Process* e perfil fermentado — o canéfora fino que o semi-árido capixaba sabe produzir.',

    photo: {
      image: 'https://i.imgur.com/BnIQhKp.jpeg',         // foto dos produtores
      stamp: 'Isaac & Lucas Venturim',                   // selo (canto superior)
      tag:   '200 m · Semi-árido Capixaba · ES',          // legenda (canto inferior)
    },

    producer: {
      eyebrow: 'Quem cultivou',
      name:    'Isaac e Lucas\n*Venturim.*',
      quote:   'Na *Fazenda Venturim*, os irmãos Isaac e Lucas conduzem o Conilon Diamante com Honey Process e fermentação — o processo que assina o perfil deste lote.',
    },

    specsLabel: 'Ficha técnica',
    // Tabela da ficha técnica — pares [rótulo, valor]. Pode ter mais ou menos linhas.
    specs: [
      ['Produtor',    'Isaac e Lucas Venturim'],
      ['Propriedade', '*Fazenda Venturim*'],
      ['Região',      '*Semi-árido Capixaba*'],
      ['Município',   'São Gabriel da Palha'],
      ['Altitude',    '200 m'],
      ['Variedade',   '*Conilon Diamante*'],
      ['Espécie',     'Coffea Canephora'],
      ['Processo',    '*Honey · Fermentado*'],
    ],

    // Sem nota SCA informada — destaco a nota-assinatura do café no lugar.
    score: {
      num:   'Whisky',
      label: 'Nota assinatura',
      note:  'Cacau · canela · retrogosto longo',
    },
  },

  /* ─────────────────────────────────────────────────────────────────────────
     5) SENSORIAL  ·  o que se sente na xícara
     ───────────────────────────────────────────────────────────────────────── */
  sensorial: {
    index:    '/ Na xícara',
    headline: 'Cacau, whisky\n*e canela.*',
    lede:     'Aroma de *noz-moscada, canela e mascavo*. Na boca, cacau e whisky com canela; acidez baixa e corpo cremoso, com retrogosto longo de *whisky*.',

    // Três cartões de sabor:
    flavors: [
      { rank: 'Sabor principal', name: 'Cacau & Whisky',      desc: 'Cacau e whisky com canela. Acidez baixa, corpo cremoso.' },
      { rank: 'Aroma',           name: 'Noz-moscada & Canela', desc: 'Noz-moscada, canela e açúcar mascavo já no aroma.' },
      { rank: 'Retrogosto',      name: 'Whisky longo',         desc: 'Retrogosto marcante e persistente de whisky.' },
    ],

    // Perfil sensorial — notas de 0 a 5 (vira barras na seção "Na xícara").
    profileLabel: 'Perfil sensorial',
    profile: [
      { label: 'Aroma',      value: 3 },
      { label: 'Sabor',      value: 4 },
      { label: 'Acidez',     value: 2 },
      { label: 'Corpo',      value: 5 },
      { label: 'Doçura',     value: 3 },
      { label: 'Retrogosto', value: 5 },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     6) BANDA EDITORIAL  ·  a frase grande sobre foto
     ───────────────────────────────────────────────────────────────────────── */
  band: {
    image: 'https://i.imgur.com/x3RQt0W.jpeg',
    quote: 'São Gabriel da Palha, 200 metros de semi-árido capixaba. No *Honey Process*, os irmãos Venturim constroem um conilon de cacau, canela e whisky.',
    cite:  '— Lucca Lab · sobre o lote Fazenda Venturim',
  },

  /* ─────────────────────────────────────────────────────────────────────────
     7) A RECEITA  ·  textos de apresentação do método
     ───────────────────────────────────────────────────────────────────────── */
  recipe: {
    index:    '/ Lucca Lab · A receita',
    headline: 'O V60 separa.\nA clareza *aparece.*',
    lede:     'O *V60* é percolação: a água passa pelo café e escorre na hora, sem ficar de molho. Com a moagem certa e os despejos no tempo, ele entrega uma xícara *limpa e definida* — ideal para mostrar o caráter deste canéfora.',

    // Os três motivos "por que esse método":
    why: [
      { title: 'Percolação contínua', desc: 'A água atravessa o leito e drena na hora. Você controla o sabor pela moagem e pelo despejo.' },
      { title: 'Xícara limpa',        desc: 'O filtro de papel retém os óleos pesados e entrega clareza e definição no copo.' },
      { title: 'Agitação no ponto',   desc: 'Os dois swirls assentam e uniformizam o leito — extração pareja, sem caminhos preferenciais.' },
    ],

    stepsIndex:    '/ Passo a passo',
    stepsHeadline: 'Pré-infusão, ataque\n*e drenagem.*',

    // Caixa de dica no fim (uma linha por parágrafo):
    tip: [
      '**Calibração.** Drenou antes de 2:30 → moa mais fino. Passou de 3:00 ou travou → mais grosso.',
      'Os **dois swirls** (após a pré-infusão e após o ataque) fazem parte da receita: uniformizam o leito.',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     8) MÉTODO  ·  números do preparo, controle de dose e timer
     ───────────────────────────────────────────────────────────────────────── */
  method: {
    name:       'V60',        // nome do método (aparece em vários lugares)
    ratio:      17.5,         // proporção água:café (1:17,5). Água = café × ratio
    ratioLabel: '1 : 17,5',
    ideal:      20,           // dose ideal de café, em gramas
    min:        14,           // mínimo do controle deslizante
    max:        28,           // máximo do controle deslizante
    bloomMult:  2.75,         // pré-infusão = café × este número (2,75 → 20g = 55ml)

    tempDisplay: '93°C',      // temperatura (padrão p/ café especial)
    grind:       'Grossa',    // moagem (painel de parâmetros)
    bloomTemp:   '93°C',      // temperatura da água (grade de água)
    mainTemp:    '93°C',      // temperatura da água (grade de água)

    // start/end = segundos no timer (a barra de progresso e a linha do tempo usam isso).
    steps: [
      {
        num: '01', title: 'Preparo', badge: 'antes',
        img: 'https://i.imgur.com/W0xssO7.mp4', alt: 'Preparo',
        time: 'Antes de iniciar o timer', start: 0, end: 0,
        text: 'Moa **grosso**. Coloque o filtro de papel no V60 e **escalde com água quente** para tirar o gosto de papel; descarte essa água. Adicione {cafe} de café e nivele o leito.',
      },
      {
        num: '02', title: 'Pré-infusão', badge: '+{bloom}',
        img: 'https://i.imgur.com/aUTWD2K.mp4', alt: 'Pré-infusão',
        time: '0:00 — 0:45', start: 0, end: 45,
        text: 'Inicie o timer e despeje {bloom} de água cobrindo todo o pó. **Assim que terminar de despejar, faça uma agitação (swirl) no porta-filtro** para assentar o leito. Deixe em pré-infusão até **0:45**.',
      },
      {
        num: '03', title: 'Ataque central', badge: '+{main}',
        img: 'https://i.imgur.com/Tcx3HIi.mp4', alt: 'Ataque central',
        time: '0:45 · Total: {total}', start: 45, end: 95,
        text: 'Aos **0:45**, faça o **primeiro ataque no centro**, despejando até completar **{total}** (mais {main} de água).',
      },
      {
        num: '04', title: 'Agitação', badge: 'swirl',
        img: 'https://i.imgur.com/0MHgkQg.mp4', alt: 'Agitação no porta-filtro',
        time: 'logo após o ataque', start: 95, end: 105,
        text: 'Depois do ataque, faça **uma nova agitação no porta-filtro** para uniformizar a extração.',
      },
      {
        num: '05', title: 'Drenagem', badge: '2:30 – 3:00',
        img: 'https://i.imgur.com/ZyTFPlA.mp4', alt: 'Drenagem',
        time: 'termina entre 2:30 e 3:00', start: 105, end: 165,
        text: 'Deixe escoar por completo. A extração deve **terminar entre 2:30 e 3:00**.',
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     9) QUEM DESENVOLVEU  ·  o curador da receita
     ───────────────────────────────────────────────────────────────────────── */
  curator: {
    // Fundo animado da seção inteira (vídeo leve — versão MP4 do gif):
    background: 'https://i.imgur.com/nzOQpOe.mp4',
    role:     'Receita desenvolvida por',
    name:     'Gabriel\n*Neiva de Lima.*',
    bio:      'Barista do **Lucca Cafés Especiais** e **vice-campeão brasileiro de barista** no ano passado — agora em busca do título. Experiente, técnico e apaixonado pelo que faz.',
    quote:    `Desenvolvemos esta receita para evidenciar aquilo que torna os cafés especiais tão fascinantes: a *transparência dos sabores*, a doçura natural e a expressão única da origem.

Os parâmetros foram ajustados considerando a solubilidade deste café específico, permitindo uma extração fluida e precisa, capaz de revelar camadas sensoriais que muitas vezes passam despercebidas em preparos convencionais. O resultado é uma xícara *mais doce, limpa e expressiva*, onde as características do terroir, da variedade e do processamento podem ser apreciadas com maior clareza.`,

    // Ele ainda não dá cursos no lab — então no lugar das formações vai a rede social.
    coursesLabel: 'Onde acompanhar',
    courses: [
      { label: 'Instagram', href: 'https://www.instagram.com/_________gabe/' },
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
    meta:  'Receita Lucca Lab · V60 · canéfora',
  },

};

// Deixa o conteúdo disponível para a página. (não precisa mexer nesta linha)
window.RECIPE = RECIPE;
