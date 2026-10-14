
/* Original hill-driving arcade game, with procedurally generated terrain. */
(() => {
  'use strict';
  const root = document.getElementById('hill-climb-section');
  if (!root) return;
  const $ = id => document.getElementById(id);
  const canvas = $('hc-canvas');
  const ctx = canvas.getContext('2d');
  const langSelect = $('hc-language');
  const keys = new Set();
  const touches = new Map();
  const translations = {
    pt:{eyebrow:'CORRIDA DE COLINAS',title:'Hill Climb Racing',intro:'Dirija pelas colinas, recolha moedas e combustível e veja até onde consegue chegar.',language:'Idioma',distance:'Distância',speed:'Velocidade',coins:'Moedas',best:'Recorde',fuel:'Combustível',play:'Começar',resume:'Continuar',pause:'Pausar',restart:'Reiniciar',brake:'Travão',gas:'Acelerar',tiltBack:'Inclinar para trás',tiltFront:'Inclinar para a frente',tip:'Teclado: ←/A travar · →/D acelerar · ↑/W e ↓/S inclinar no ar · P pausar · R reiniciar.',ready:'Pronto para a corrida?',readyHelp:'Pressione Começar ou Acelerar.',paused:'Jogo pausado',over:'Fim de jogo',flipped:'O veículo capotou!',empty:'O combustível acabou!',again:'Reinicie para tentar novamente.',score:'Pontuação',record:'Novo recorde!',instructions:'Evite capotar. Recolha os depósitos de combustível para continuar.'},
    it:{eyebrow:'CORSA IN COLLINA',title:'Hill Climb Racing',intro:'Guida sulle colline, raccogli monete e carburante e scopri fin dove arrivi.',language:'Lingua',distance:'Distanza',speed:'Velocità',coins:'Monete',best:'Record',fuel:'Carburante',play:'Inizia',resume:'Riprendi',pause:'Pausa',restart:'Ricomincia',brake:'Freno',gas:'Accelera',tiltBack:'Inclina indietro',tiltFront:'Inclina avanti',tip:'Tastiera: ←/A frena · →/D accelera · ↑/W e ↓/S inclina in aria · P pausa · R ricomincia.',ready:'Pronto a guidare?',readyHelp:'Premi Inizia o Accelera.',paused:'In pausa',over:'Fine partita',flipped:'Il veicolo si è ribaltato!',empty:'Carburante esaurito!',again:'Ricomincia per riprovare.',score:'Punteggio',record:'Nuovo record!',instructions:'Evita di ribaltarti. Raccogli il carburante per continuare.'},
    es:{eyebrow:'CARRERA EN COLINAS',title:'Hill Climb Racing',intro:'Conduce por las colinas, recoge monedas y combustible y llega lo más lejos posible.',language:'Idioma',distance:'Distancia',speed:'Velocidad',coins:'Monedas',best:'Récord',fuel:'Combustible',play:'Empezar',resume:'Continuar',pause:'Pausar',restart:'Reiniciar',brake:'Frenar',gas:'Acelerar',tiltBack:'Inclinar atrás',tiltFront:'Inclinar adelante',tip:'Teclado: ←/A frenar · →/D acelerar · ↑/W y ↓/S inclinar en el aire · P pausa · R reiniciar.',ready:'¿Listo para conducir?',readyHelp:'Pulsa Empezar o Acelerar.',paused:'Juego pausado',over:'Fin de partida',flipped:'¡El vehículo volcó!',empty:'¡Sin combustible!',again:'Reinicia para volver a intentarlo.',score:'Puntuación',record:'¡Nuevo récord!',instructions:'Evita volcar. Recoge combustible para seguir conduciendo.'},
    en:{eyebrow:'HILL DRIVING CHALLENGE',title:'Hill Climb Racing',intro:'Drive over rolling hills, collect coins and fuel, and see how far you can go.',language:'Language',distance:'Distance',speed:'Speed',coins:'Coins',best:'Best',fuel:'Fuel',play:'Start',resume:'Resume',pause:'Pause',restart:'Restart',brake:'Brake',gas:'Gas',tiltBack:'Tilt back',tiltFront:'Tilt forward',tip:'Keyboard: ←/A brake · →/D accelerate · ↑/W and ↓/S tilt in air · P pause · R restart.',ready:'Ready to drive?',readyHelp:'Press Start or Gas.',paused:'Paused',over:'Game over',flipped:'The car flipped over!',empty:'Out of fuel!',again:'Restart to try again.',score:'Score',record:'New record!',instructions:'Avoid rolling over. Pick up fuel cans to keep going.'},
    de:{eyebrow:'BERGRENNEN',title:'Hill Climb Racing',intro:'Fahre über Hügel, sammle Münzen und Treibstoff und komme so weit wie möglich.',language:'Sprache',distance:'Strecke',speed:'Tempo',coins:'Münzen',best:'Rekord',fuel:'Treibstoff',play:'Start',resume:'Weiter',pause:'Pause',restart:'Neustart',brake:'Bremsen',gas:'Gas',tiltBack:'Nach hinten kippen',tiltFront:'Nach vorn kippen',tip:'Tastatur: ←/A bremsen · →/D Gas · ↑/W und ↓/S in der Luft kippen · P Pause · R Neustart.',ready:'Bereit zum Fahren?',readyHelp:'Drücke Start oder Gas.',paused:'Pausiert',over:'Spiel vorbei',flipped:'Das Auto ist umgekippt!',empty:'Kein Treibstoff mehr!',again:'Starte neu und versuche es noch einmal.',score:'Punkte',record:'Neuer Rekord!',instructions:'Vermeide Überschläge. Sammle Treibstoffkanister.'},
    fr:{eyebrow:'COURSE SUR COLLINES',title:'Hill Climb Racing',intro:'Parcourez les collines, ramassez des pièces et du carburant et allez le plus loin possible.',language:'Langue',distance:'Distance',speed:'Vitesse',coins:'Pièces',best:'Record',fuel:'Carburant',play:'Démarrer',resume:'Reprendre',pause:'Pause',restart:'Recommencer',brake:'Frein',gas:'Accélérer',tiltBack:'Pencher en arrière',tiltFront:'Pencher en avant',tip:'Clavier : ←/A freiner · →/D accélérer · ↑/W et ↓/S incliner en l’air · P pause · R recommencer.',ready:'Prêt à conduire ?',readyHelp:'Appuyez sur Démarrer ou Accélérer.',paused:'En pause',over:'Partie terminée',flipped:'La voiture s’est renversée !',empty:'Plus de carburant !',again:'Recommencez pour réessayer.',score:'Score',record:'Nouveau record !',instructions:'Évitez de vous retourner. Ramassez les bidons de carburant.'},
    nl:{eyebrow:'HEUVELRACE',title:'Hill Climb Racing',intro:'Rijd over heuvels, verzamel munten en brandstof en kom zo ver mogelijk.',language:'Taal',distance:'Afstand',speed:'Snelheid',coins:'Munten',best:'Record',fuel:'Brandstof',play:'Starten',resume:'Doorgaan',pause:'Pauze',restart:'Opnieuw',brake:'Rem',gas:'Gas',tiltBack:'Achterover kantelen',tiltFront:'Voorover kantelen',tip:'Toetsenbord: ←/A remmen · →/D gas · ↑/W en ↓/S in de lucht kantelen · P pauze · R opnieuw.',ready:'Klaar om te rijden?',readyHelp:'Druk op Starten of Gas.',paused:'Gepauzeerd',over:'Spel voorbij',flipped:'De auto is gekanteld!',empty:'Geen brandstof meer!',again:'Start opnieuw om het weer te proberen.',score:'Score',record:'Nieuw record!',instructions:'Voorkom omslaan. Verzamel brandstofblikken.'},
    sv:{eyebrow:'BACKRACING',title:'Hill Climb Racing',intro:'Kör över kullar, samla mynt och bränsle och se hur långt du kan komma.',language:'Språk',distance:'Sträcka',speed:'Hastighet',coins:'Mynt',best:'Rekord',fuel:'Bränsle',play:'Starta',resume:'Fortsätt',pause:'Pausa',restart:'Starta om',brake:'Bromsa',gas:'Gasa',tiltBack:'Luta bakåt',tiltFront:'Luta framåt',tip:'Tangentbord: ←/A bromsa · →/D gasa · ↑/W och ↓/S luta i luften · P pausa · R starta om.',ready:'Redo att köra?',readyHelp:'Tryck på Starta eller Gasa.',paused:'Pausat',over:'Spelet slut',flipped:'Bilen välte!',empty:'Bränslet är slut!',again:'Starta om för att försöka igen.',score:'Poäng',record:'Nytt rekord!',instructions:'Undvik att välta. Samla bränsledunkar för att fortsätta.'},
    no:{eyebrow:'BAKKELØP',title:'Hill Climb Racing',intro:'Kjør over bakker, samle mynter og drivstoff og se hvor langt du kommer.',language:'Språk',distance:'Avstand',speed:'Fart',coins:'Mynter',best:'Rekord',fuel:'Drivstoff',play:'Start',resume:'Fortsett',pause:'Pause',restart:'Start på nytt',brake:'Brems',gas:'Gass',tiltBack:'Vipp bakover',tiltFront:'Vipp fremover',tip:'Tastatur: ←/A brems · →/D gass · ↑/W og ↓/S vipp i luften · P pause · R start på nytt.',ready:'Klar til å kjøre?',readyHelp:'Trykk Start eller Gass.',paused:'Pauset',over:'Spillet er over',flipped:'Bilen veltet!',empty:'Tom for drivstoff!',again:'Start på nytt for å prøve igjen.',score:'Poeng',record:'Ny rekord!',instructions:'Unngå å velte. Samle drivstoffkanner underveis.'}
  };
  let locale='pt';
  const tr = key => (translations[locale] || translations.en)[key] || translations.en[key] || key;
  function translate(){
    locale=translations[langSelect.value]?langSelect.value:'pt';
    root.querySelectorAll('[data-hc-i18n]').forEach(el=>{el.textContent=tr(el.dataset.hcI18n);});
    root.querySelectorAll('[data-hc-label]').forEach(el=>{el.setAttribute('aria-label',tr(el.dataset.hcLabel));});
    $('hc-play').textContent=over?tr('restart'):playing?tr('pause'):started?tr('resume'):tr('play');
    updateOverlay(); updateStats();
  }
  // Infinite deterministic rolling terrain, smoothly flattened at the starting point.
  function terrain(x){
    const t=Math.max(0,x);
    const blend=Math.min(1,Math.max(0,(t-95)/230));
    const wave=46*Math.sin((t-95)/165)+29*Math.sin((t-95)/68)+11*Math.sin((t-95)/31)+38*Math.sin((t-95)/410);
    return 420+wave*blend;
  }
  const wheelbase=63, wheelR=15, chassisY=19;
  let car, cameraX=0, cameraY=0, width=0, height=0, ratio=1;
  let playing=false, started=false, over=false, endReason='', frameId=0, lastTime=0, accumulator=0, score=0, coins=0, fuel=100;
  let maxDistance=0, best=0, bestAtStart=0, overturnedTime=0, scoreSaved=false;
  let collected=new Set();
  try{best=Math.max(0,Number(localStorage.getItem('hill-climb-best-distance'))||0);}catch(e){}
  function random(n){const y=Math.sin(n*127.1+29.53)*43758.5453;return y-Math.floor(y);}
  function fuelPoint(i){const x=580+i*750+random(i+995)*120;return {x,y:terrain(x)-61,id:'f'+i,type:'fuel'};}
  function coinPoint(i){const x=235+i*93;return {x,y:terrain(x)-72-13*Math.sin(i*.85),id:'c'+i,type:'coin'};}
  function onScreen(){return $('game-menu-select')?.value==='hill-climb-section' && !root.hidden && !document.hidden;}
  function getControl(control){return keys.has(control) || Array.from(touches.values()).includes(control);}
  function reset(){
    car={x:76,y:terrain(76)-chassisY-wheelR,vx:0,vy:0,angle:0,angVel:0,ground:true};
    cameraX=0;cameraY=width?car.y-height*.53:0;playing=false;started=false;over=false;endReason='';accumulator=0;lastTime=0;score=0;coins=0;fuel=100;
    maxDistance=0;bestAtStart=best;overturnedTime=0;scoreSaved=false;collected.clear();keys.clear();touches.clear();setControls();
    if(frameId){cancelAnimationFrame(frameId);frameId=0;}
    updateStats();updateOverlay();render();
  }
  function playToggle(){
    if(over){reset();}
    playing=!playing;started=true;lastTime=0;accumulator=0;
    $('hc-play').textContent=playing?tr('pause'):tr('resume'); updateOverlay();
    if(playing) requestFrame(); else {if(frameId)cancelAnimationFrame(frameId);frameId=0;render();}
  }
  function startForGas(){if(!started&&!over){started=true;playing=true;updateOverlay();requestFrame();}}
  function endGame(reason){
    if(over)return; playing=false;over=true;endReason=reason;
    keys.clear();touches.clear();setControls();
    if(!scoreSaved){if(maxDistance>best){best=maxDistance;try{localStorage.setItem('hill-climb-best-distance',String(Math.floor(best)));}catch(e){}}scoreSaved=true;}
    updateStats();updateOverlay();render();
  }
  function updateStats(){
    if(!car)return;
    $('hc-distance').textContent=Math.floor(maxDistance)+' m';
    $('hc-speed').textContent=Math.round(Math.abs(car.vx)*.32)+' km/h';
    $('hc-coins').textContent=String(coins);
    $('hc-best').textContent=Math.floor(Math.max(best,maxDistance))+' m';
    $('hc-score').textContent=Math.floor(score).toLocaleString(locale);
    $('hc-fuel-text').textContent=Math.round(fuel)+'%';
    $('hc-fuel-bar').style.width=Math.max(0,Math.min(100,fuel))+'%';
    $('hc-fuel-bar').classList.toggle('hc-low',fuel<=25);
  }
  function updateOverlay(){
    const overlay=$('hc-overlay');
    if(!car)return;
    overlay.hidden=playing;
    $('hc-overlay-title').textContent=over?tr('over'):started?tr('paused'):tr('ready');
    $('hc-overlay-desc').textContent=over?(tr(endReason)+(maxDistance>bestAtStart+1? ' '+tr('record') : '')+' '+tr('again')):started?tr('instructions'):tr('readyHelp');
    $('hc-play').textContent=over?tr('restart'):playing?tr('pause'):started?tr('resume'):tr('play');
  }
  function tick(dt){
    if(!playing||over)return;
    const gas=getControl('gas') && fuel>0, brake=getControl('brake');
    const front=terrain(car.x+wheelbase/2),back=terrain(car.x-wheelbase/2);
    const slope=Math.atan2(front-back,wheelbase);
    const floor=(front+back)/2-chassisY-wheelR;
    let supported=car.y>=floor-5 && car.vy>=-135;
    // Horizontal traction, rolling resistance and gravity on slopes.
    let ax=-Math.sin(slope)*250 - car.vx*(supported?.62:.08);
    if(supported){if(gas)ax+=360*Math.cos(slope);if(brake)ax-=340*Math.cos(slope);}
    else{if(gas)ax+=75;if(brake)ax-=65;}
    car.vx=Math.max(-145,Math.min(470,car.vx+ax*dt));
    if(!gas&&!brake&&supported&&Math.abs(car.vx)<2)car.vx=0;
    car.x=Math.max(55,car.x+car.vx*dt);
    car.vy+=790*dt;
    car.y+=car.vy*dt;
    const newBack=terrain(car.x-wheelbase/2),newFront=terrain(car.x+wheelbase/2);
    const newFloor=(newBack+newFront)/2-chassisY-wheelR;
    if(car.y>=newFloor){
      const impact=car.vy;
      car.y=newFloor;
      const followSlope=Math.atan2(newFront-newBack,wheelbase);
      const targetV=(newFront-newBack)/wheelbase*car.vx;
      if(impact-targetV>150){car.vy=targetV-Math.min(100,(impact-targetV)*.16);car.ground=false;}
      else {car.vy=targetV;car.ground=true;}
      const diff=((followSlope-car.angle+Math.PI*3)%(2*Math.PI))-Math.PI;
      car.angVel+=(diff*36-car.angVel*9)*dt;
    }else{car.ground=false;car.angVel*=Math.max(0,1-1.5*dt);}
    const tiltBack=getControl('tiltBack') || (gas&&!car.ground);
    const tiltFront=getControl('tiltFront') || (brake&&!car.ground);
    if(!car.ground){if(tiltBack)car.angVel-=3.3*dt;if(tiltFront)car.angVel+=3.3*dt;}
    car.angle+=car.angVel*dt;
    // A roll-over on contact is game over, but spinning during jumps is allowed.
    const angle=Math.atan2(Math.sin(car.angle),Math.cos(car.angle));
    if(Math.abs(angle)>Math.PI*.62 && car.y>terrain(car.x)-76)overturnedTime+=dt;
    else overturnedTime=Math.max(0,overturnedTime-dt*3);
    if(overturnedTime>.85){endGame('flipped');return;}
    fuel=Math.max(0,fuel-dt*(gas?1.58:.27));
    if(fuel<=0){endGame('empty');return;}
    maxDistance=Math.max(maxDistance,(car.x-76)/10);
    for(let i=Math.max(0,Math.floor((car.x-600)/750)-1);i<=Math.floor((car.x+125)/750)+1;i++){
      const item=fuelPoint(i);if(!collected.has(item.id)&&Math.hypot(car.x-item.x,car.y-item.y)<54){collected.add(item.id);fuel=Math.min(100,fuel+52);}
    }
    for(let i=Math.max(0,Math.floor((car.x-300)/93)-1);i<=Math.floor((car.x+110)/93)+1;i++){
      const item=coinPoint(i);if(!collected.has(item.id)&&Math.hypot(car.x-item.x,car.y-item.y)<46){collected.add(item.id);coins++;}
    }
    score=Math.floor(maxDistance*4+coins*50);
    if(maxDistance>best){best=maxDistance;}
  }
  function resize(){
    const rect=canvas.getBoundingClientRect();
    width=Math.max(1,rect.width);height=Math.max(1,rect.height);ratio=Math.min(2,window.devicePixelRatio||1);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    if(!started){cameraX=Math.max(0,car.x-width*.27);cameraY=car.y-height*.53;}
    ctx.setTransform(ratio,0,0,ratio,0,0);render();
  }
  function drawRoundedRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  function drawCoin(x,y){
    ctx.save();ctx.translate(x,y);ctx.fillStyle='#e1a61c';ctx.strokeStyle='#fff3ad';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(0,0,12,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.strokeStyle='#fef08a';ctx.stroke();ctx.fillStyle='#ffef9f';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('$',0,1);ctx.restore();
  }
  function drawFuel(x,y){
    ctx.save();ctx.translate(x,y);ctx.shadowColor='#ff4040';ctx.shadowBlur=12;
    ctx.fillStyle='#ef4444';drawRoundedRect(-13,-18,26,34,4);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#ffc7c7';ctx.fillRect(-7,-22,12,4);
    ctx.fillStyle='#fff7ed';ctx.font='bold 17px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('F',0,1);ctx.restore();
  }
  const hcOriginal={sky1:'#081c3f',sky2:'#3973a5',sky3:'#cddce4',sun:'#f9e7b0',hillfar1:'#7297ac',hillfar2:'#547989',terrain1:'#608340',terrain2:'#3e6033',terrain3:'#172e28',grass:'#bbd78c',vehicle:'#df3e56',vehicleEdge:'#731c36',glass:'#bce1f8'};
  let hcVisual={...hcOriginal};
  window.addEventListener('tp:game-theme-change',e=>{
    if(e.detail?.id!=='hill-climb-section')return;
    const active=e.detail.theme!=='original',styles=getComputedStyle(root);
    hcVisual={...hcOriginal};
    if(active)for(const prop of ['sky1','sky2','sky3','hillfar1','hillfar2','terrain1','terrain2','terrain3','vehicle']){
      hcVisual[prop]=styles.getPropertyValue('--gg-'+prop).trim()||hcOriginal[prop];
    }
    if(active){hcVisual.vehicleEdge=styles.getPropertyValue('--gg-vehicle-edge').trim()||hcOriginal.vehicleEdge;hcVisual.grass=styles.getPropertyValue('--gg-secondary').trim()||hcOriginal.grass;hcVisual.sun=styles.getPropertyValue('--gg-active').trim()||hcOriginal.sun;hcVisual.glass=styles.getPropertyValue('--gg-primary').trim()||hcOriginal.glass;}
    if(!playing)render();
  });
  function drawBackground(){
    const sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,hcVisual.sky1);sky.addColorStop(.55,hcVisual.sky2);sky.addColorStop(1,hcVisual.sky3);ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
    ctx.fillStyle=hcVisual.sun;ctx.shadowColor='#fff5d2';ctx.shadowBlur=26;ctx.beginPath();ctx.arc(width*.79-cameraX*.016%70,height*.17,27,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    const cloud=(x,y,s)=>{ctx.fillStyle='rgba(255,255,255,.73)';ctx.beginPath();ctx.ellipse(x,y,41*s,13*s,0,0,Math.PI*2);ctx.ellipse(x-20*s,y-8*s,24*s,16*s,0,0,Math.PI*2);ctx.ellipse(x+14*s,y-13*s,30*s,20*s,0,0,Math.PI*2);ctx.fill();};
    for(let i=-1;i<6;i++){const x=(i*260+80-cameraX*.15)%(width+450);cloud((x+width+450)%(width+450)-120,65+(i%3)*38,.7+(i%2)*.25);}
    for(const [color,offset,scale,amp] of [[hcVisual.hillfar1,height*.79,.19,45],[hcVisual.hillfar2,height*.85,.3,37]]){
      ctx.beginPath();ctx.moveTo(0,height);for(let px=0;px<=width+8;px+=8){const tx=px+cameraX*scale;ctx.lineTo(px,offset+Math.sin(tx/140)*amp+Math.sin(tx/52)*amp*.35);}ctx.lineTo(width,height);ctx.closePath();ctx.fillStyle=color;ctx.fill();
    }
  }
  function drawGround(){
    ctx.beginPath();ctx.moveTo(-20,height+20);
    for(let sx=-20;sx<=width+20;sx+=5){let xx=sx+cameraX;ctx.lineTo(sx,terrain(xx)-cameraY);}
    ctx.lineTo(width+20,height+20);ctx.closePath();
    const grd=ctx.createLinearGradient(0,height*.4,0,height);grd.addColorStop(0,hcVisual.terrain1);grd.addColorStop(.3,hcVisual.terrain2);grd.addColorStop(1,hcVisual.terrain3);ctx.fillStyle=grd;ctx.fill();
    ctx.beginPath();for(let sx=-20;sx<=width+20;sx+=5)ctx.lineTo(sx,terrain(sx+cameraX)-cameraY);
    ctx.strokeStyle=hcVisual.grass;ctx.lineWidth=5;ctx.stroke();
    ctx.strokeStyle='rgba(10,35,17,.4)';ctx.lineWidth=2;ctx.beginPath();for(let sx=-20;sx<=width+20;sx+=18){let y=terrain(sx+cameraX)-cameraY+12;ctx.moveTo(sx,y);ctx.lineTo(sx-3,y+4);}ctx.stroke();
  }
  function drawCar(){
    const x=car.x-cameraX,y=car.y-cameraY;
    ctx.save();ctx.translate(x,y);ctx.rotate(car.angle);
    ctx.fillStyle='rgba(12,21,29,.42)';ctx.beginPath();ctx.ellipse(0,35,48,10,0,0,Math.PI*2);ctx.fill();
    for(const wheelX of [-wheelbase/2,wheelbase/2]){
      ctx.fillStyle='#15202d';ctx.beginPath();ctx.arc(wheelX,16,wheelR,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#020617';ctx.lineWidth=5;ctx.stroke();
      ctx.fillStyle='#aab8c9';ctx.beginPath();ctx.arc(wheelX,16,7,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#526a7a';ctx.lineWidth=2;ctx.stroke();
    }
    ctx.fillStyle=hcVisual.vehicle;ctx.strokeStyle=hcVisual.vehicleEdge;ctx.lineWidth=2.8;
    ctx.beginPath();ctx.moveTo(-44,9);ctx.lineTo(-41,-7);ctx.quadraticCurveTo(-39,-16,-24,-17);ctx.lineTo(-12,-33);ctx.quadraticCurveTo(-4,-40,14,-36);ctx.lineTo(26,-16);ctx.lineTo(39,-12);ctx.lineTo(44,8);ctx.quadraticCurveTo(0,16,-44,9);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle=hcVisual.glass;ctx.beginPath();ctx.moveTo(-15,-17);ctx.lineTo(-7,-30);ctx.lineTo(9,-30);ctx.lineTo(17,-17);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ffc35e';ctx.fillRect(37,-4,7,5);ctx.fillStyle='#f8d0d7';ctx.fillRect(-44,-4,7,5);
    ctx.restore();
  }
  function render(){
    if(!width||!height||!car)return;
    ctx.setTransform(ratio,0,0,ratio,0,0);
    cameraX+=(Math.max(0,car.x-width*.27)-cameraX)*.13;
    const desiredY=car.y-height*.53;
    cameraY+=(desiredY-cameraY)*.085;
    ctx.clearRect(0,0,width,height);drawBackground();drawGround();
    const start=Math.max(0,Math.floor((cameraX-350)/93));const end=Math.ceil((cameraX+width+350)/93);
    for(let i=start;i<=end;i++){const item=coinPoint(i);if(!collected.has(item.id)){drawCoin(item.x-cameraX,item.y-cameraY);}}
    const fstart=Math.max(0,Math.floor((cameraX-1000)/750));const fend=Math.ceil((cameraX+width+1000)/750);
    for(let i=fstart;i<=fend;i++){const item=fuelPoint(i);if(!collected.has(item.id))drawFuel(item.x-cameraX,item.y-cameraY);}
    drawCar();
  }
  function requestFrame(){if(!frameId&&playing&&onScreen())frameId=requestAnimationFrame(frame);}
  function frame(now){
    frameId=0;if(!playing||!onScreen())return;
    if(lastTime){accumulator+=Math.min(.05,(now-lastTime)/1000);let n=0;while(accumulator>=1/120&&n++<7){tick(1/120);accumulator-=1/120;if(!playing)break;}}
    lastTime=now;updateStats();render();requestFrame();
  }
  function setControls(){
    root.querySelectorAll('[data-hc-control]').forEach(btn=>btn.setAttribute('aria-pressed',String(getControl(btn.dataset.hcControl))));
  }
  root.querySelectorAll('[data-hc-control]').forEach(button=>{
    const control=button.dataset.hcControl;
    button.addEventListener('pointerdown',e=>{
      e.preventDefault();if(over)return;
      try{button.setPointerCapture(e.pointerId);}catch(_){}
      touches.set(e.pointerId,control);if(control==='gas')startForGas();setControls();
    });
    const release=e=>{touches.delete(e.pointerId);setControls();};
    button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);
    button.addEventListener('lostpointercapture',release);
    button.addEventListener('contextmenu',e=>e.preventDefault());
  });
  window.addEventListener('keydown',e=>{
    if(!onScreen()||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;
    const key=e.key.toLowerCase();
    const control=({'arrowright':'gas','d':'gas','arrowleft':'brake','a':'brake','arrowup':'tiltBack','w':'tiltBack','arrowdown':'tiltFront','s':'tiltFront'})[key];
    if(control){e.preventDefault();keys.add(control);if(control==='gas')startForGas();setControls();}
    if(!e.repeat&&key==='p'){e.preventDefault();playToggle();}
    if(!e.repeat&&key==='r'){e.preventDefault();reset();}
  });
  window.addEventListener('keyup',e=>{
    const control=({'arrowright':'gas','d':'gas','arrowleft':'brake','a':'brake','arrowup':'tiltBack','w':'tiltBack','arrowdown':'tiltFront','s':'tiltFront'})[e.key.toLowerCase()];
    if(control){keys.delete(control);setControls();}
  });
  window.addEventListener('blur',()=>{keys.clear();touches.clear();setControls();});
  $('hc-play').addEventListener('click',playToggle);
  $('hc-reset').addEventListener('click',reset);
  langSelect.addEventListener('change',translate);
  const menu=$('game-menu-select');
  menu?.addEventListener('change',()=>{
    keys.clear();touches.clear();setControls();
    if(onScreen()){setTimeout(()=>{resize();if(playing)requestFrame();},0);}
    else if(frameId){cancelAnimationFrame(frameId);frameId=0;lastTime=0;}
  });
  window.addEventListener('hashchange',()=>{if(onScreen()){resize();requestFrame();}});
  window.addEventListener('resize',()=>{if(onScreen())resize();});
  document.addEventListener('visibilitychange',()=>{if(!onScreen()){if(frameId)cancelAnimationFrame(frameId);frameId=0;lastTime=0;keys.clear();touches.clear();}else{resize();requestFrame();}});
  const ro=window.ResizeObserver?new ResizeObserver(()=>{if(onScreen())resize();}):null;ro?.observe(canvas);
  reset();translate();
  if(onScreen())resize();
})();

