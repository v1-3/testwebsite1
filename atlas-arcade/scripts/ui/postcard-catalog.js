
(function(){
  'use strict';
  const select=document.getElementById('game-menu-select');
  const shell=document.getElementById('tp-catalog-shell');
  const cardGrid=document.getElementById('tp-card-grid');
  const filterRow=document.getElementById('tp-filter-row');
  const host=document.getElementById('game-library');
  const back=document.getElementById('tp-back-catalog');
  if(!select||!shell||!cardGrid||!filterRow||!host)return;
  const categories={
    'Palavras e criatividade':{label:'Palavras',icon:'✎',color:'#D93A35'},
    'Geografia':{label:'Geografia',icon:'🌍',color:'#2358D8'},
    'Raciocínio e quebra-cabeças':{label:'Quebra-cabeças',icon:'◈',color:'#B88618'},
    'Corrida e habilidade':{label:'Habilidade',icon:'★',color:'#138A78'},
    'Ciência e exploração':{label:'Espaço',icon:'✦',color:'#1D2A6B'}
  };
  const icons={
    'wordle-section':'▦','crossword-section':'✍','literal-guess-section':'?','wordsearch-section':'⌕','draw-game-section':'✎',
    'geography-game-section':'🌐','flag-game-section':'⚑','map-game-section':'◇','earth-game-section':'◉',
    'hanoi-section':'△','jigsaw-section':'▧','parking-jam':'▣','pour-sort':'▤','block-blasters-section':'▦',
    'tetris-section':'▥','rubiks-cube-section':'⬡','skeeball-section':'◎','whack-a-mole-section':'♟','breakout-section':'▰','visual-pinball-section':'◈','pinball-3d-section':'✪','hill-climb-section':'⛰','flap-bird-section':'✈',
    'solar-system-section':'☀','nasa-eyes-section':'🪐','nasa-eyes-earth-section':'🌎',
    'astronomy-quiz-section':'✧','space-memory-section':'✦'
  };
  const descriptions={
    'wordle-section':'Encontre a palavra secreta.', 'crossword-section':'Pistas, letras e descobertas.',
    'literal-guess-section':'Quem sou eu? Adivinhe!', 'wordsearch-section':'Encontre palavras escondidas.',
    'draw-game-section':'Desenhe e descubra.', 'geography-game-section':'Um destino, três pistas.',
    'flag-game-section':'Reconheça bandeiras do mundo.', 'map-game-section':'Explore o mapa-múndi.',
    'earth-game-section':'Viaje com vistas em 360°.', 'hanoi-section':'Discos e lógica.',
    'jigsaw-section':'Arte em pequenos pedaços.', 'parking-jam':'Encontre a saída.',
    'pour-sort':'Combine e separe as cores.', 'block-blasters-section':'Preencha linhas e colunas.',
    'tetris-section':'Encaixe as peças que caem.', 'rubiks-cube-section':'Gire até combinar as faces.',
    'skeeball-section':'Role a bola e acerte os alvos em movimento.', 'whack-a-mole-section':'Acerte as toupeiras e mantenha sua sequência.', 'breakout-section':'Quebre os blocos e conquiste novos níveis.', 'visual-pinball-section':'Uma nova mesa com física adaptada de Visual Pinball.', 'pinball-3d-section':'Flippers, alvos e desafios de fliperama.', 'hill-climb-section':'Corrida pelas montanhas.',
    'flap-bird-section':'Voe por sete mundos e bata recordes.',
    'solar-system-section':'Explore o nosso sistema estelar.', 'nasa-eyes-section':'Explore os planetas com a NASA.',
    'nasa-eyes-earth-section':'Veja a Terra com os olhos da NASA.',
    'astronomy-quiz-section':'Desafie seus conhecimentos.', 'space-memory-section':'Encontre os pares do espaço.'
  };
  const entries=[];
  select.querySelectorAll('optgroup').forEach(group=>{
    const key=group.label, conf=categories[key]||{label:key,color:'#2358D8'};
    [...group.querySelectorAll('option')].forEach(option=>{if(option.value)entries.push({id:option.value,title:option.textContent.trim(),group:key,conf})});
  });
  document.getElementById('tp-game-count').textContent=String(entries.length);
  const filters=[['Todos os destinos','all'],...Object.entries(categories).map(([key,v])=>[v.label,key])];
  let active='all';
  function applyFilter(cat){
    active=cat;
    [...cardGrid.children].forEach(card=>{card.hidden=(cat!=='all'&&card.dataset.group!==cat)});
    [...filterRow.children].forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter===active)));
  }
  filters.forEach(([label,value])=>{
    const btn=document.createElement('button');btn.type='button';btn.className='tp-filter';btn.dataset.filter=value;
    btn.textContent=label;btn.setAttribute('aria-pressed',String(value==='all'));
    btn.addEventListener('click',()=>applyFilter(value));filterRow.appendChild(btn);
  });
  entries.forEach((e,i)=>{
    const card=document.createElement('button');card.type='button';card.className='tp-card';card.dataset.group=e.group;
    card.style.setProperty('--card',e.conf.color);
    const top=document.createElement('span');top.className='tp-card-top';
    const icon=document.createElement('span');icon.className='tp-card-icon';icon.textContent=icons[e.id]||e.conf.icon;
    const stamp=document.createElement('span');stamp.className='tp-card-stamp';stamp.textContent=String(i+1).padStart(2,'0')+' / '+entries.length;
    top.append(icon,stamp);
    const content=document.createElement('span');content.className='tp-card-content';
    const group=document.createElement('span');group.className='tp-card-category';group.textContent=e.conf.label.toUpperCase();
    const title=document.createElement('span');title.className='tp-card-title';title.textContent=e.title;
    const desc=document.createElement('span');desc.className='tp-card-description';desc.textContent=descriptions[e.id]||'Nova experiência em seu passaporte.';
    const action=document.createElement('span');action.className='tp-card-action';action.textContent='ABRIR EXPERIÊNCIA ↗';
    content.append(group,title,desc,action);card.append(top,content);
    card.addEventListener('click',()=>{
      select.value=e.id;select.dispatchEvent(new Event('change',{bubbles:true}));
      host.scrollIntoView({behavior:'smooth',block:'start'});
    });
    cardGrid.appendChild(card);
  });
  function updateView(){
    const playing=Boolean(select.value);
    host.classList.toggle('tp-playing',playing);
    if(back)back.hidden=!playing;
  }
  select.addEventListener('change',updateView);
  if(back)back.addEventListener('click',()=>{
    select.value='';select.dispatchEvent(new Event('change',{bubbles:true}));
    applyFilter('all');host.scrollIntoView({behavior:'smooth',block:'start'});
  });
  window.addEventListener('hashchange',()=>requestAnimationFrame(updateView));
  requestAnimationFrame(updateView);
  // The existing app keeps ownership of game selection, score, sound, and countdown.
})();
