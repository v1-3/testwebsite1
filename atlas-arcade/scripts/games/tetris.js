
/* Tetris: self-contained, seven-bag falling-block game with mobile controls. */
(() => {
  'use strict';
  const root=document.getElementById('tetris-section'); if(!root)return;
  const $=id=>document.getElementById(id);
  const canvas=$('tt-board'),ctx=canvas.getContext('2d');
  const lang=$('tt-language'),overlay=$('tt-overlay'),overlayTitle=$('tt-overlay-title'),overlayText=$('tt-overlay-text');
  const pauseButton=$('tt-pause'),overlayButton=$('tt-overlay-button'),holdButton=$('tt-hold-button');
  const status=$('tt-status');
  const W=10,H=20,CELL=30;
  const BASE={
    I:[[1,1,1,1]], O:[[1,1],[1,1]],
    T:[[0,1,0],[1,1,1]], S:[[0,1,1],[1,1,0]], Z:[[1,1,0],[0,1,1]],
    J:[[1,0,0],[1,1,1]], L:[[0,0,1],[1,1,1]]
  };
  const COLORS={I:'#22d3ee',O:'#facc15',T:'#c084fc',S:'#4ade80',Z:'#fb7185',J:'#60a5fa',L:'#fb923c'};
  const originalColors={...COLORS};
  window.addEventListener('tp:game-theme-change',event=>{
    if(event.detail?.id!=='tetris-section')return;
    const themed=event.detail.theme!=='original';
    const computed=getComputedStyle(root);
    Object.keys(originalColors).forEach((type,index)=>{
      COLORS[type]=themed?(computed.getPropertyValue('--gg-block-'+(index+1)).trim()||originalColors[type]):originalColors[type];
    });
    draw();
  });
  const vocab={
    pt:{eyebrow:'JOGO DE BLOCOS EM QUEDA',intro:'Encaixe os blocos e complete linhas para marcar pontos.',language:'Idioma',score:'Pontos',best:'Recorde',lines:'Linhas',level:'Nível',next:'Próxima peça',hold:'Guardar',play:'Jogar',pause:'Pausar',resume:'Continuar',new:'Novo jogo',left:'Esquerda',right:'Direita',rotate:'Girar',down:'Descer',drop:'Soltar',holdButton:'Guardar peça (C)',how:'Como jogar',help:'← → movem; ↑ ou X giram; ↓ acelera; espaço solta; C guarda a peça; P pausa. No celular, use os botões ou deslize no tabuleiro. Complete linhas horizontais para ganhar pontos.',ready:'Pressione Jogar para começar.',paused:'Jogo pausado.',over:'Fim de jogo',end:'Pontos finais',go:'Complete linhas para marcar pontos.',clear:'Linhas eliminadas',holdUsed:'Você já guardou uma peça nesta jogada.',board:'Tabuleiro de Tetris',nextAlt:'Próxima peça',holdAlt:'Peça guardada'},
    en:{eyebrow:'FALLING BLOCK PUZZLE',intro:'Fit falling blocks together and clear lines to score.',language:'Language',score:'Score',best:'Best',lines:'Lines',level:'Level',next:'Next piece',hold:'Hold',play:'Play',pause:'Pause',resume:'Resume',new:'New game',left:'Left',right:'Right',rotate:'Rotate',down:'Down',drop:'Drop',holdButton:'Hold piece (C)',how:'How to play',help:'← → move; ↑ or X rotate; ↓ speeds up; space drops; C holds a piece; P pauses. On mobile use the buttons or swipe the board. Fill horizontal rows to score.',ready:'Press Play to begin.',paused:'Game paused.',over:'Game over',end:'Final score',go:'Complete lines to score.',clear:'Lines cleared',holdUsed:'You can only hold once per piece.',board:'Tetris board',nextAlt:'Next piece',holdAlt:'Held piece'},
    es:{eyebrow:'PUZLE DE BLOQUES',intro:'Encaja las piezas y completa filas para conseguir puntos.',language:'Idioma',score:'Puntos',best:'Récord',lines:'Líneas',level:'Nivel',next:'Siguiente pieza',hold:'Guardar',play:'Jugar',pause:'Pausar',resume:'Continuar',new:'Partida nueva',left:'Izquierda',right:'Derecha',rotate:'Girar',down:'Bajar',drop:'Soltar',holdButton:'Guardar pieza (C)',how:'Cómo jugar',help:'← → mueven; ↑ o X giran; ↓ acelera; espacio suelta; C guarda; P pausa. En móvil, usa los botones o desliza sobre el tablero. Completa filas horizontales.',ready:'Pulsa Jugar para empezar.',paused:'Juego pausado.',over:'Fin del juego',end:'Puntuación final',go:'Completa filas para ganar puntos.',clear:'Líneas eliminadas',holdUsed:'Solo puedes guardar una vez por pieza.',board:'Tablero de Tetris',nextAlt:'Siguiente pieza',holdAlt:'Pieza guardada'},
    it:{eyebrow:'PUZZLE A BLOCCHI CADENTI',intro:'Incastra i blocchi e completa le righe per fare punti.',language:'Lingua',score:'Punti',best:'Record',lines:'Linee',level:'Livello',next:'Prossimo pezzo',hold:'Conserva',play:'Gioca',pause:'Pausa',resume:'Riprendi',new:'Nuova partita',left:'Sinistra',right:'Destra',rotate:'Ruota',down:'Giù',drop:'Lascia',holdButton:'Conserva pezzo (C)',how:'Come giocare',help:'← → spostano; ↑ o X ruotano; ↓ accelera; spazio lascia cadere; C conserva; P mette in pausa. Su telefono usa i pulsanti o scorri sulla griglia. Completa le righe.',ready:'Premi Gioca per iniziare.',paused:'Gioco in pausa.',over:'Partita finita',end:'Punteggio finale',go:'Completa righe per fare punti.',clear:'Linee eliminate',holdUsed:'Puoi conservare solo una volta per pezzo.',board:'Griglia di Tetris',nextAlt:'Prossimo pezzo',holdAlt:'Pezzo conservato'},
    de:{eyebrow:'FALLBLOCK-PUZZLE',intro:'Setze die fallenden Blöcke zusammen und vervollständige Reihen.',language:'Sprache',score:'Punkte',best:'Rekord',lines:'Linien',level:'Level',next:'Nächster Stein',hold:'Halten',play:'Spielen',pause:'Pause',resume:'Weiter',new:'Neues Spiel',left:'Links',right:'Rechts',rotate:'Drehen',down:'Runter',drop:'Fallen',holdButton:'Stein halten (C)',how:'Spielanleitung',help:'← → bewegen; ↑ oder X drehen; ↓ beschleunigt; Leertaste lässt fallen; C hält den Stein; P pausiert. Am Handy Tasten nutzen oder auf dem Feld wischen. Waagerechte Reihen füllen.',ready:'Drücke Spielen zum Starten.',paused:'Spiel pausiert.',over:'Spiel vorbei',end:'Endpunktzahl',go:'Vervollständige Reihen für Punkte.',clear:'Gelöschte Linien',holdUsed:'Halten ist nur einmal pro Stein möglich.',board:'Tetris-Spielfeld',nextAlt:'Nächster Stein',holdAlt:'Gehaltener Stein'},
    fr:{eyebrow:'CASSE-TÊTE DE BLOCS',intro:'Assemblez les blocs qui tombent et complétez des lignes.',language:'Langue',score:'Score',best:'Record',lines:'Lignes',level:'Niveau',next:'Pièce suivante',hold:'Réserve',play:'Jouer',pause:'Pause',resume:'Reprendre',new:'Nouvelle partie',left:'Gauche',right:'Droite',rotate:'Tourner',down:'Descendre',drop:'Lâcher',holdButton:'Réserver une pièce (C)',how:'Comment jouer',help:'← → déplacent ; ↑ ou X pivotent ; ↓ accélère ; espace lâche ; C réserve ; P met en pause. Sur mobile, utilisez les boutons ou faites glisser sur la grille. Remplissez des lignes horizontales.',ready:'Appuyez sur Jouer pour commencer.',paused:'Jeu en pause.',over:'Partie terminée',end:'Score final',go:'Complétez des lignes pour marquer.',clear:'Lignes effacées',holdUsed:'Une seule réserve par pièce.',board:'Grille Tetris',nextAlt:'Pièce suivante',holdAlt:'Pièce en réserve'},
    nl:{eyebrow:'VALLENDE BLOKKEN',intro:'Stapel de vallende blokken en maak rijen vol voor punten.',language:'Taal',score:'Punten',best:'Record',lines:'Lijnen',level:'Niveau',next:'Volgend blok',hold:'Bewaar',play:'Spelen',pause:'Pauze',resume:'Verder',new:'Nieuw spel',left:'Links',right:'Rechts',rotate:'Draaien',down:'Omlaag',drop:'Vallen',holdButton:'Blok bewaren (C)',how:'Spelregels',help:'← → bewegen; ↑ of X draaien; ↓ versnelt; spatie laat vallen; C bewaart een blok; P pauzeert. Gebruik op mobiel de knoppen of veeg op het bord. Vul horizontale rijen.',ready:'Druk op Spelen om te beginnen.',paused:'Spel gepauzeerd.',over:'Spel voorbij',end:'Eindscore',go:'Vul rijen voor punten.',clear:'Lijnen gewist',holdUsed:'Je kunt maar één keer per blok bewaren.',board:'Tetris-bord',nextAlt:'Volgend blok',holdAlt:'Bewaard blok'},
    sv:{eyebrow:'FALLANDE BLOCK',intro:'Passa ihop fallande block och fyll rader för poäng.',language:'Språk',score:'Poäng',best:'Rekord',lines:'Rader',level:'Nivå',next:'Nästa bit',hold:'Spara',play:'Spela',pause:'Pausa',resume:'Fortsätt',new:'Nytt spel',left:'Vänster',right:'Höger',rotate:'Rotera',down:'Ner',drop:'Släpp',holdButton:'Spara bit (C)',how:'Så spelar du',help:'← → flyttar; ↑ eller X roterar; ↓ snabbar på; mellanslag släpper; C sparar en bit; P pausar. Använd knapparna eller svep på mobilen. Fyll vågräta rader.',ready:'Tryck på Spela för att börja.',paused:'Spelet är pausat.',over:'Spelet är slut',end:'Slutpoäng',go:'Fyll rader för poäng.',clear:'Rader rensade',holdUsed:'Du får bara spara en gång per bit.',board:'Tetris-bräde',nextAlt:'Nästa bit',holdAlt:'Sparad bit'},
    no:{eyebrow:'FALLENDE BLOKKER',intro:'Plasser fallende blokker og fyll rader for poeng.',language:'Språk',score:'Poeng',best:'Rekord',lines:'Linjer',level:'Nivå',next:'Neste brikke',hold:'Lagre',play:'Spill',pause:'Pause',resume:'Fortsett',new:'Nytt spill',left:'Venstre',right:'Høyre',rotate:'Roter',down:'Ned',drop:'Slipp',holdButton:'Lagre brikke (C)',how:'Slik spiller du',help:'← → flytter; ↑ eller X roterer; ↓ går raskere; mellomrom slipper; C lagrer; P pauser. Bruk knappene eller sveip på mobilen. Fyll vannrette rader.',ready:'Trykk Spill for å starte.',paused:'Spillet er satt på pause.',over:'Spillet er over',end:'Sluttpoeng',go:'Fyll rader for poeng.',clear:'Linjer fjernet',holdUsed:'Du kan bare lagre én gang per brikke.',board:'Tetris-brett',nextAlt:'Neste brikke',holdAlt:'Lagret brikke'}
  };
  const t=k=>(vocab[lang.value]||vocab.pt)[k]||vocab.en[k]||k;
  let board=[],bag=[],queue=[],active=null,held=null,heldThisPiece=false;
  let score=0,best=0,lines=0,level=1,started=false,playing=false,gameOver=false;
  let frameId=null,lastFrame=0,fallElapsed=0;
  // Auto-shift is clocked from the game animation frame rather than relying on
  // browser-generated keyboard repeats or pointer events after the first press.
  const heldInputs=new Map();
  const REPEATABLE=new Set(['left','right','down']);
  const REPEAT_DELAY=175, SIDE_INTERVAL=65, DOWN_INTERVAL=45;
  function releaseInput(id){heldInputs.delete(id);}
  function releaseAllInputs(){heldInputs.clear();}
  function pressInput(id,cmd){
    if(!playing||heldInputs.has(id))return;
    action(cmd); // The first movement must happen instantly on press.
    if(REPEATABLE.has(cmd))heldInputs.set(id,{cmd,untilRepeat:REPEAT_DELAY});
  }
  function updateHeldInputs(dt){
    for(const state of heldInputs.values()){
      state.untilRepeat-=dt;
      const interval=state.cmd==='down'?DOWN_INTERVAL:SIDE_INTERVAL;
      let steps=0;
      while(state.untilRepeat<=0&&steps++<5&&playing){
        action(state.cmd);
        state.untilRepeat+=interval;
      }
    }
  }
  function readBest(){try{return Math.max(0,Number(localStorage.getItem('tetris-best'))||0);}catch{return 0;}}
  function writeBest(){try{localStorage.setItem('tetris-best',String(best));}catch{}}
  best=readBest();
  function randomPiece(){
    if(!bag.length){bag=Object.keys(BASE);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}}
    return bag.pop();
  }
  function populateQueue(){while(queue.length<5)queue.push(randomPiece());}
  function matrix(type){return BASE[type].map(r=>r.slice());}
  function createPiece(type){const m=matrix(type);return {type,matrix:m,x:Math.floor((W-m[0].length)/2),y:0};}
  function fits(m,x,y){return m.every((row,dy)=>row.every((filled,dx)=>!filled||(x+dx>=0&&x+dx<W&&y+dy<H&&(y+dy<0||!board[y+dy][x+dx]))));}
  function spawn(type){
    populateQueue();const chosen=type||queue.shift();populateQueue();
    active=createPiece(chosen);
    if(!fits(active.matrix,active.x,active.y)){finish();return false;}
    draw();return true;
  }
  function updateStats(){
    $('tt-score').textContent=score.toLocaleString(lang.value==='pt'?'pt-BR':lang.value);
    $('tt-best').textContent=best.toLocaleString(lang.value==='pt'?'pt-BR':lang.value);
    $('tt-lines').textContent=lines;$('tt-level').textContent=level;
  }
  function setScore(value){score=value;if(score>best){best=score;writeBest();}updateStats();}
  function drawCell(g,x,y,color,size,ghost=false){
    if(ghost){g.strokeStyle=color;g.globalAlpha=.52;g.lineWidth=2;g.strokeRect(x+2,y+2,size-4,size-4);g.globalAlpha=1;return;}
    g.fillStyle=color;g.fillRect(x+1,y+1,size-2,size-2);
    g.fillStyle='rgba(255,255,255,.33)';g.fillRect(x+2,y+2,size-4,Math.max(2,size*.12));
    g.fillStyle='rgba(0,0,0,.23)';g.fillRect(x+2,y+size-5,size-4,3);
    g.strokeStyle='rgba(255,255,255,.26)';g.lineWidth=1;g.strokeRect(x+1.5,y+1.5,size-3,size-3);
  }
  function draw(){
    ctx.fillStyle='#120e22';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='rgba(232,180,184,.095)';ctx.lineWidth=1;
    for(let r=0;r<H;r++)for(let c=0;c<W;c++){
      ctx.strokeRect(c*CELL+.5,r*CELL+.5,CELL,CELL);
      if(board[r]?.[c])drawCell(ctx,c*CELL,r*CELL,COLORS[board[r][c]],CELL);
    }
    if(active){
      let ghostY=active.y;while(fits(active.matrix,active.x,ghostY+1))ghostY++;
      active.matrix.forEach((row,dy)=>row.forEach((n,dx)=>{
        if(!n)return;
        const x=(active.x+dx)*CELL,y=(active.y+dy)*CELL;
        if(ghostY!==active.y&&ghostY+dy>=0)drawCell(ctx,x,(ghostY+dy)*CELL,COLORS[active.type],CELL,true);
        if(active.y+dy>=0)drawCell(ctx,x,y,COLORS[active.type],CELL);
      }));
    }
    drawPreview('tt-next',queue[0]);drawPreview('tt-hold',held);
  }
  function drawPreview(id,type){
    const cv=$(id),g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);
    if(!type)return;
    const m=matrix(type),size=Math.min(23,Math.floor(102/m[0].length),Math.floor(73/m.length));
    const offx=(cv.width-m[0].length*size)/2,offy=(cv.height-m.length*size)/2;
    m.forEach((row,r)=>row.forEach((filled,c)=>{if(filled)drawCell(g,offx+c*size,offy+r*size,COLORS[type],size);}));
  }
  function showOverlay(title,body,button){
    overlayTitle.textContent=title;overlayText.textContent=body;overlayButton.textContent=button;overlay.hidden=false;
  }
  function updateButtons(){
    pauseButton.textContent=!started?t('play'):gameOver?t('play'):playing?t('pause'):t('resume');
    holdButton.disabled=!playing||heldThisPiece;
    root.querySelectorAll('[data-tt-action]').forEach(b=>b.disabled=!playing);
  }
  function message(str){status.textContent=str;}
  function stopTick(){if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;lastFrame=0;}
  function pause(){if(!playing)return;playing=false;releaseAllInputs();stopTick();showOverlay(t('paused'),t('paused'),t('resume'));updateButtons();}
  function resume(){if(gameOver){startNew();return;}if(!started){startNew();return;}
    playing=true;overlay.hidden=true;fallElapsed=0;lastFrame=0;updateButtons();frameId=requestAnimationFrame(tick);message(t('go'));
  }
  function startNew(){
    releaseAllInputs();stopTick();board=Array.from({length:H},()=>Array(W).fill(null));bag=[];queue=[];populateQueue();
    active=null;held=null;heldThisPiece=false;started=true;playing=true;gameOver=false;
    score=0;lines=0;level=1;fallElapsed=0;lastFrame=0;updateStats();
    spawn();overlay.hidden=true;message(t('go'));updateButtons();draw();frameId=requestAnimationFrame(tick);
  }
  function finish(){
    playing=false;gameOver=true;releaseAllInputs();stopTick();updateButtons();
    showOverlay(t('over'),t('end')+': '+score.toLocaleString(),t('play'));message(t('over'));
  }
  function lock(){
    if(!active||!playing)return;
    for(let r=0;r<active.matrix.length;r++)for(let c=0;c<active.matrix[r].length;c++){
      if(!active.matrix[r][c])continue;
      const y=active.y+r,x=active.x+c;
      if(y<0){finish();return;}board[y][x]=active.type;
    }
    const remaining=board.filter(row=>!row.every(Boolean));const removed=H-remaining.length;
    while(remaining.length<H)remaining.unshift(Array(W).fill(null));board=remaining;
    if(removed){
      const prizes=[0,100,300,500,800];setScore(score+prizes[removed]*level);
      lines+=removed;level=1+Math.floor(lines/10);updateStats();message(t('clear')+': '+removed);
    }
    heldThisPiece=false;
    spawn();updateButtons();draw();
  }
  function descend(user=false){
    if(!playing||!active)return false;
    if(fits(active.matrix,active.x,active.y+1)){active.y++;if(user)setScore(score+1);draw();return true;}
    lock();return false;
  }
  function move(dx){if(!playing||!active)return;if(fits(active.matrix,active.x+dx,active.y)){active.x+=dx;draw();}}
  function turn(counter=false){
    if(!playing||!active)return;
    const old=active.matrix,newMatrix=counter?old[0].map((_,c)=>old.map(row=>row[old[0].length-1-c])):old[0].map((_,c)=>old.map(row=>row[c]).reverse());
    for(const [dx,dy] of [[0,0],[-1,0],[1,0],[-2,0],[2,0],[0,-1],[-1,-1],[1,-1]]){
      if(fits(newMatrix,active.x+dx,active.y+dy)){active.matrix=newMatrix;active.x+=dx;active.y+=dy;draw();return;}
    }
  }
  function drop(){if(!playing||!active)return;let dist=0;while(fits(active.matrix,active.x,active.y+1)){active.y++;dist++;}setScore(score+2*dist);lock();}
  function hold(){
    if(!playing||!active)return;
    if(heldThisPiece){message(t('holdUsed'));return;}
    const outgoing=active.type;
    if(!held){held=outgoing;spawn();}else{const incoming=held;held=outgoing;spawn(incoming);}
    heldThisPiece=true;updateButtons();draw();
  }
  function tick(now){
    if(!playing){frameId=null;return;}
    const dt=lastFrame?Math.min(now-lastFrame,150):0;lastFrame=now;fallElapsed+=dt;
    updateHeldInputs(dt);
    const period=Math.max(85,890*Math.pow(.82,level-1));
    if(fallElapsed>=period){fallElapsed%=period;descend();}
    if(playing)frameId=requestAnimationFrame(tick);
  }
  function action(cmd){if(!playing)return;
    switch(cmd){case 'left':move(-1);break;case 'right':move(1);break;case 'rotate':turn();break;case 'down':descend(true);break;case 'drop':drop();break;case 'hold':hold();break;}
  }
  function translate(){
    root.querySelectorAll('[data-tt-i18n]').forEach(e=>e.textContent=t(e.dataset.ttI18n));
    canvas.setAttribute('aria-label',t('board'));$('tt-next').setAttribute('aria-label',t('nextAlt'));$('tt-hold').setAttribute('aria-label',t('holdAlt'));
    for(const button of root.querySelectorAll('[data-tt-action]'))button.setAttribute('aria-label',t(button.dataset.ttAction));
    if(!started)showOverlay('Tetris',t('ready'),t('play'));
    else if(gameOver)showOverlay(t('over'),t('end')+': '+score,t('play'));
    else if(!playing)showOverlay(t('paused'),t('paused'),t('resume'));
    updateButtons();updateStats();
  }
  pauseButton.addEventListener('click',()=>playing?pause():resume());
  overlayButton.addEventListener('click',resume);
  $('tt-new').addEventListener('click',startNew);
  holdButton.addEventListener('click',hold);
  lang.addEventListener('change',translate);
  for(const btn of root.querySelectorAll('[data-tt-action]')){
    btn.addEventListener('pointerdown',e=>{
      if(btn.disabled||!playing||e.button!==0)return;
      e.preventDefault();
      // Keep receiving pointerup even if a finger slides off the small button.
      try{btn.setPointerCapture(e.pointerId);}catch{}
      pressInput('pointer:'+e.pointerId,btn.dataset.ttAction);
    });
    for(const event of ['pointerup','pointercancel','lostpointercapture']){
      btn.addEventListener(event,e=>releaseInput('pointer:'+e.pointerId));
    }
    // Keyboard activation of a focused control still performs one action.
    btn.addEventListener('click',e=>{if(e.detail===0)action(btn.dataset.ttAction);});
  }
  window.addEventListener('pointerup',e=>releaseInput('pointer:'+e.pointerId));
  window.addEventListener('pointercancel',e=>releaseInput('pointer:'+e.pointerId));
  const keyboardCommands={ArrowLeft:'left',ArrowRight:'right',ArrowDown:'down',ArrowUp:'rotate',KeyX:'rotate',Space:'drop',KeyC:'hold'};
  window.addEventListener('keydown',e=>{
    if(root.hidden||!root.isConnected)return;
    if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    const cmd=keyboardCommands[e.code];
    if(cmd){
      e.preventDefault();
      if(!e.repeat){
        if(REPEATABLE.has(cmd))pressInput('key:'+e.code,cmd);
        else action(cmd);
      }
    }
    else if(e.code==='KeyP'){e.preventDefault();if(!e.repeat)(playing?pause():resume());}
    else if(e.code==='Enter'&&!playing){e.preventDefault();if(!e.repeat)resume();}
    else if(e.code==='KeyZ'){e.preventDefault();if(!e.repeat)turn(true);}
  });
  window.addEventListener('keyup',e=>{
    if(keyboardCommands[e.code])releaseInput('key:'+e.code);
  });
  let swipe=null;
  canvas.addEventListener('pointerdown',e=>{if(e.button!==0||!playing)return;swipe={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointerup',e=>{
    if(!swipe||e.pointerId!==swipe.id)return;
    const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;
    if(Math.abs(dx)<15&&Math.abs(dy)<15)turn();
    else if(Math.abs(dx)>Math.abs(dy)){for(let i=0;i<Math.min(5,Math.max(1,Math.round(Math.abs(dx)/35)));i++)move(dx>0?1:-1);}
    else if(dy>75)drop();else if(dy>15)descend(true);else if(dy< -15)turn();
  });
  canvas.addEventListener('pointercancel',()=>{swipe=null;});
  const menu=$('game-menu-select');
  menu?.addEventListener('change',()=>{if(menu.value!=='tetris-section')pause();});
  window.addEventListener('hashchange',()=>{if(window.location.hash!=='#tetris-section')pause();});
  window.addEventListener('blur',()=>{releaseAllInputs();pause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){releaseAllInputs();pause();}});
  board=Array.from({length:H},()=>Array(W).fill(null));populateQueue();
  draw();translate();message(t('ready'));
})();
