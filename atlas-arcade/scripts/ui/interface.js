
/* ATLAS ARCADE • Navigation and interface enhancements (non-destructive).
   Existing games retain responsibility for their gameplay and all game state. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const select=$('game-menu-select');
 const shell=$('tp-catalog-shell');
 const gameHost=$('game-library');
 const stage=$('game-menu-stage');
 const cards=$('tp-card-grid');
 const filters=$('tp-filter-row');
 const back=$('tp-back-catalog');
 const themeBar=$('tp-game-theme-bar');
 if(!select||!shell||!gameHost||!stage||!cards||!filters||!back)return;
 const picker=select.closest('.game-library-header');
 if(picker)gameHost.insertBefore(picker,shell);
 // Headings and colors on the site are styled via the new interface tokens.
 document.title='Atlas Arcade · Postal Jogos';
 const categories={
  'Palavras e criatividade':'Palavras e criatividade',
  'Geografia':'Geografia',
  'Raciocínio e quebra-cabeças':'Puzzles e estratégia',
  'Corrida e habilidade':'Arcade e habilidade',
  'Ciência e exploração':'Ciência e espaço'
 };
 const guides={
  'wordle-section':'Descubra a palavra secreta. Digite uma tentativa e use as dicas de letras para chegar à resposta.',
  'crossword-section':'Selecione uma pista, preencha as letras da grade e use a verificação quando precisar.',
  'literal-guess-section':'Leia a descrição e escreva o animal ou objeto. Altere o idioma e a categoria nos controles.',
  'wordsearch-section':'Encontre as palavras na grade. Arraste pelas letras para marcar uma palavra inteira.',
  'draw-game-section':'Escolha uma cor e desenhe na tela. Use os controles para limpar, apagar ou trocar a brincadeira.',
  'geography-game-section':'Leia as pistas geográficas, digite o país ou território e confira sua resposta.',
  'flag-game-section':'Identifique os países pelas bandeiras. Escolha uma região ou jogue com o mundo todo.',
  'map-game-section':'Encontre os países no mapa interativo. Amplie o mapa para localizar os territórios menores.',
  'earth-game-section':'Comece uma rodada, explore o panorama e marque no mapa onde acha que está.',
  'hanoi-section':'Leve todos os discos à última torre. Mova um disco de cada vez sem colocar um maior sobre um menor.',
  'jigsaw-section':'Pesquise uma imagem, escolha a dificuldade e encaixe as peças até montar o quebra-cabeça.',
  'parking-jam':'Deslize os veículos na direção permitida para abrir caminho e tirar o carro principal.',
  'pour-sort':'Transfira os líquidos entre recipientes até cada recipiente reunir uma única cor.',
  'block-blasters-section':'Coloque os blocos na grade para completar linhas e colunas e continuar marcando pontos.',
  'tetris-section':'Mova e gire as peças para completar linhas. Use os controles na tela ou o teclado.',
  'rubiks-cube-section':'Gire as faces do cubo, altere o ângulo de visão e tente reunir uma cor por face.',
  'flap-bird-section':'Toque, clique ou pressione espaço para voar. Passe pelos obstáculos para marcar pontos.',
  'skeeball-section':'Ajuste a mira e a força, observe os alvos giratórios e lance a bola. Você tem nove bolas para fazer o maior placar. Setas ou A e D ajustam a mira; Espaço lança e P pausa.',
  'whack-a-mole-section':'Acerte as toupeiras com um clique, toque ou as teclas 1 a 9. Faça sequências de acertos durante a rodada. Use os controles do jogo para começar, pausar e reiniciar.',
  'breakout-section':'Mova a raquete com as setas, A e D, o mouse ou o toque. Lance com Espaço ou Jogar. Quebre todos os blocos para avançar de nível; P pausa o jogo.',
  'visual-pinball-section':'Segure A e D ou as setas para os flippers. Segure Espaço e solte para lançar a bola. P pausa a mesa; os botões também funcionam por toque.',
  'pinball-3d-section':'Use os flippers para manter a bola em jogo, acertar os alvos e somar pontos.',
  'hill-climb-section':'Acelere e controle a inclinação do veículo para atravessar o terreno sem capotar.',
  'solar-system-section':'Explore os planetas e suas órbitas na simulação interativa.',
  'nasa-eyes-section':'Escolha entre explorar o Sistema Solar ou a Terra na experiência da NASA.',
  'nasa-eyes-earth-section':'Abra o modo Terra da NASA e explore as visualizações disponíveis.',
  'astronomy-quiz-section':'Responda às perguntas sobre astronomia. Selecione idioma, tema e dificuldade.',
  'space-memory-section':'Vire as cartas e encontre pares de imagens espaciais com o menor número de tentativas.'
 };
 const gameEntries=[...select.querySelectorAll('optgroup')].flatMap(group=>
  [...group.querySelectorAll('option[value]')].filter(o=>o.value).map(o=>({id:o.value,name:o.textContent.trim(),group:group.label}))
 );
 const byId=new Map(gameEntries.map(e=>[e.id,e]));
 // Enrich cards with better screen-reader labels and controls.
 const cardEls=[...cards.querySelectorAll('.tp-card')];
 cardEls.forEach((card,i)=>{
  const e=gameEntries[i]; if(!e)return;
  card.dataset.gameId=e.id;
  card.setAttribute('aria-label',`Abrir ${e.name}. ${categories[e.group]||e.group}`);
  const category=card.querySelector('.tp-card-category');if(category)category.textContent=categories[e.group]||e.group;
  const action=card.querySelector('.tp-card-action');if(action)action.textContent='JOGAR AGORA  ↗';
 });
 const searchRow=document.createElement('div');
 searchRow.className='ux-catalog-utilities';
 const searchWrap=document.createElement('div');searchWrap.className='ux-search-wrap';
 searchWrap.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>';
 const search=document.createElement('input'); search.type='search'; search.id='ux-game-search';
 search.placeholder='Buscar jogo, tema ou categoria…';
 search.setAttribute('aria-label','Buscar jogos no catálogo');
 search.autocomplete='off';
 const clear=document.createElement('button');clear.type='button';clear.className='ux-search-clear';
 clear.setAttribute('aria-label','Limpar busca');clear.textContent='×';
 clear.addEventListener('click',()=>{search.value='';applySearch();search.focus()});
 searchWrap.append(search,clear);
 const resultCount=document.createElement('div');resultCount.className='ux-results';resultCount.setAttribute('role','status');resultCount.setAttribute('aria-live','polite');
 searchRow.append(searchWrap,resultCount);
 shell.insertBefore(searchRow,filters);
 const empty=document.createElement('div');empty.className='ux-empty';empty.hidden=true;
 empty.innerHTML='<strong>Nenhum jogo encontrado.</strong><p>Tente buscar por outra palavra ou escolha outra categoria.</p>';
 cards.after(empty);
 const fold=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function applySearch(){
  const q=fold(search.value.trim());
  const currentFilter=filters.querySelector('.tp-filter[aria-pressed="true"]')?.dataset.filter||'all';
  let visible=0;
  for(const card of cardEls){
   const name=fold(card.innerText+' '+(card.dataset.group||''));
   const matchSearch=!q||name.includes(q);
   const matchFilter=currentFilter==='all'||card.dataset.group===currentFilter;
   card.hidden=!(matchSearch&&matchFilter);
   if(!card.hidden)visible++;
  }
  empty.hidden=visible>0;
  resultCount.textContent=visible+' '+(visible===1?'jogo encontrado':'jogos encontrados');
  clear.hidden=!search.value;
 }
 search.addEventListener('input',applySearch);
 filters.addEventListener('click',e=>{if(e.target.closest('.tp-filter'))queueMicrotask(applySearch)});
 // Clear search when using the existing back-to-catalog control.
 back.addEventListener('click',()=>{
  search.value='';queueMicrotask(applySearch);
  if(location.hash!=='#game-library')history.replaceState(null,'','#game-library');
 });
 document.querySelectorAll('a[href="#game-library"]').forEach(link=>link.addEventListener('click',()=>back.click()));
 window.addEventListener('hashchange',()=>{if(location.hash==='#game-library'&&select.value)back.click()});
 // Offer a real game toolbar, without cloning or moving playable elements.
 const toolbar=document.createElement('div');toolbar.className='ux-game-toolbar';toolbar.hidden=true;
 toolbar.setAttribute('aria-label','Navegação do jogo');
 const intro=document.createElement('div');
 intro.innerHTML='<span class="ux-game-kicker">ARCADE / DESTINO <span id="ux-game-position"></span></span><h2 id="ux-game-title" class="ux-game-name"></h2><p id="ux-game-subtitle" class="ux-game-subtitle"></p>';
 const actions=document.createElement('div');actions.className='ux-game-actions';
 const helpButton=document.createElement('button');helpButton.type='button';helpButton.className='ux-control-button';helpButton.textContent='ⓘ  Como jogar';helpButton.setAttribute('aria-controls','ux-game-help');helpButton.setAttribute('aria-expanded','false');
 const fullScreen=document.createElement('button');fullScreen.type='button';fullScreen.className='ux-control-button';fullScreen.textContent='⤢  Tela cheia';
 back.textContent='←  Todos os jogos';
 actions.append(back,helpButton,fullScreen);toolbar.append(intro,actions);
 const help=document.createElement('details');help.className='ux-help';help.id='ux-game-help';help.hidden=true;
 const helpSummary=document.createElement('summary');helpSummary.textContent='Guia rápido';
 const helpContent=document.createElement('p');help.append(helpSummary,helpContent);
 const anchor=themeBar||stage;
 gameHost.insertBefore(toolbar,anchor);
 gameHost.insertBefore(help,anchor);
 // Put the help state behind an accessible, keyboard-usable disclosure.
 helpButton.addEventListener('click',()=>{
  help.hidden=false;help.open=!help.open;helpButton.setAttribute('aria-expanded',String(help.open));
  if(help.open)help.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 help.addEventListener('toggle',()=>helpButton.setAttribute('aria-expanded',String(help.open)));
 fullScreen.addEventListener('click',async()=>{
  try{
   if(document.fullscreenElement){await document.exitFullscreen()}
   else if(stage.requestFullscreen){await stage.requestFullscreen()}
  }catch(e){fullScreen.textContent='Tela cheia indisponível';setTimeout(()=>{fullScreen.textContent='⤢  Tela cheia'},1600)}
 });
 document.addEventListener('fullscreenchange',()=>{fullScreen.textContent=document.fullscreenElement?'↙  Sair da tela cheia':'⤢  Tela cheia'});
 function updateGame(){
  const id=select.value;const e=byId.get(id);const playing=Boolean(e);
  toolbar.hidden=!playing;
  help.hidden=!playing;
  if(!playing){help.open=false;return}
  const i=gameEntries.findIndex(entry=>entry.id===id);
  const cleanTitle=e.name.replace(/\s*·\s*\d+\s*Temas?/i,'');
  $('ux-game-title').textContent=cleanTitle;
  $('ux-game-position').textContent=String(i+1).padStart(2,'0')+' / '+String(gameEntries.length).padStart(2,'0');
  $('ux-game-subtitle').textContent=categories[e.group]||e.group;
  helpContent.textContent=guides[id]||'Use os controles dentro do jogo para começar e acompanhar sua pontuação.';
  help.open=false;helpButton.setAttribute('aria-expanded','false');
  try{localStorage.setItem('ux-last-game',id)}catch(e){}
 }
 select.addEventListener('change',updateGame);
 updateGame();
 // Keyboard shortcut: / focuses catalog search; Esc clears it.
 document.addEventListener('keydown',e=>{
  const active=document.activeElement;
  const typing=active?.matches?.('input,textarea,select,[contenteditable="true"]');
  if(e.key==='/'&&!typing&&!select.value){e.preventDefault();search.focus()}
  if(e.key==='Escape'&&active===search){search.value='';applySearch();search.blur()}
 });
 const nav=document.querySelector('.tp-header-actions');
 if(nav){
  const badge=document.createElement('span');badge.className='ux-header-badge';badge.textContent='EXPLORAR · JOGAR · VOLTAR';
  nav.prepend(badge);
 }
 // Clarify action and intro text; preserve personalized written content.
 const introNote=document.querySelector('.tp-card-note');
 if(introNote)introNote.textContent='Escolha um jogo para começar. Seu progresso e suas preferências continuam salvos.';
 const catalogTitle=$('tp-catalog-heading');
 if(catalogTitle)catalogTitle.innerHTML='Sua próxima <em>aventura começa aqui.</em>';
 const catalogSub=$('postal-catalog')?.querySelector('p');
 if(catalogSub)catalogSub.textContent=gameEntries.length+' experiências para explorar, aprender e se divertir. Encontre sua próxima missão.';
 // On small screens the filtered catalog stays responsive without re-rendering the games.
 applySearch();
})();

