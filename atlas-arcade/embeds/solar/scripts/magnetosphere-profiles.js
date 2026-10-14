
/* Educational magnetic-environment profiles. Angles are dipole-to-spin angles,
 * not obliquity to the orbital plane. Sizes are illustrative, not a field-strength scale.
 * `offset` is a signed axial fraction only when a direction is established here.
 * `offsetMagnitude` records the model's 3-D magnitude; it is not an axial coordinate.
 */
window.PJ_MAGNETIC_PROFILES = {
  sun: {
    title: 'Heliosfera do Sol',
    type: 'heliosphere',
    tiltDeg: null,
    offset: 0,
    offsetMagnitude: 0,
    label: 'Vento solar e espiral de Parker',
    summary: 'O Sol lança plasma magnetizado para o espaço. Esse vento solar forma a heliosfera, uma região que envolve os planetas e encontra o meio interestelar.',
    details: [
      'A rotação solar curva o campo transportado pelo vento em uma espiral de Parker.',
      'A heliopausa marca a fronteira entre o plasma solar e o meio interestelar.',
      'A heliosfera se expande e se contrai com as mudanças do vento solar.'
    ],
    source: { title: 'NASA — What Is the Solar Wind?', url: 'https://science.nasa.gov/sun/what-is-the-solar-wind/' },
    color: '#edaa43',
    subsolarR: null,
    extentNote: 'A heliosfera se estende para além dos planetas. Sua forma e seu tamanho variam; o desenho mostra a expansão do vento, sem escala de distância.'
  },
  mercury: {
    title: 'Magnetosfera de Mercúrio',
    type: 'intrinsic',
    tiltDeg: 0,
    offset: 0.20,
    offsetMagnitude: 0.20,
    label: 'Dipolo quase alinhado, deslocado ao norte',
    summary: 'Mercúrio tem um campo interno fraco e uma magnetosfera compacta, muito sensível ao vento solar perto do Sol.',
    details: [
      'O centro magnético fica cerca de 0,20 raio planetário ao norte do centro do planeta.',
      'O campo na superfície tem aproximadamente 1% da intensidade do campo terrestre.',
      'A reconexão magnética permite que partículas do vento solar alcancem a superfície.'
    ],
    source: { title: 'NASA — MESSENGER: Offset Magnetic Field', url: 'https://astrobiology.nasa.gov/missions/messenger/' },
    sources: [
      { title: 'NASA — Mercury Facts', url: 'https://science.nasa.gov/mercury/facts/' },
      { title: 'NASA NTRS — The Plasma Environment of Mercury', url: 'https://ntrs.nasa.gov/api/citations/20150008969/downloads/20150008969.pdf' },
      { title: 'NASA NSSDCA — Mercury Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html' }
    ],
    color: '#8ca5c4',
    subsolarR: 1.45,
    extentNote: 'Magnetopausa subsolar: média de ≈1,45 raios desde o centro. Varia com o vento solar e pode chegar à superfície em compressões extremas.'
  },
  venus: {
    title: 'Magnetosfera induzida de Vênus',
    type: 'induced',
    tiltDeg: null,
    offset: 0,
    offsetMagnitude: 0,
    label: 'Campo solar drapeado sobre a ionosfera',
    summary: 'Vênus não tem um campo magnético global gerado no interior. O vento solar interage com sua ionosfera e induz o ambiente magnético ao redor do planeta.',
    details: [
      'A radiação ultravioleta solar ioniza gases da atmosfera superior.',
      'O campo carregado pelo vento solar se acumula e se curva ao redor da ionosfera.',
      'Uma cauda magnética se estende no sentido oposto ao Sol; não é um dipolo interno.'
    ],
    source: { title: 'NASA — Venus Facts: Magnetosphere', url: 'https://science.nasa.gov/venus/venus-facts/' },
    color: '#dda06b',
    subsolarR: null,
    extentNote: 'A barreira induzida responde à pressão do vento solar e à ionosfera. Não há um raio fixo de magnetopausa de dipolo para representar.'
  },
  earth: {
    title: 'Magnetosfera da Terra',
    type: 'intrinsic',
    tiltDeg: 11,
    offset: 0,
    offsetMagnitude: 0,
    label: 'Dipolo inclinado e cauda magnética',
    summary: 'Movimentos do ferro líquido no núcleo externo geram o campo terrestre. O vento solar comprime o lado diurno e estica o campo no lado noturno.',
    details: [
      'A magnetopausa diurna costuma ficar a cerca de 6–10 raios terrestres do centro.',
      'A cauda pode se estender por centenas de raios, além da órbita da Lua.',
      'A inclinação de ≈11° é uma referência esquemática; o dipolo muda com a época e o modelo.'
    ],
    source: { title: 'NASA — Magnetospheres', url: 'https://science.nasa.gov/heliophysics/focus-areas/magnetosphere-ionosphere/' },
    sources: [
      { title: 'NASA/JPL — Cassini: Near-zero Magnetic-field Tilt', url: 'https://www.jpl.nasa.gov/news/groundbreaking-science-emerges-from-ultra-close-orbits-of-saturn/' }
    ],
    color: '#4daec3',
    subsolarR: 10,
    extentNote: 'Referência diurna: ≈10 raios terrestres desde o centro, dentro da faixa aproximada de 6–10. Tempestades solares alteram essas fronteiras.'
  },
  mars: {
    title: 'Ambiente magnético de Marte',
    type: 'hybrid',
    tiltDeg: null,
    offset: 0,
    offsetMagnitude: 0,
    label: 'Campo induzido e campos locais na crosta',
    summary: 'Marte não possui um dipolo global ativo. O campo do vento solar envolve sua atmosfera, enquanto regiões magnetizadas da crosta criam estruturas locais.',
    details: [
      'O campo solar se acumula e se curva ao redor do planeta, formando uma magnetosfera induzida.',
      'Os campos preservados na crosta são restos do antigo campo marciano.',
      'A interação entre os campos induzidos e crustais pode torcer a cauda magnética.'
    ],
    source: { title: 'NASA — Ten Years at Mars with MAVEN', url: 'https://science.nasa.gov/resource/ten-years-at-mars-with-nasas-maven-mission/' },
    color: '#df8b72',
    subsolarR: null,
    extentNote: 'A fronteira induzida e os campos crustais variam com a posição, a rotação e o vento solar. Os pequenos arcos representam regiões locais, sem escala.'
  },
  jupiter: {
    title: 'Magnetosfera de Júpiter',
    type: 'intrinsic',
    tiltDeg: 10,
    offset: 0,
    offsetMagnitude: 0.119,
    label: 'Grande magnetosfera em rápida rotação',
    summary: 'Júpiter possui uma enorme magnetosfera. Sua rotação rápida organiza o plasma, e partículas vindas da lua Io alimentam um toro ao redor do planeta.',
    details: [
      'O dipolo magnético tem inclinação de aproximadamente 10° em relação ao eixo de rotação.',
      'A fronteira diurna pode ficar a cerca de 50–100 raios de Júpiter.',
      'Os vulcões de Io fornecem material para o toro de partículas carregadas.'
    ],
    source: { title: 'NASA/GSFC — Magnetism of Other Planets', url: 'https://cdaweb.gsfc.nasa.gov/pub/documents/archived_websites/pwg.gsfc.nasa.gov/earthmag/mill_8.htm' },
    sources: [
      { title: 'NASA NSSDCA — Jupiter Fact Sheet, GSFC-O6', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html' },
      { title: 'NASA — Jupiter’s Magnetosphere', url: 'https://science.nasa.gov/resource/jupiters-magnetosphere/' }
    ],
    color: '#c993d6',
    subsolarR: 75,
    extentNote: 'Referência ilustrativa: 75 raios desde o centro, dentro da faixa de 50–100. A pressão solar e o plasma interno alteram o limite; o tamanho desenhado não mede a intensidade.'
  },
  saturn: {
    title: 'Magnetosfera de Saturno',
    type: 'intrinsic',
    tiltDeg: 0,
    offset: 0,
    offsetMagnitude: 0,
    label: 'Dipolo praticamente alinhado: menos de 0,01°',
    summary: 'O campo de Saturno é quase perfeitamente alinhado ao eixo de rotação. A magnetosfera recebe plasma do material lançado por Encélado.',
    details: [
      'As passagens finais da Cassini limitaram a inclinação do dipolo a menos de 0,01°.',
      'Partículas das plumas de Encélado são uma importante fonte de plasma.',
      'O vento solar e a dinâmica do plasma interno modificam a magnetosfera.'
    ],
    source: { title: 'NASA/JPL — Cassini Grand Finale Findings', url: 'https://www.jpl.nasa.gov/news/groundbreaking-science-emerges-from-ultra-close-orbits-of-saturn/' },
    sources: [
      { title: 'NASA — Cassini: Magnetosphere', url: 'https://science.nasa.gov/mission/cassini/science/magnetosphere/' }
    ],
    color: '#d6b976',
    subsolarR: null,
    extentNote: 'O limite varia com o vento solar e o plasma interno. O desenho usa uma escala própria; a onda de choque fica além da magnetopausa e não deve ser confundida com ela.'
  },
  uranus: {
    title: 'Magnetosfera de Urano',
    type: 'intrinsic',
    tiltDeg: 58.6,
    offset: 0,
    offsetMagnitude: 0.352,
    label: 'Dipolo inclinado ≈59° e fora do centro',
    summary: 'Urano possui um campo interno fortemente inclinado e assimétrico. A rotação muda muito a orientação do campo diante do vento solar.',
    details: [
      'O modelo Voyager GSFC-O3 descreve uma inclinação de 58,6° em relação ao eixo de rotação.',
      'O deslocamento do dipolo nesse modelo tem magnitude de ≈0,35 raio planetário.',
      'Voyager 2 observou a magnetopausa a aproximadamente 18 raios de Urano em 1986.'
    ],
    source: { title: 'NASA NSSDCA — Uranus Fact Sheet, GSFC-O3', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html' },
    sources: [
      { title: 'NASA NTRS — Magnetic Fields at Uranus', url: 'https://ntrs.nasa.gov/citations/19860059520' }
    ],
    color: '#78c7b6',
    subsolarR: 18,
    extentNote: 'A distância de 18 raios é uma referência do encontro da Voyager 2, não um limite fixo atual. O campo real tem componentes não dipolares; a geometria do desenho é simplificada.'
  },
  neptune: {
    title: 'Magnetosfera de Netuno',
    type: 'intrinsic',
    tiltDeg: 46.9,
    offset: 0,
    offsetMagnitude: 0.485,
    label: 'Dipolo inclinado ≈47° e fortemente assimétrico',
    summary: 'O campo interno de Netuno é inclinado e afastado do centro. Sua geometria muda diante do vento solar conforme o planeta gira.',
    details: [
      'O modelo Voyager GSFC-O8 descreve inclinação de 46,9° e deslocamento de ≈0,49 raio planetário.',
      'Campos de ordem superior também são importantes perto do planeta; um dipolo não descreve toda a estrutura.',
      'A inclinação magnética permite que as auroras apareçam longe dos polos de rotação.'
    ],
    source: { title: 'NASA NSSDCA — Neptune Fact Sheet, GSFC-O8', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html' },
    sources: [
      { title: 'NASA — Neptune Auroras (Hubble and Webb)', url: 'https://science.nasa.gov/asset/webb/neptune-auroras-hubble-and-webb-image/' },
      { title: 'NASA NTRS — Planetary Magnetism', url: 'https://ntrs.nasa.gov/api/citations/20150011017/downloads/20150011017.pdf' }
    ],
    color: '#779ee5',
    subsolarR: null,
    extentNote: 'A magnetopausa varia com a rotação e o vento solar. Os parâmetros vêm de modelos baseados na passagem da Voyager 2; não representam uma medição em tempo real.'
  }
};

