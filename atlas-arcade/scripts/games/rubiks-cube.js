
/* RUBIK 3D: local cube-state engine, true layer rotations, no external dependencies. */
(() => {
  'use strict';
  const root=document.getElementById('rubiks-cube-section');
  if(!root)return;
  const $=id=>document.getElementById('rc-'+id);
  const menu=document.getElementById('game-menu-select');
  const languages=['pt','it','es','en','de','fr','nl','sv','no'];
  const words={
    eyebrow:['DESAFIO DE LÓGICA · 3D','SFIDA LOGICA · 3D','RETO DE LÓGICA · 3D','LOGIC CHALLENGE · 3D','LOGIKSPIEL · 3D','DÉFI LOGIQUE · 3D','LOGICAPUZZEL · 3D','LOGIKUTMANING · 3D','LOGIKKUTFORDRING · 3D'],
    title:['Cubo de Rubik 3D','Cubo di Rubik 3D','Cubo de Rubik 3D','3D Rubik’s Cube','3D-Zauberwürfel','Rubik’s Cube 3D','Rubiks kubus 3D','Rubiks kub 3D','Rubiks kube 3D'],
    intro:['Gire o cubo e suas faces, embaralhe as cores e tente resolver as seis faces.','Ruota il cubo e le facce, mescola i colori e prova a risolverlo.','Gira el cubo y sus caras, mezcla los colores e intenta resolverlo.','Rotate the cube and its faces, scramble the colors, and solve all six sides.','Drehe den Würfel und seine Seiten, mische die Farben und löse alle sechs Seiten.','Tournez le cube et ses faces, mélangez les couleurs et résolvez ses six faces.','Draai de kubus en zijn vlakken, hussel de kleuren en los alle zes vlakken op.','Vrid kuben och dess sidor, blanda färgerna och lös alla sex sidor.','Roter kuben og sidene, bland fargene og løs alle seks sidene.'],
    language:['Idioma','Lingua','Idioma','Language','Sprache','Langue','Taal','Språk','Språk'],
    sizeLabel:['Tamanho do cubo','Dimensione del cubo','Tamaño del cubo','Cube size','Würfelgröße','Taille du cube','Kubusgrootte','Kubstorlek','Kubestørrelse'],
    easy:['Fácil','Facile','Fácil','Easy','Einfach','Facile','Makkelijk','Lätt','Lett'],
    medium:['Médio','Medio','Medio','Medium','Mittel','Moyen','Gemiddeld','Medel','Middels'],
    hard:['Difícil','Difficile','Difícil','Hard','Schwer','Difficile','Moeilijk','Svår','Vanskelig'],
    innerTitle:['Camada interna (4×4)','Strato interno (4×4)','Capa interior (4×4)','Inner layer (4×4)','Innere Schicht (4×4)','Couche intérieure (4×4)','Binnenlaag (4×4)','Inre lager (4×4)','Indre lag (4×4)'],
    innerDesc:['Gire a segunda camada a partir da face indicada.','Ruota il secondo strato dalla faccia indicata.','Gira la segunda capa desde la cara indicada.','Turn the second layer in from each face.','Drehe die zweite Schicht von der gewählten Seite.','Tournez la deuxième couche à partir de la face choisie.','Draai de tweede laag vanaf de aangegeven zijde.','Vrid det andra lagret från vald sida.','Drei det andre laget fra den valgte siden.'],
    resized:['Tamanho alterado; cubo reiniciado.','Dimensione cambiata; cubo reimpostato.','Tamaño cambiado; cubo reiniciado.','Cube size changed; puzzle reset.','Größe geändert; Würfel zurückgesetzt.','Taille modifiée ; cube réinitialisé.','Grootte gewijzigd; kubus hersteld.','Storlek ändrad; kuben återställd.','Størrelse endret; kuben nullstilt.'],
    scramble:['Embaralhar','Mescola','Mezclar','Scramble','Mischen','Mélanger','Husselen','Blanda','Bland'],
    undo:['Desfazer','Annulla','Deshacer','Undo','Rückgängig','Annuler','Ongedaan maken','Ångra','Angre'],
    reset:['Reiniciar','Reimposta','Reiniciar','Reset','Zurücksetzen','Réinitialiser','Herstellen','Återställ','Nullstill'],
    moves:['Movimentos','Mosse','Movimientos','Moves','Züge','Mouvements','Zetten','Drag','Trekk'],
    solved:['Resolvido','Risolto','Resuelto','Solved','Gelöst','Résolu','Opgelost','Löst','Løst'],
    mixed:['Misturado','Mescolato','Mezclado','Scrambled','Gemischt','Mélangé','Gehusseld','Blandad','Blandet'],
    drag:['Arraste para girar a visão do cubo','Trascina per ruotare la visuale','Arrastra para girar la vista','Drag to orbit the cube','Ziehen, um den Würfel zu drehen','Glissez pour tourner la vue','Sleep om de kubus te draaien','Dra för att vrida vyn','Dra for å snu kuben'],
    turnFaces:['Girar as faces','Ruota le facce','Girar caras','Turn faces','Seiten drehen','Tourner les faces','Vlakken draaien','Vrid sidor','Drei sider'],
    up:['Cima (U)','Sopra (U)','Arriba (U)','Up (U)','Oben (U)','Haut (U)','Boven (U)','Upp (U)','Opp (U)'],
    down:['Baixo (D)','Sotto (D)','Abajo (D)','Down (D)','Unten (D)','Bas (D)','Onder (D)','Ned (D)','Ned (D)'],
    left:['Esquerda (L)','Sinistra (L)','Izquierda (L)','Left (L)','Links (L)','Gauche (L)','Links (L)','Vänster (L)','Venstre (L)'],
    right:['Direita (R)','Destra (R)','Derecha (R)','Right (R)','Rechts (R)','Droite (R)','Rechts (R)','Höger (R)','Høyre (R)'],
    front:['Frente (F)','Davanti (F)','Frente (F)','Front (F)','Vorne (F)','Avant (F)','Voor (F)','Fram (F)','Foran (F)'],
    back:['Trás (B)','Dietro (B)','Atrás (B)','Back (B)','Hinten (B)','Arrière (B)','Achter (B)','Bak (B)','Bak (B)'],
    view:['Mudar visão','Cambia visuale','Cambiar vista','Rotate view','Ansicht drehen','Changer de vue','Weergave draaien','Ändra vy','Endre visning'],
    zoom:['Zoom','Zoom','Zoom','Zoom','Zoom','Zoom','Zoom','Zoom','Zoom'],
    instructions:['Teclado: U, D, L, R, F, B. Segure Shift para inverter. Use as setas ou arraste para mudar a visão.','Tastiera: U, D, L, R, F, B. Maiusc inverte la mossa. Usa le frecce o trascina per cambiare visuale.','Teclado: U, D, L, R, F, B. Mayús invierte el giro. Usa las flechas o arrastra para cambiar la vista.','Keyboard: U, D, L, R, F, B. Hold Shift for reverse moves. Use arrow keys or drag to orbit.','Tastatur: U, D, L, R, F, B. Mit Umschalt rückwärts drehen. Pfeiltasten oder Ziehen ändern die Ansicht.','Clavier : U, D, L, R, F, B. Maj inverse le mouvement. Flèches ou glisser pour changer la vue.','Toetsen: U, D, L, R, F, B. Met Shift draai je terug. Gebruik pijltjes of sleep om te draaien.','Tangentbord: U, D, L, R, F, B. Håll Shift för omvänt drag. Pilknappar eller dra för att vrida vyn.','Tastatur: U, D, L, R, F, B. Hold Shift for motsatt trekk. Bruk piltaster eller dra for å endre visning.'],
    start:['Escolha uma face para começar.','Scegli una faccia per iniziare.','Elige una cara para empezar.','Choose a face to start.','Wähle eine Seite zum Starten.','Choisissez une face pour commencer.','Kies een vlak om te beginnen.','Välj en sida för att börja.','Velg en side for å begynne.'],
    shuffled:['Cubo embaralhado! Tente combinar as seis cores.','Cubo mescolato! Abbina tutti i colori.','¡Cubo mezclado! Intenta resolverlo.','Cube scrambled! Try to match all six faces.','Würfel gemischt! Löse alle sechs Seiten.','Cube mélangé ! Reconstituez les six faces.','Kubus gehusseld! Maak de zes vlakken weer gelijk.','Kuben är blandad! Lös de sex sidorna.','Kuben er blandet! Løs alle seks sidene.'],
    success:['Parabéns! As seis faces estão resolvidas.','Complimenti! Hai risolto tutte le facce.','¡Enhorabuena! Has resuelto las seis caras.','Well done! All six faces are solved.','Geschafft! Alle sechs Seiten sind gelöst.','Bravo ! Les six faces sont résolues.','Goed gedaan! Alle zes vlakken zijn opgelost.','Bra gjort! Alla sex sidor är lösta.','Bra jobbet! Alle seks sidene er løst.'],
    playing:['Continue girando as faces para resolver o cubo.','Continua a girare le facce per risolvere il cubo.','Sigue girando las caras para resolver el cubo.','Keep turning faces to solve the cube.','Drehe die Seiten weiter, um den Würfel zu lösen.','Continuez à tourner les faces pour résoudre le cube.','Blijf de vlakken draaien om de kubus op te lossen.','Fortsätt vrida sidorna för att lösa kuben.','Fortsett å dreie sidene for å løse kuben.'],
    resetDone:['Cubo reiniciado.','Cubo reimpostato.','Cubo reiniciado.','Cube reset.','Würfel zurückgesetzt.','Cube réinitialisé.','Kubus hersteld.','Kuben återställd.','Kuben er nullstilt.'],
    undone:['Último movimento desfeito.','Ultima mossa annullata.','Último giro deshecho.','Last move undone.','Letzter Zug rückgängig.','Dernier mouvement annulé.','Laatste zet ongedaan gemaakt.','Senaste draget ångrat.','Siste trekk angret.']
  };
  let lang='pt',statusCode='start',camX=-24,camY=-34,scale=1,pieces=[],history=[],moves=0,busy=false,generation=0,cubeSize=3;
  const normals={U:[0,-1,0],D:[0,1,0],L:[-1,0,0],R:[1,0,0],F:[0,0,1],B:[0,0,-1]};
  const colors={U:'#f3f4f7',D:'#f6d32e',L:'#ff952e',R:'#e74752',F:'#28af67',B:'#418de7'};
  const faces={U:['y',-1,-90],D:['y',1,90],L:['x',-1,-90],R:['x',1,90],F:['z',1,90],B:['z',-1,-90]};
  const I=()=>[[1,0,0],[0,1,0],[0,0,1]];
  const mul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((total,n,k)=>total+n*b[k][j],0)));
  const vec=(m,v)=>m.map(row=>row.reduce((sum,n,i)=>sum+n*v[i],0));
  function rot(axis,deg){const t=deg*Math.PI/180,c=Math.cos(t),s=Math.sin(t);
    if(axis==='x')return [[1,0,0],[0,c,-s],[0,s,c]];
    if(axis==='y')return [[c,0,s],[0,1,0],[-s,0,c]];
    return [[c,-s,0],[s,c,0],[0,0,1]];
  }
  const tidy=number=>Math.abs(number)<1e-9?0:Number(number.toFixed(7));
  function unit(){
    // Account for a larger diagonal silhouette on 4×4, even on narrow screens.
    const scene=$('scene');
    const width=scene.clientWidth||Math.max(260,window.innerWidth-36);
    const height=scene.clientHeight||355;
    const available=Math.min(width, height*1.12);
    return Math.max(29,Math.min(74,(available-40)/(cubeSize*1.42)));
  }
  function mat(pos,orient){const s=unit(),m=orient,p=pos.map(n=>n*s);
    return `matrix3d(${[m[0][0],m[1][0],m[2][0],0,m[0][1],m[1][1],m[2][1],0,m[0][2],m[1][2],m[2][2],0,...p,1].map(tidy).join(',')})`;
  }
  function translate(){const index=languages.indexOf(lang);const t=key=>words[key]?.[index]||words[key]?.[0]||key;
    root.querySelectorAll('[data-rc-t]').forEach(el=>{el.textContent=t(el.dataset.rcT);});
    $('moves').textContent=String(moves);$('state').textContent=t(solved()?'solved':'mixed');
    $('message').textContent=t(statusCode);$('message').classList.toggle('rc-success',statusCode==='success');
    $('undo').disabled=busy||history.length===0;
    $('size-value').textContent=`${cubeSize}×${cubeSize}×${cubeSize}`;
    $('size-difficulty').textContent=t(cubeSize===2?'easy':cubeSize===3?'medium':'hard');
    $('size').setAttribute('aria-valuetext',`${cubeSize}×${cubeSize}×${cubeSize} — ${t(cubeSize===2?'easy':cubeSize===3?'medium':'hard')}`);
    $('size').setAttribute('aria-label',t('sizeLabel'));
  }
  function solved(){return pieces.every(p=>Object.entries(p.stickers).every(([face,color])=>{
      const dir=vec(p.ori,normals[face]).map(Math.round);
      const faceNow=Object.keys(normals).find(k=>normals[k].every((v,i)=>v===dir[i]));
      return color===colors[faceNow];
    }));}
  function updateCamera(){ $('camera').style.transform=`rotateX(${camX}deg) rotateY(${camY}deg) scale(${scale})`; }
  function createPieces(){
    const model=$('model');model.replaceChildren();pieces=[];
    const edge=(cubeSize-1)/2;
    for(let xi=0;xi<cubeSize;xi++)for(let yi=0;yi<cubeSize;yi++)for(let zi=0;zi<cubeSize;zi++){
      const x=xi-edge,y=yi-edge,z=zi-edge;
      if(Math.abs(x)!==edge&&Math.abs(y)!==edge&&Math.abs(z)!==edge)continue;
      const pos=[x,y,z],stickers={};
      if(y===-edge)stickers.U=colors.U;if(y===edge)stickers.D=colors.D;
      if(x===-edge)stickers.L=colors.L;if(x===edge)stickers.R=colors.R;
      if(z===edge)stickers.F=colors.F;if(z===-edge)stickers.B=colors.B;
      const el=document.createElement('div');el.className='rc-piece';el.setAttribute('aria-hidden','true');
      for(const face of Object.keys(normals)){
        const panel=document.createElement('div');panel.className='rc-side';panel.dataset.side=face;
        if(stickers[face]){const sticker=document.createElement('span');sticker.className='rc-sticker';sticker.style.setProperty('--rc-color',stickers[face]);panel.appendChild(sticker);}
        el.appendChild(panel);
      }
      model.appendChild(el);pieces.push({pos,ori:I(),stickers,el});
    }
    paint();
  }
  function paint(){
    $('model').style.setProperty('--rc-unit',`${unit()}px`);
    for(const p of pieces)p.el.style.transform=mat(p.pos,p.ori);
  }
  function status(code){statusCode=code;translate();}
  function unlockAnimations(){for(const p of pieces)p.el.getAnimations().forEach(a=>a.cancel());busy=false;}
  function transformMove(p,axis,degrees){const R=rot(axis,degrees);return mat(vec(R,p.pos),mul(R,p.ori));}
  function turn(letter,prime=false,{record=true,animate=true,inner=false}={}){
    if(busy||!faces[letter]||(inner&&cubeSize<4))return false;
    const [axis,sign,cw]=faces[letter],layer=sign*((cubeSize-1)/2-(inner?1:0));
    const degree=cw*(prime?-1:1),coordinate={x:0,y:1,z:2}[axis];
    const active=pieces.filter(p=>p.pos[coordinate]===layer);
    let clips=[];
    if(animate&&typeof active[0]?.el.animate==='function'){
      busy=true;
      for(const p of active){
        const frames=Array.from({length:10},(_,i)=>({transform:transformMove(p,axis,degree*i/9)}));
        const animation=p.el.animate(frames,{duration:280,easing:'ease-in-out'});
        clips.push(animation.finished.catch(()=>{}));
      }
    }
    const R=rot(axis,degree);
    for(const p of active){p.pos=vec(R,p.pos).map(n=>Math.round(n*2)/2);p.ori=mul(R,p.ori).map(row=>row.map(Math.round));}
    paint();
    if(record){history.push({letter,prime,inner});moves++;}
    if(clips.length){
      const myGeneration=generation;
      Promise.all(clips).then(()=>{if(myGeneration!==generation)return;busy=false;status(solved()?'success':'playing');});
    }else if(animate){status(solved()?'success':'playing');}
    return true;
  }
  function scramble(){if(busy)return;generation++;unlockAnimations();let previous='';const all=Object.keys(faces);
    const count=cubeSize===2?16:cubeSize===3?27:48;
    for(let i=0;i<count;i++){
      const available=all.filter(f=>f!==previous),face=available[Math.floor(Math.random()*available.length)];
      turn(face,Math.random()<.5,{record:false,animate:false,inner:cubeSize===4&&Math.random()<.4});previous=face;
    }
    history=[];moves=0;status('shuffled');
  }
  function reset(){generation++;unlockAnimations();moves=0;history=[];createPieces();status('resetDone');}
  function undo(){if(busy||!history.length)return;const last=history.pop();moves=Math.max(0,moves-1);
    turn(last.letter,!last.prime,{record:false,inner:!!last.inner});
    // The finished-turn callback announces a solution if solved; otherwise retain the undo message.
    statusCode='undone';translate();
  }
  root.querySelectorAll('[data-rc-move]').forEach(button=>button.addEventListener('click',()=>{
    const move=button.dataset.rcMove;turn(move[0],move.endsWith("'"));
  }));
  root.querySelectorAll('[data-rc-inner-move]').forEach(button=>button.addEventListener('click',()=>{
    const move=button.dataset.rcInnerMove;turn(move[0],move.endsWith("'"),{inner:true});
  }));
  function changeSize(next){
    if(![2,3,4].includes(next)||next===cubeSize)return;
    cubeSize=next;
    $('inner-controls').hidden=cubeSize!==4;
    reset();status('resized');
  }
  $('size').addEventListener('input',()=>changeSize(Number($('size').value)));
  $('scramble').addEventListener('click',scramble);
  $('reset').addEventListener('click',reset);
  $('undo').addEventListener('click',undo);
  $('language').addEventListener('change',()=>{lang=$('language').value;translate();});
  $('zoom').addEventListener('input',()=>{scale=Number($('zoom').value)/100;updateCamera();});
  root.querySelectorAll('[data-rc-view]').forEach(button=>button.addEventListener('click',()=>{
    const direction=button.dataset.rcView;
    if(direction==='left')camY-=20;if(direction==='right')camY+=20;
    if(direction==='up')camX=Math.max(-89,camX-15);
    if(direction==='down')camX=Math.min(89,camX+15);
    updateCamera();
  }));
  const scene=$('scene');let pointer=null;
  scene.addEventListener('pointerdown',event=>{
    if(event.button!==0&&event.pointerType==='mouse')return;
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY};
    scene.setPointerCapture?.(event.pointerId);
  });
  scene.addEventListener('pointermove',event=>{
    if(!pointer||pointer.id!==event.pointerId)return;
    const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
    pointer.x=event.clientX;pointer.y=event.clientY;
    camY+=dx*.55;camX=Math.max(-89,Math.min(89,camX-dy*.55));updateCamera();
  });
  const endPointer=()=>{pointer=null;};
  scene.addEventListener('pointerup',endPointer);scene.addEventListener('pointercancel',endPointer);
  document.addEventListener('keydown',event=>{
    if(menu?.value!=='rubiks-cube-section'||root.hidden||document.hidden||event.altKey||event.ctrlKey||event.metaKey)return;
    const target=event.target;
    if(target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;
    const key=event.key.toUpperCase();
    if(faces[key]){event.preventDefault();turn(key,event.shiftKey);return;}
    if(['ARROWUP','ARROWDOWN','ARROWLEFT','ARROWRIGHT'].includes(key)){
      event.preventDefault();if(key==='ARROWLEFT')camY-=15;if(key==='ARROWRIGHT')camY+=15;
      if(key==='ARROWUP')camX=Math.max(-89,camX-15);if(key==='ARROWDOWN')camX=Math.min(89,camX+15);updateCamera();
    }
  });
  window.addEventListener('resize',paint,{passive:true});
  // ResizeObserver also repaints after the games dropdown reveals this section.
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{if(root.getClientRects().length)paint();}).observe($('scene'));
  menu?.addEventListener('change',()=>{if(menu.value==='rubiks-cube-section')requestAnimationFrame(paint);});
  lang=languages.includes(document.getElementById('sm-language')?.value)?document.getElementById('sm-language').value:'pt';
  $('language').value=lang;
  $('inner-controls').hidden=true;createPieces();updateCamera();translate();
})();
