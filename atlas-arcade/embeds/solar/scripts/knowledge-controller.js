
/* Reference chemistry: keep atmospheric volume fractions separate from elemental mass.
   Inject after the simulator's existing controller. All copy is local; source links are optional. */
(() => {
  'use strict';
  const nasa = (path, label) => ({ href: 'https://science.nasa.gov/' + path, label });
  const sheet = (planet) => ({ href: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' + planet + 'fact.html', label: 'NASA · composição atmosférica' });
  const paper = (href, label) => ({ href, label });
  const records = {
    sun: {
      name: 'Sol', intro: 'Uma estrela de plasma, cuja composição varia entre o núcleo e as camadas externas.',
      atmosphere: {
        text: 'Fotosfera, cromosfera e coroa são camadas de gás e plasma, sem uma superfície sólida. A coroa alimenta o vento solar.',
        source: nasa('sun/facts/', 'NASA · atmosfera solar')
      },
      interior: {
        text: 'No núcleo, a fusão transforma hidrogênio em hélio. A energia atravessa a zona radiativa e depois a zona convectiva antes de chegar à fotosfera.',
        source: nasa('sun/facts/', 'NASA · estrutura solar')
      },
      elements: {
        basis: 'Fotosfera · porcentagem em massa',
        rows: [['H · hidrogênio', 74.4], ['He · hélio', 24.2], ['Outros elementos', 1.4]],
        text: 'Estimativa espectroscópica de 2021, arredondada. A fração restante inclui O, C, Ne e Fe. Estas proporções não representam o núcleo, enriquecido em hélio pela fusão.',
        source: paper('https://arxiv.org/abs/2105.01661', 'Asplund, Amarsi e Grevesse · 2021')
      },
      facts: ['Reúne cerca de 99,8% da massa do Sistema Solar.', 'A rotação varia: aproximadamente 25 dias no equador e 36 dias nos polos.', 'A fotosfera tem cerca de 5.500 °C; o núcleo chega a aproximadamente 15 milhões de °C.'],
      factSource: nasa('sun/facts/', 'NASA · fatos sobre o Sol')
    },
    mercury: {
      name: 'Mercúrio', intro: 'Um planeta rochoso com um núcleo metálico muito grande em relação ao seu tamanho.',
      atmosphere: {
        text: 'Sua exosfera é tão rarefeita que equivale quase a um vácuo. Contém átomos como O, Na, H, He, K e Mg, liberados da superfície; não há uma atmosfera densa.',
        source: sheet('mercury')
      },
      interior: {
        text: 'O núcleo metálico ocupa cerca de 85% do raio e é parcialmente líquido. Uma camada relativamente fina de manto e crosta rochosos o envolve. Raio não é porcentagem em massa.',
        source: nasa('mercury/facts/', 'NASA · estrutura de Mercúrio')
      },
      elements: {
        basis: 'Elementos e materiais identificados · sem frações globais',
        chips: [['Fe', 'ferro · núcleo'], ['O', 'oxigênio · silicatos'], ['Si', 'silício · rochas'], ['Mg', 'magnésio · rochas'], ['Al', 'alumínio · superfície'], ['S', 'enxofre · superfície']],
        text: 'MESSENGER mediu uma superfície rica em silicatos de magnésio, relativamente pobre em ferro e com enxofre. A química da superfície difere da do núcleo.',
        sources: [nasa('photojournal/major-element-composition-of-mercury-surface-materials/', 'NASA/MESSENGER · elementos da superfície'), paper('https://astrobiology.nasa.gov/missions/messenger/', 'NASA · enxofre e ferro')]
      },
      facts: ['Um dia solar dura cerca de 176 dias terrestres, enquanto o ano dura 88.', 'Crateras polares permanentemente sombreadas podem preservar gelo de água.', 'Seu campo magnético superficial tem cerca de 1% da intensidade do terrestre.'],
      factSource: nasa('mercury/facts/', 'NASA · fatos sobre Mercúrio')
    },
    venus: {
      name: 'Vênus', intro: 'Um planeta rochoso semelhante à Terra em tamanho, envolto em uma atmosfera muito densa.',
      atmosphere: {
        basis: 'Próximo à superfície · porcentagem em volume',
        rows: [['CO₂ · dióxido de carbono', 96.5], ['N₂ · nitrogênio', 3.5]],
        text: 'Há traços de SO₂, Ar e H₂O. As nuvens contêm ácido sulfúrico (H₂SO₄). Esses valores descrevem o gás, não a massa do planeta.',
        sources: [sheet('venus'), nasa('venus/venus-facts/', 'NASA · nuvens de Vênus')]
      },
      interior: {
        text: 'Crosta rochosa e manto de rocha quente envolvem um núcleo rico em ferro. Sua estrutura detalhada é inferida; a divisão exata entre materiais ainda não é conhecida.',
        source: nasa('venus/venus-facts/', 'NASA · estrutura de Vênus')
      },
      elements: {
        basis: 'Elementos por ambiente · sem frações globais',
        chips: [['C', 'carbono · CO₂'], ['O', 'oxigênio · CO₂ e rochas'], ['N', 'nitrogênio · N₂'], ['S', 'enxofre · ácido nas nuvens'], ['H', 'hidrogênio · H₂SO₄'], ['Fe', 'ferro · núcleo inferido']],
        text: 'Uma porcentagem de CO₂ não é uma porcentagem de carbono: cada molécula também contém dois átomos de oxigênio.',
        source: nasa('venus/venus-facts/', 'NASA · materiais e atmosfera')
      },
      facts: ['O intenso efeito estufa torna Vênus o planeta mais quente, com temperatura superficial próxima de 465 °C.', 'Sua rotação é retrógrada, em sentido contrário ao da maioria dos planetas.', 'Seu campo magnético é induzido pela interação do vento solar com a atmosfera.'],
      factSource: nasa('venus/venus-facts/', 'NASA · fatos sobre Vênus')
    },
    earth: {
      name: 'Terra', intro: 'Crosta e manto de silicatos, núcleo metálico, oceanos e uma atmosfera rica em nitrogênio e oxigênio.',
      atmosphere: {
        basis: 'Ar seco próximo à superfície · porcentagem em volume',
        rows: [['N₂ · nitrogênio', 78.08], ['O₂ · oxigênio', 20.95], ['Ar · argônio', 0.934]],
        text: 'O restante inclui CO₂ e outros gases-traço. O CO₂ varia com o tempo; o vapor de água varia bastante e foi excluído por se tratar de ar seco.',
        source: sheet('earth')
      },
      interior: {
        text: 'A crosta e o manto são ricos em silicatos. O manto é predominantemente sólido, mas flui lentamente em escalas geológicas. O núcleo externo de Fe–Ni é líquido e o interno é sólido.',
        sources: [nasa('photojournal/earth-interior-graphic/', 'NASA · camadas e materiais'), paper('https://www.usgs.gov/faqs/are-tectonic-plates-floating-magma', 'USGS · manto sólido')]
      },
      elements: {
        basis: 'Planeta inteiro · estimativa da porcentagem em massa',
        rows: [['Fe · ferro', 32.1], ['O · oxigênio', 30.1], ['Si · silício', 15.1], ['Mg · magnésio', 13.9], ['Outros elementos', 8.8]],
        text: 'Valores aproximados de composição global; o restante inclui S, Ni, Ca e Al. Grande parte do oxigênio está presa em minerais. Esse oxigênio não é respirável, e os valores não representam apenas a crosta.',
        source: paper('https://science.nasa.gov/wp-content/uploads/2023/10/Earth_Science_Fun_Pad.pdf', 'NASA · composição química da Terra')
      },
      facts: ['Oceanos cobrem aproximadamente 71% da área da superfície; isso não significa 71% da massa terrestre.', 'A tectônica de placas renova e deforma a crosta ao longo de milhões de anos.', 'É o único mundo onde sabemos que existe vida.'],
      factSource: nasa('earth/facts/', 'NASA · fatos sobre a Terra')
    },
    mars: {
      name: 'Marte', intro: 'Um mundo de rochas e poeira avermelhada, com atmosfera fina e água principalmente em forma de gelo.',
      atmosphere: {
        basis: 'Atmosfera · porcentagem em volume',
        rows: [['CO₂ · dióxido de carbono', 95.1], ['N₂ · nitrogênio', 2.59], ['Ar · argônio', 1.94], ['O₂ · oxigênio', 0.16], ['CO · monóxido de carbono', 0.06]],
        text: 'Há vapor de água e outros gases-traço. Os valores são estimativas e não somam exatamente 100% devido ao arredondamento e à presença de componentes menores.',
        source: sheet('mars')
      },
      interior: {
        text: 'Crosta e manto rochosos envolvem um núcleo rico em ferro e elementos leves. InSight confirmou uma região metálica líquida. Um centro sólido foi proposto em 2025; detalhes internos continuam em debate.',
        sources: [paper('https://www.nasa.gov/missions/insight/nasa-insight-study-provides-clearest-look-ever-at-martian-core/', 'NASA/InSight · química do núcleo'), paper('https://www.nature.com/articles/s41586-025-09361-9', 'Sismologia · centro sólido proposto em 2025'), paper('https://www.nature.com/articles/s41467-026-72080-w', 'Revisão científica · questões abertas em 2026')]
      },
      elements: {
        basis: 'Elementos por material · sem frações globais',
        chips: [['Fe', 'ferro · núcleo e minerais'], ['O', 'oxigênio · óxidos e silicatos'], ['Si', 'silício · rochas'], ['Mg', 'magnésio · crosta'], ['Ni', 'níquel · núcleo'], ['S', 'enxofre · núcleo']],
        text: 'A oxidação dos minerais de ferro contribui para a cor vermelha. Núcleo, crosta e atmosfera têm composições diferentes; não há uma porcentagem global simples de “ferrugem”.',
        source: nasa('mars/facts/', 'NASA · elementos e superfície')
      },
      facts: ['Abriga Olympus Mons e o enorme sistema de cânions Valles Marineris.', 'Vestígios geológicos mostram rios e lagos antigos; hoje conserva gelo de água.', 'Não tem um dínamo global ativo como o terrestre, mas conserva magnetismo em partes da crosta.'],
      factSource: nasa('mars/facts/', 'NASA · fatos sobre Marte')
    },
    jupiter: {
      name: 'Júpiter', intro: 'Um gigante dominado por hidrogênio e hélio, sem um chão sólido para pousar.',
      atmosphere: {
        basis: 'Atmosfera · porcentagem em volume (aproximada)',
        rows: [['H₂ · hidrogênio molecular', 89.8], ['He · hélio', 10.2]],
        text: 'Há traços de CH₄, NH₃ e H₂O. H₂ e He têm incertezas de cerca de 2 pontos percentuais; as abundâncias mudam com a profundidade. Não são frações da massa total.',
        source: sheet('jupiter')
      },
      interior: {
        text: 'A pressão transforma o hidrogênio em fluido e, mais abaixo, em uma forma metálica condutora. Dados de Juno indicam um núcleo diluído, com elementos pesados misturados ao H–He, sem uma fronteira nítida.',
        source: nasa('jupiter/jupiter-facts/', 'NASA/Juno · interior de Júpiter')
      },
      elements: {
        basis: 'Elementos e compostos · sem porcentagens globais fixas',
        chips: [['H', 'hidrogênio · principal'], ['He', 'hélio · abundante'], ['C', 'carbono · CH₄'], ['N', 'nitrogênio · NH₃'], ['O', 'oxigênio · H₂O'], ['S', 'enxofre · compostos nas nuvens']],
        text: 'Nuvens incluem amônia, água e hidrossulfeto de amônio. “Hidrogênio metálico” é um estado físico do elemento H, e não um metal diferente.',
        sources: [sheet('jupiter'), nasa('jupiter/jupiter-facts/', 'NASA · química e hidrogênio metálico')]
      },
      facts: ['É o maior planeta e tem mais de duas vezes a massa dos demais planetas somados.', 'Completa uma rotação em menos de 10 horas.', 'A Grande Mancha Vermelha é uma tempestade persistente, maior que a Terra.'],
      factSource: nasa('jupiter/jupiter-facts/', 'NASA · fatos sobre Júpiter')
    },
    saturn: {
      name: 'Saturno', intro: 'Um gigante de hidrogênio e hélio, cercado por anéis formados principalmente de gelo de água.',
      atmosphere: {
        basis: 'Atmosfera · porcentagem em volume (aproximada)',
        rows: [['H₂ · hidrogênio molecular', 96.3], ['He · hélio', 3.25], ['CH₄ · metano', 0.45]],
        text: 'NH₃ e outros compostos aparecem em pequenas quantidades. H₂ e He têm incertezas de cerca de 2,4 pontos percentuais. Esta medida descreve a atmosfera, não o interior.',
        source: sheet('saturn')
      },
      interior: {
        text: 'A pressão produz camadas de hidrogênio fluido e metálico. Modelos ajustados a dados de Cassini e às ondas dos anéis favorecem uma transição gradual para um núcleo rico em materiais pesados.',
        sources: [nasa('saturn/facts/', 'NASA · estrutura de Saturno'), paper('https://authors.library.caltech.edu/records/3cfjn-nw512', 'Cassini · núcleo difuso por sismologia dos anéis')]
      },
      elements: {
        basis: 'Elementos por ambiente · sem frações globais fixas',
        chips: [['H', 'hidrogênio · principal'], ['He', 'hélio · abundante'], ['C', 'carbono · metano'], ['N', 'nitrogênio · amônia'], ['O', 'oxigênio · gelo e água'], ['Fe', 'ferro · interior inferido']],
        text: 'A água dos anéis (H₂O) não define a composição do planeta. Seus materiais pesados e suas proporções profundas são inferidos por modelos.',
        source: nasa('saturn/facts/', 'NASA · planeta e materiais dos anéis')
      },
      facts: ['Sua densidade média é menor que a da água, apesar das pressões enormes do interior.', 'Os anéis contêm pedaços de gelo, rochas e poeira, e não uma lâmina contínua.', 'No sistema de Saturno, Enceladus lança jatos de água e Titan tem lagos de metano.'],
      factSource: nasa('saturn/facts/', 'NASA · fatos sobre Saturno')
    },
    uranus: {
      name: 'Urano', intro: 'Um gigante de gelo: o nome se refere aos materiais voláteis, não a uma superfície congelada.',
      atmosphere: {
        basis: 'Atmosfera · porcentagem em volume (aproximada)',
        rows: [['H₂ · hidrogênio molecular', 82.5], ['He · hélio', 15.2], ['CH₄ · metano', 2.3]],
        text: 'H₂ e He têm incertezas de cerca de 3,3 pontos percentuais. O metano absorve luz vermelha e contribui para a aparência azul-esverdeada.',
        sources: [sheet('uranus'), nasa('uranus/facts/', 'NASA · atmosfera e cor')]
      },
      interior: {
        text: 'Um envelope de H–He cobre materiais mais densos. Modelos incluem água, amônia, metano e rochas sob altas pressões; as frações e a separação em camadas são incertas. Não é um bloco de gelo.',
        sources: [nasa('uranus/facts/', 'NASA · materiais profundos'), paper('https://arxiv.org/abs/2403.12512', 'Modelos científicos · interiores alternativos')]
      },
      elements: {
        basis: 'Elementos e moléculas · abundâncias profundas incertas',
        chips: [['H', 'hidrogênio · H₂ e voláteis'], ['He', 'hélio · envelope'], ['C', 'carbono · CH₄'], ['N', 'nitrogênio · NH₃ modelada'], ['O', 'oxigênio · H₂O modelada']],
        text: 'H₂O, NH₃ e CH₄ são moléculas; H, O, N e C são elementos. A atmosfera medida não revela diretamente a composição global em massa.',
        sources: [nasa('uranus/facts/', 'NASA · composição'), paper('https://arxiv.org/abs/2403.12512', 'Incertezas dos modelos de interior')]
      },
      facts: ['Sua inclinação axial de cerca de 98° faz o planeta girar quase deitado.', 'Um ano de Urano dura aproximadamente 84 anos terrestres.', 'Seu eixo magnético é inclinado em quase 60° e deslocado do centro do planeta.'],
      factSource: nasa('uranus/facts/', 'NASA · fatos sobre Urano')
    },
    neptune: {
      name: 'Netuno', intro: 'Um gigante de gelo com atmosfera de H–He e uma região profunda rica em materiais mais pesados.',
      atmosphere: {
        basis: 'Atmosfera · porcentagem em volume (aproximada)',
        rows: [['H₂ · hidrogênio molecular', 80], ['He · hélio', 19], ['CH₄ · metano', 1.5]],
        text: 'As estimativas não fecham exatamente 100%: H₂ e He têm incertezas de cerca de 3,2 pontos percentuais e CH₄ de 0,5. Não são frações globais em massa.',
        source: sheet('neptune')
      },
      interior: {
        text: 'Modelos incluem um envelope de H–He e fluidos densos de água, amônia e metano associados a materiais rochosos. Quantidades, estados físicos e fronteiras internas dependem do modelo; não há chão sólido acessível.',
        sources: [nasa('neptune/neptune-facts/', 'NASA · estrutura de Netuno'), paper('https://arxiv.org/abs/2403.12512', 'Modelos científicos · interiores alternativos')]
      },
      elements: {
        basis: 'Elementos e moléculas · abundâncias profundas incertas',
        chips: [['H', 'hidrogênio · H₂ e voláteis'], ['He', 'hélio · envelope'], ['C', 'carbono · CH₄'], ['N', 'nitrogênio · NH₃ modelada'], ['O', 'oxigênio · H₂O modelada']],
        text: 'Metano atmosférico contribui para a cor. Água e amônia do interior são componentes de modelos, sem porcentagens globais diretamente medidas.',
        sources: [nasa('neptune/neptune-facts/', 'NASA · materiais e atmosfera'), paper('https://arxiv.org/abs/2403.12512', 'Incertezas dos modelos de interior')]
      },
      facts: ['Seus ventos podem ultrapassar 2.000 km/h.', 'Completa uma órbita em cerca de 165 anos terrestres.', 'Imagens antigas de Voyager realçaram o azul; cores reprocessadas mostram Netuno e Urano mais parecidos.'],
      factSource: nasa('neptune/neptune-facts/', 'NASA · fatos sobre Netuno')
    }
  };

  const modelSource = nasa('exoplanets/what-is-an-exoplanet/', 'NASA · como estudamos exoplanetas');
  const hypotheticalByKind = {
    star: 'Uma estrela deste tipo costuma ser dominada por H e He. A composição específica deste modelo não foi medida nem calculada.',
    gas: 'Um modelo de gigante gasoso pode incluir H–He e elementos pesados em seu interior. A seleção de um tipo não determina as abundâncias.',
    icegiant: 'Um modelo de gigante de gelo pode incluir H–He, voláteis e rochas. As moléculas e as proporções dependem das hipóteses adotadas.',
    rocky: 'Um modelo rochoso pode incluir silicatos e um núcleo metálico. Massa e raio, sozinhos, não identificam todos os elementos e suas proporções.',
    ocean: 'A textura oceânica é uma hipótese visual; não demonstra a presença de H₂O. Os elementos e a composição deste mundo não foram determinados.',
    desert: 'Uma superfície desértica na ilustração não identifica minerais ou química atmosférica. A composição deste mundo permanece indeterminada.'
  };
  const make = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  };
  function appendSources(parent, sources) {
    const list = Array.isArray(sources) ? sources : sources ? [sources] : [];
    if (!list.length) return;
    const line = make('p', 'sk-sources');
    list.forEach((source, index) => {
      if (index) line.append(document.createTextNode(' · '));
      const anchor = make('a', '', source.label);
      anchor.href = source.href; anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
      line.append(anchor);
    });
    parent.append(line);
  }
  function appendRows(parent, rows) {
    const list = make('dl', 'sk-fractions');
    rows.forEach(([label, value]) => {
      const pair = make('div', 'sk-fraction');
      pair.append(make('dt', '', label), make('dd', '', value.toLocaleString('pt-BR', { maximumFractionDigits: 3 }) + '%'));
      const track = make('div', 'sk-track');
      track.setAttribute('aria-hidden', 'true');
      const fill = make('span', 'sk-fill'); fill.style.width = Math.max(0, Math.min(100, value)) + '%';
      track.append(fill); pair.append(track); list.append(pair);
    });
    parent.append(list);
  }
  const expanded = new Map([['atmosphere', true], ['interior', false], ['elements', true]]);
  function group(type, title, content) {
    const details = make('details', 'sk-group');
    details.dataset.group = type;
    details.open = expanded.get(type) === true;
    details.append(make('summary', '', title));
    const inner = make('div', 'sk-group-body');
    if (content.basis) inner.append(make('p', 'sk-basis', content.basis));
    if (content.rows) appendRows(inner, content.rows);
    if (content.chips) {
      const list = make('ul', 'sk-elements');
      content.chips.forEach(([symbol, description]) => {
        const item = make('li', 'sk-element');
        item.append(make('strong', '', symbol), make('span', '', description));
        list.append(item);
      });
      inner.append(list);
    }
    if (content.text) inner.append(make('p', 'sk-explanation', content.text));
    appendSources(inner, content.sources || content.source);
    details.append(inner);
    details.addEventListener('toggle', () => {
      if (details.isConnected) expanded.set(type, details.open);
    });
    return details;
  }
  function renderKnowledge() {
    const container = document.getElementById('compositionBars');
    const body = typeof currentBody === 'function' ? currentBody() : null;
    if (!container || !body) return;
    container.classList.add('sk-knowledge');
    container.replaceChildren();
    const label = container.parentElement.querySelector('.label');
    if (label) label.textContent = 'Composição e elementos';
    const solar = (!state.systemMode || state.systemMode === 'solar') && !body.custom;
    const record = solar ? records[body.id] : null;
    container.dataset.bodyId = body.id;
    container.dataset.referenceId = record ? body.id : 'model';
    if (record) {
      container.append(make('p', 'sk-reference', 'Referência real · ' + record.name), make('p', 'sk-intro', record.intro));
      if (body._modelEdited) container.append(make('p', 'sk-caveat', 'Modelo alterado: a química abaixo continua sendo a referência de ' + record.name + ', não uma previsão dos controles.'));
      container.append(group('atmosphere', 'Atmosfera e moléculas', record.atmosphere));
      container.append(group('interior', 'Interior e materiais', record.interior));
      container.append(group('elements', 'Elementos químicos', record.elements));
      container.append(make('p', 'sk-caveat', 'Os dados de referência não mudam com os controles. Camadas desenhadas e condições editadas são modelos educativos.'));
      const facts = document.getElementById('factList');
      if (facts) {
        facts.replaceChildren(...record.facts.map(fact => make('li', '', fact)));
        let source = facts.parentElement.querySelector('.sk-fact-source');
        if (!source) { source = make('div', 'sk-fact-source'); facts.after(source); }
        source.replaceChildren(); appendSources(source, record.factSource);
      }
    } else {
      const custom = !!body.custom;
      container.append(make('p', 'sk-reference', custom ? 'Mundo criado · composição hipotética' : 'Outro sistema · composição indeterminada'));
      container.append(make('p', 'sk-intro', hypotheticalByKind[body.kind] || hypotheticalByKind.rocky));
      if (body._modelEdited) container.append(make('p', 'sk-caveat', 'Parâmetros alterados: este cenário representa uma hipótese, sem novas medidas de composição.'));
      container.append(group('atmosphere', 'Atmosfera', { text: 'A química atmosférica não foi especificada neste modelo. Pressão, textura e temperatura ajustadas não equivalem a uma detecção de gases.' }));
      container.append(group('interior', 'Interior', { text: 'As camadas exibidas ilustram uma hipótese para o tipo escolhido. Não há medidas das frações de núcleo, rocha, gelo ou gás deste mundo.' }));
      container.append(group('elements', 'Elementos químicos', { text: 'Abundâncias elementares não determinadas. Esta simulação não gera porcentagens químicas a partir da aparência do planeta.' }));
      if (!custom) appendSources(container, modelSource);
      const stale = document.querySelector('.sk-fact-source'); if (stale) stale.remove();
      const facts = document.getElementById('factList');
      if (facts) {
        const list = custom ? ['Este mundo foi criado com os controles do laboratório.', 'Massa, raio e órbita são parâmetros do modelo, não observações.', 'Texturas e camadas internas são ilustrações; elas não determinam química nem a presença de vida.'] : (body.facts || ['Este cenário usa uma estrela e um planeta de outro sistema.', 'A aparência e as condições climáticas são hipóteses educativas.']);
        facts.replaceChildren(...list.map(fact => make('li', '', fact)));
      }
    }
  }
  // Both bindings have live callers. Preserve existing renderers and refresh chemistry after each.
  const previousPT = typeof updateInfoPanelPT === 'function' ? updateInfoPanelPT : null;
  const previousInfo = typeof updateInfoPanel === 'function' ? updateInfoPanel : null;
  if (previousPT) updateInfoPanelPT = function (...args) { const result = previousPT.apply(this, args); renderKnowledge(); return result; };
  if (previousInfo) updateInfoPanel = function (...args) { const result = previousInfo.apply(this, args); renderKnowledge(); return result; };
  renderKnowledge();
})();

