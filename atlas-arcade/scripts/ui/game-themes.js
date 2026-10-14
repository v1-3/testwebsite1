
/* Per-game palettes change puzzle pieces, boards and supported canvas renderers without changing game rules. */
(()=>{
  'use strict';
  const select=document.getElementById('game-menu-select');
  const stage=document.getElementById('game-menu-stage');
  const bar=document.getElementById('tp-game-theme-bar');
  const options=document.getElementById('tp-game-theme-options');
  const title=document.getElementById('tp-game-theme-title');
  const caption=document.getElementById('tp-game-theme-caption');
  const active=document.getElementById('tp-game-theme-active');
  const all=document.getElementById('tp-game-theme-all');
  if(!select||!stage||!bar||!options||!title||!caption||!active||!all)return;
  const key='tp-visual-game-themes-v1';
  const themes=[
    {id:'original',name:'Original',swatch:'linear-gradient(135deg,#f8fafc 45%,#94a3b8 46%,#f8fafc 65%)',detail:'Cores originais do jogo'},
    {id:'postcard',name:'Cartão-postal',swatch:'linear-gradient(135deg,#d93a35 0 35%,#fff 35% 58%,#2358d8 58%)',detail:'Correio aéreo e viagem'},
    {id:'ocean',name:'Oceano',swatch:'linear-gradient(135deg,#b1ebf5,#007aa9)',detail:'Brisa do mar e tons azuis'},
    {id:'forest',name:'Floresta',swatch:'linear-gradient(135deg,#c5efbb,#218348)',detail:'Trilhas e natureza'},
    {id:'sunset',name:'Pôr do sol',swatch:'linear-gradient(135deg,#ffd97d,#e85d77)',detail:'Luz dourada e coral'},
    {id:'galaxy',name:'Galáxia',swatch:'linear-gradient(135deg,#25264f,#a98cff)',detail:'Céu estrelado'},
    {id:'neon',name:'Neon',swatch:'linear-gradient(135deg,#160f30 10%,#ed27d5 55%,#27dbdf)',detail:'Arcade vibrante'}
  ];
  const allowed=new Set(themes.map(t=>t.id));
  const byId=new Map(themes.map(t=>[t.id,t]));
  const gameIds=[...new Set([...select.options].map(o=>o.value).filter(Boolean))];
  let saved={};
  try{const v=JSON.parse(localStorage.getItem(key)||'{}');if(v&&typeof v==='object'&&!Array.isArray(v))saved=v}catch(e){}
  function persist(){try{localStorage.setItem(key,JSON.stringify(saved))}catch(e){}}
  function gameId(){return select.value||''}
  function gameTheme(id){return allowed.has(saved[id])?saved[id]:'original'}
  function refresh(){
    const id=gameId();
    const game=select.selectedOptions[0];
    const name=game?.textContent?.trim()||'Jogo';
    bar.hidden=!id;
    if(!id){stage.removeAttribute('data-game-theme');return}
    const theme=gameTheme(id);
    stage.dataset.gameTheme=theme;
    window.dispatchEvent(new CustomEvent('tp:game-theme-change',{detail:{id,theme}}));
    try { if(id==='flap-bird-section'&&theme!=='original'){
      const actual={postcard:'postcard',ocean:'ocean',forest:'forest',sunset:'sunset',galaxy:'space',neon:'neon'}[theme];
      document.querySelector(`[data-fb-theme="${actual}"]`)?.click();
    }
    if(id==='pinball-3d-section'&&theme!=='original'){
      const scene={postcard:'classic',ocean:'ocean',forest:'forest',sunset:'volcano',galaxy:'space',neon:'cyber'}[theme];
      const picker=document.getElementById('pb-theme');
      if(picker&&picker.value!==scene){picker.value=scene;picker.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    } catch (error) { console.warn('Tema visual não pôde ser aplicado:', error); }
    title.textContent='Tema de '+name.replace(/\s*·\s*\d+\s*Temas?/i,'');
    caption.textContent='Altera as peças, o tabuleiro, os textos e os controles dentro do jogo.';
    active.textContent='Em uso: '+byId.get(theme).name+' · salvo neste jogo';
    [...options.children].forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.theme===theme)));
  }
  for(const t of themes){
    const btn=document.createElement('button');btn.type='button';btn.className='tp-game-theme-option';
    btn.dataset.theme=t.id;btn.title=t.detail;btn.setAttribute('aria-label','Tema: '+t.name);btn.setAttribute('aria-pressed','false');
    const swatch=document.createElement('span');swatch.className='tp-game-theme-swatch';swatch.style.setProperty('--gt-swatch',t.swatch);swatch.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.textContent=t.name;
    btn.append(swatch,label);
    btn.addEventListener('click',()=>{const id=gameId();if(!id)return;saved[id]=t.id;persist();refresh()});
    options.appendChild(btn);
  }
  all.addEventListener('click',()=>{
    const theme=gameTheme(gameId());if(!gameId())return;
    for(const id of gameIds)saved[id]=theme;
    persist();refresh();active.textContent='Tema '+byId.get(theme).name+' aplicado a todos os jogos.';
  });
  select.addEventListener('change',refresh);
  window.addEventListener('hashchange',()=>requestAnimationFrame(refresh));
  refresh();
})();
