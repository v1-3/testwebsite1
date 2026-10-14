
(()=>{
'use strict';
const root=document.getElementById('pinball-3d-section');
if(!root||root.dataset.pbnReady)return;
root.dataset.pbnReady='true';
const $=name=>document.getElementById('pb-'+name),canvas=$('canvas'),ctx=canvas.getContext('2d'),menu=document.getElementById('game-menu-select');
if(!ctx){$('status').textContent='Canvas is unavailable in this browser.';return;}
const W=480,H=800,R=9,STEP=1/120,MAX_SPEED=1450;
const FLIPPER={left:125,right:345,y:689,length:91,radius:11},EXIT_GATE=[414,194,448,164,3];
const keys='subtitle theme sound pause resume newgame score balls best power left launch right space keyboard mission missiontitle missioncopy how tip1 tip2 tip3 tip4 note ready charging rolling lost over paused pausereason continue finalscore'.split(' ');
const textRows={
pt:['Uma bola, três chances. Faça cada rebote valer.','Mesa','Som','Pausar','Continuar','Novo jogo','PONTOS','BOLAS','RECORDE','FORÇA','ESQUERDA','SEGURE · SOLTE','DIREITA','ESPAÇO','A / ← e D / →: rebatedores · Segure e solte Espaço: lançar · P: pausa.','SEQUÊNCIA ESTELAR','Acenda as quatro estrelas.','Complete a sequência para ganhar 2.000 pontos e aumentar o multiplicador.','Como jogar','Segure o lançador e solte para pôr a bola em jogo.','Use os dois rebatedores para devolver a bola à mesa.','Para-choques valem 75 pontos; estrelas valem 125. O multiplicador aumenta os pontos.','São três bolas. O jogo pausa quando você sai desta página.','Mire alto. Encontre o ritmo. Tente mais uma vez.','Segure e solte para lançar.','Solte para lançar!','Bola em jogo. Mantenha o ritmo!','Bola perdida. Lance a próxima.','Fim de jogo','Pausado','O jogo está esperando por você.','Continuar','Pontuação final'],
en:['One ball, three chances. Make every bounce count.','Table','Sound','Pause','Resume','New game','SCORE','BALLS','BEST','POWER','LEFT','HOLD · RELEASE','RIGHT','SPACE','A / ← and D / →: flippers · Hold and release Space: launch · P: pause.','STAR SEQUENCE','Light all four stars.','Complete the sequence for 2,000 points and a higher multiplier.','How to play','Hold the launcher, then release to put the ball in play.','Use both flippers to return the ball to the table.','Bumpers score 75; stars score 125. The multiplier increases points.','You have three balls. The game pauses when you leave this page.','Aim high. Find the rhythm. Try one more time.','Hold and release to launch.','Release to launch!','Ball in play. Keep the rhythm!','Ball lost. Launch the next one.','Game over','Paused','The game is waiting for you.','Resume','Final score'],
es:['Una bola, tres oportunidades. Haz que cada rebote cuente.','Mesa','Sonido','Pausar','Continuar','Nueva partida','PUNTOS','BOLAS','RÉCORD','FUERZA','IZQUIERDA','MANTÉN · SUELTA','DERECHA','ESPACIO','A / ← y D / →: paletas · Mantén y suelta Espacio: lanzar · P: pausa.','SECUENCIA ESTELAR','Enciende las cuatro estrellas.','Completa la secuencia para ganar 2.000 puntos y aumentar el multiplicador.','Cómo jugar','Mantén el lanzador y suelta para poner la bola en juego.','Usa ambas paletas para devolver la bola a la mesa.','Los parachoques valen 75 puntos; las estrellas, 125. El multiplicador aumenta los puntos.','Tienes tres bolas. El juego se pausa al salir de esta página.','Apunta alto. Encuentra el ritmo. Inténtalo otra vez.','Mantén y suelta para lanzar.','¡Suelta para lanzar!','Bola en juego. ¡Mantén el ritmo!','Bola perdida. Lanza la siguiente.','Fin de la partida','En pausa','El juego te está esperando.','Continuar','Puntuación final'],
it:['Una pallina, tre possibilità. Fai valere ogni rimbalzo.','Tavolo','Audio','Pausa','Continua','Nuova partita','PUNTI','PALLINE','RECORD','FORZA','SINISTRA','TIENI · RILASCIA','DESTRA','SPAZIO','A / ← e D / →: palette · Tieni e rilascia Spazio: lancio · P: pausa.','SEQUENZA STELLARE','Accendi tutte e quattro le stelle.','Completa la sequenza per 2.000 punti e un moltiplicatore più alto.','Come giocare','Tieni il lanciatore, poi rilascia per lanciare la pallina.','Usa entrambe le palette per rimandare la pallina sul tavolo.','I paraurti valgono 75 punti; le stelle, 125. Il moltiplicatore aumenta i punti.','Hai tre palline. Il gioco va in pausa quando esci da questa pagina.','Mira in alto. Trova il ritmo. Prova ancora.','Tieni e rilascia per lanciare.','Rilascia per lanciare!','Pallina in gioco. Mantieni il ritmo!','Pallina persa. Lancia la prossima.','Partita finita','In pausa','Il gioco ti sta aspettando.','Continua','Punteggio finale'],
de:['Ein Ball, drei Chancen. Jeder Abpraller zählt.','Tisch','Ton','Pause','Weiter','Neues Spiel','PUNKTE','BÄLLE','REKORD','KRAFT','LINKS','HALTEN · LOSLASSEN','RECHTS','LEERTASTE','A / ← und D / →: Flipper · Leertaste halten und loslassen: Start · P: Pause.','STERNENFOLGE','Lass alle vier Sterne leuchten.','Vervollständige die Folge für 2.000 Punkte und einen höheren Multiplikator.','So spielst du','Halte den Starter und lass los, um den Ball zu starten.','Nutze beide Flipper, um den Ball auf den Tisch zurückzuspielen.','Bumper bringen 75 Punkte; Sterne 125. Der Multiplikator erhöht die Punkte.','Du hast drei Bälle. Beim Verlassen dieser Seite pausiert das Spiel.','Ziele hoch. Finde den Rhythmus. Versuch es noch einmal.','Halten und loslassen zum Starten.','Loslassen zum Starten!','Ball im Spiel. Bleib im Rhythmus!','Ball verloren. Starte den nächsten.','Spiel beendet','Pausiert','Das Spiel wartet auf dich.','Weiter','Endpunktzahl'],
fr:['Une bille, trois chances. Chaque rebond compte.','Table','Son','Pause','Reprendre','Nouvelle partie','SCORE','BILLES','RECORD','FORCE','GAUCHE','MAINTENIR · RELÂCHER','DROITE','ESPACE','A / ← et D / → : batteurs · Maintenez puis relâchez Espace : lancer · P : pause.','SÉQUENCE STELLAIRE','Allumez les quatre étoiles.','Complétez la séquence pour 2 000 points et un multiplicateur plus élevé.','Comment jouer','Maintenez le lanceur puis relâchez pour lancer la bille.','Utilisez les deux batteurs pour renvoyer la bille sur la table.','Les bumpers rapportent 75 points, les étoiles 125. Le multiplicateur augmente les points.','Vous avez trois billes. Le jeu se met en pause quand vous quittez cette page.','Visez haut. Trouvez le rythme. Essayez encore.','Maintenez puis relâchez pour lancer.','Relâchez pour lancer !','Bille en jeu. Gardez le rythme !','Bille perdue. Lancez la suivante.','Partie terminée','En pause','Le jeu vous attend.','Reprendre','Score final'],
nl:['Eén bal, drie kansen. Laat elke stuiter tellen.','Tafel','Geluid','Pauze','Doorgaan','Nieuw spel','SCORE','BALLEN','RECORD','KRACHT','LINKS','HOUD · LAAT LOS','RECHTS','SPATIE','A / ← en D / →: flippers · Houd Spatie vast en laat los: start · P: pauze.','STERRENREEKS','Laat alle vier sterren oplichten.','Voltooi de reeks voor 2.000 punten en een hogere vermenigvuldiger.','Zo speel je','Houd de lanceerder vast en laat los om de bal te starten.','Gebruik beide flippers om de bal terug de tafel op te slaan.','Bumpers geven 75 punten; sterren 125. De vermenigvuldiger verhoogt de punten.','Je hebt drie ballen. Het spel pauzeert als je deze pagina verlaat.','Mik hoog. Vind het ritme. Probeer nog eens.','Houd vast en laat los om te starten.','Laat los om te starten!','Bal in het spel. Houd het ritme vast!','Bal verloren. Start de volgende.','Spel afgelopen','Gepauzeerd','Het spel wacht op je.','Doorgaan','Eindscore'],
sv:['En boll, tre chanser. Låt varje studs räknas.','Bord','Ljud','Pausa','Fortsätt','Nytt spel','POÄNG','BOLLAR','REKORD','KRAFT','VÄNSTER','HÅLL · SLÄPP','HÖGER','MELLANSLAG','A / ← och D / →: flipperarmar · Håll och släpp Mellanslag: skjut · P: paus.','STJÄRNSEKVENS','Tänd alla fyra stjärnor.','Slutför sekvensen för 2 000 poäng och en högre multiplikator.','Så spelar du','Håll in avfyraren och släpp för att skjuta bollen.','Använd båda flipperarmarna för att slå tillbaka bollen.','Stötfångare ger 75 poäng; stjärnor 125. Multiplikatorn ökar poängen.','Du har tre bollar. Spelet pausas när du lämnar den här sidan.','Sikta högt. Hitta rytmen. Försök igen.','Håll och släpp för att skjuta.','Släpp för att skjuta!','Bollen är i spel. Håll rytmen!','Bollen förlorad. Skjut nästa.','Spelet slut','Pausat','Spelet väntar på dig.','Fortsätt','Slutpoäng'],
no:['Én ball, tre sjanser. La hver sprett telle.','Bord','Lyd','Pause','Fortsett','Nytt spill','POENG','BALLER','REKORD','KRAFT','VENSTRE','HOLD · SLIPP','HØYRE','MELLOMROM','A / ← og D / →: flipperarmer · Hold og slipp Mellomrom: skyt · P: pause.','STJERNESEKVENS','Tenn alle fire stjernene.','Fullfør sekvensen for 2 000 poeng og en høyere multiplikator.','Slik spiller du','Hold avfyreren og slipp for å skyte ballen.','Bruk begge flipperarmene for å slå ballen tilbake på bordet.','Støtfangere gir 75 poeng; stjerner gir 125. Multiplikatoren øker poengene.','Du har tre baller. Spillet pauses når du forlater denne siden.','Sikt høyt. Finn rytmen. Prøv igjen.','Hold og slipp for å skyte.','Slipp for å skyte!','Ballen er i spill. Hold rytmen!','Ball mistet. Skyt neste.','Spillet er over','Pauset','Spillet venter på deg.','Fortsett','Sluttpoeng']
};
const themeNames={pt:['Clássico','Oceano','Floresta','Vulcão','Espaço','Neon'],en:['Classic','Ocean','Forest','Volcano','Space','Neon'],es:['Clásico','Océano','Bosque','Volcán','Espacio','Neón'],it:['Classico','Oceano','Foresta','Vulcano','Spazio','Neon'],de:['Klassisch','Ozean','Wald','Vulkan','Weltraum','Neon'],fr:['Classique','Océan','Forêt','Volcan','Espace','Néon'],nl:['Klassiek','Oceaan','Bos','Vulkaan','Ruimte','Neon'],sv:['Klassiskt','Hav','Skog','Vulkan','Rymd','Neon'],no:['Klassisk','Hav','Skog','Vulkan','Rom','Neon']};
let lang='pt',words={},theme='space';
const palettes={classic:{base:'#26352e',deep:'#102721',accent:'#e7b75e',hot:'#f6dfa0',ink:'#e6ecd6',rubber:'#a74436'},ocean:{base:'#123d4e',deep:'#082733',accent:'#64c8c6',hot:'#eee0a0',ink:'#def2ed',rubber:'#da8161'},forest:{base:'#284336',deep:'#152a22',accent:'#97c786',hot:'#ead89c',ink:'#ecedde',rubber:'#bb6b56'},volcano:{base:'#4d282c',deep:'#281b25',accent:'#ee9773',hot:'#f6d387',ink:'#f9e5d3',rubber:'#af483c'},space:{base:'#253647',deep:'#12262f',accent:'#80cbb7',hot:'#ead5a0',ink:'#e7ecdb',rubber:'#d67b69'},cyber:{base:'#362c48',deep:'#211d32',accent:'#b8a0e1',hot:'#d9dda2',ink:'#f0e7ef',rubber:'#7daea9'}};
let best=0;try{best=Math.max(0,Number(localStorage.getItem('pj-pinball-best-v1'))||0)}catch(_){}
let score=0,lives=3,multiplier=1,phase='ready',paused=false,charge=0,ball=null,simulationTime=0,targetResetAt=0,statusKey='ready',last=0,accumulator=0,visible=false,manual=false;
let leftAngle=.45,rightAngle=Math.PI-.45,leftOmega=0,rightOmega=0;
const controls={left:new Set(),right:new Set(),launch:new Set()},trail=[],sparks=[],labels=[];
const bumpers=[{x:169,y:248,r:26,hit:-10},{x:301,y:248,r:26,hit:-10},{x:235,y:365,r:30,hit:-10}];
const targets=[{x:112,y:137,r:13,lit:false,hit:-10},{x:190,y:110,r:13,lit:false,hit:-10},{x:277,y:110,r:13,lit:false,hit:-10},{x:355,y:137,r:13,lit:false,hit:-10}];
const wallPoints=[[29,575],[29,190],[47,89],[83,53],[368,53],[427,82],[463,129],[463,794]];
// Smooth guide-to-pivot joins and open outside lanes: no blind pocket behind a sling.
const rails=[...[...wallPoints.slice(1)].map((p,i)=>[wallPoints[i][0],wallPoints[i][1],p[0],p[1],7]),[29,575,82,650,7],[82,650,FLIPPER.left,FLIPPER.y,7],[414,194,414,793,5],[414,575,388,650,7],[388,650,FLIPPER.right,FLIPPER.y,7]];
const slings=[[[102,549],[170,616],[114,623]],[[367,549],[299,616],[355,623]]];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function t(key){return words[key]||key;}
function selected(){return !root.hidden&&(!menu||menu.value===root.id)&&root.getClientRects().length>0;}
function welcomeOpen(){const el=document.getElementById('welcome-screen');return !!(el&&!el.hidden&&el.style.display!=='none'&&document.documentElement.dataset.entryState!=='entered');}
function canInput(){return selected()&&!document.hidden&&!welcomeOpen()&&!paused&&phase!=='over';}
function editable(){const e=document.activeElement;return !!e&&(e.isContentEditable||/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName));}
function sound(freq=420,length=.055){if(!$('sound').checked||manual)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!sound.audio)sound.audio=new C();const a=sound.audio;a.resume().catch(()=>{});const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(freq,a.currentTime);o.frequency.exponentialRampToValueAtTime(freq*.6,a.currentTime+length);g.gain.setValueAtTime(.035,a.currentTime);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+length);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+length)}catch(_) {}}
function textStatus(key){statusKey=key;$('status').textContent=t(key);}
function updateHUD(){
 $('score').textContent=score.toLocaleString(lang);$('best').textContent=best.toLocaleString(lang);$('lives').textContent=String(lives);$('multiplier').textContent=multiplier+'×';
 const lit=targets.filter(q=>q.lit).length;$('targets').setAttribute('aria-label',lit+' / 4');[...$('targets').children].forEach((e,i)=>e.classList.toggle('pbn-lit',targets[i].lit));
 const power=Math.round(charge*100);$('chargebar').style.width=power+'%';$('power').setAttribute('aria-valuenow',power);
 $('pause').disabled=phase==='over';$('pause').textContent=t(paused?'resume':'pause');$('pause').setAttribute('aria-pressed',String(paused));
 $('launch').disabled=phase!=='ready'||paused;$('left').disabled=paused||phase==='over';$('right').disabled=paused||phase==='over';
 const overlay=paused||phase==='over';$('overlay').hidden=!overlay;if(overlay){$('overlay-title').textContent=t(phase==='over'?'over':'paused');$('overlay-copy').textContent=phase==='over'?t('finalscore')+': '+score.toLocaleString(lang):t('pausereason');$('overlay-action').textContent=t(phase==='over'?'newgame':'continue');}
}
function translate(nextLanguage){const value=typeof nextLanguage==='string'?nextLanguage:document.getElementById('sm-language')?.value;lang=textRows[value]?value:'pt';words=Object.fromEntries(keys.map((key,i)=>[key,textRows[lang][i]]));words.language={pt:'Idioma',en:'Language',es:'Idioma',it:'Lingua',de:'Sprache',fr:'Langue',nl:'Taal',sv:'Språk',no:'Språk'}[lang];$('language').value=lang;root.querySelectorAll('[data-pbn]').forEach(el=>el.textContent=t(el.dataset.pbn));[...$('theme').options].forEach((e,i)=>e.textContent=themeNames[lang][i]);canvas.setAttribute('aria-label',t('keyboard'));$('power').setAttribute('aria-label',t('power'));textStatus(statusKey);updateHUD();draw();}
function serve(){ball={x:439,y:742,vx:0,vy:0,r:R,launched:false};phase='ready';charge=0;trail.length=0;textStatus('ready');updateHUD();}
function reset(){clearControls();score=0;lives=3;multiplier=1;paused=false;simulationTime=0;targetResetAt=0;leftAngle=.45;rightAngle=Math.PI-.45;leftOmega=rightOmega=0;bumpers.forEach(q=>q.hit=-10);targets.forEach(q=>{q.lit=false;q.hit=-10});slings.forEach(q=>q.hit=-10);sparks.length=0;labels.length=0;serve();accumulator=0;last=0;draw();}
function pause(value=true){if(phase==='over')return;paused=!!value;clearControls();accumulator=0;last=0;charge=0;if(paused)textStatus('paused');else textStatus(phase==='ready'?'ready':'rolling');updateHUD();draw();}
function addPoints(points,x,y){const gain=points*multiplier;score+=gain;if(score>best){best=score;try{localStorage.setItem('pj-pinball-best-v1',String(best))}catch(_) {}}labels.push({x,y,text:'+'+gain,age:0});updateHUD();}
function burst(x,y,color,count=7){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(let i=0;i<count;i++){const a=i/count*Math.PI*2;sparks.push({x,y,vx:Math.cos(a)*110,vy:Math.sin(a)*110,color,age:0});}}
function releaseLaunch(){if(phase!=='ready'||paused||!ball)return;const power=charge;charge=0;ball.vy=-(980+power*390);ball.vx=0;ball.launched=true;phase='playing';textStatus('rolling');sound(210,.12);updateHUD();}
function press(name,source){if(!canInput()||name==='launch'&&phase!=='ready')return;controls[name].add(source);$(name).classList.add('pbn-held');if(name==='launch')textStatus('charging');}
function release(name,source,launch=true){if(!controls[name].has(source))return;controls[name].delete(source);if(!controls[name].size){$(name).classList.remove('pbn-held');if(name==='launch'){if(launch&&canInput())releaseLaunch();else{charge=0;if(phase==='ready')textStatus('ready')}}}}
function clearControls(){Object.entries(controls).forEach(([name,sources])=>{sources.clear();$(name).classList.remove('pbn-held')});charge=0;}
function drain(){lives--;clearControls();if(lives<=0){lives=0;phase='over';ball=null;textStatus('over');sound(95,.3)}else{serve();textStatus('lost');sound(130,.12)}updateHUD();}
function segmentCollision(x1,y1,x2,y2,radius=5,restitution=.72,surfaceVX=0,surfaceVY=0){
 const dx=x2-x1,dy=y2-y1,len2=dx*dx+dy*dy,along=clamp(((ball.x-x1)*dx+(ball.y-y1)*dy)/(len2||1),0,1),qx=x1+along*dx,qy=y1+along*dy;
 let nx=ball.x-qx,ny=ball.y-qy,d=Math.hypot(nx,ny),limit=R+radius;if(d>=limit)return false;
 if(d<.00001){const length=Math.sqrt(len2)||1;nx=-dy/length;ny=dx/length;if(ball.vx*nx+ball.vy*ny>0){nx=-nx;ny=-ny}d=0}else{nx/=d;ny/=d}
 ball.x+=nx*(limit-d+.02);ball.y+=ny*(limit-d+.02);
 const relative=(ball.vx-surfaceVX)*nx+(ball.vy-surfaceVY)*ny;if(relative<0){const impulse=-(1+restitution)*relative;ball.vx+=nx*impulse;ball.vy+=ny*impulse;return true}return false;
}
function circleCollision(q,kick,points){let nx=ball.x-q.x,ny=ball.y-q.y,d=Math.hypot(nx,ny),limit=R+q.r;if(d>=limit)return;nx/=d||1;ny/=d||1;if(d<.001){nx=0;ny=-1}ball.x=q.x+nx*(limit+.1);ball.y=q.y+ny*(limit+.1);const approach=ball.vx*nx+ball.vy*ny;if(approach<0){const bounce=-approach*.82+kick;ball.vx+=nx*(bounce-approach);ball.vy+=ny*(bounce-approach);if(simulationTime-q.hit>.16){q.hit=simulationTime;if(points){addPoints(points,q.x,q.y-22);sound(520+(q.y%200),.06);burst(q.x,q.y,palettes[theme].hot)}if(targets.includes(q)&&!q.lit){q.lit=true;if(targets.every(e=>e.lit)&&!targetResetAt){addPoints(2000,235,170);multiplier=Math.min(5,multiplier+1);targetResetAt=simulationTime+.9;sound(850,.2)}updateHUD()}}}}
function flipperCollision(pivotX,angle,omega){const pivotY=FLIPPER.y,length=FLIPPER.length,tipX=pivotX+Math.cos(angle)*length,tipY=pivotY+Math.sin(angle)*length;const dx=tipX-pivotX,dy=tipY-pivotY,along=clamp(((ball.x-pivotX)*dx+(ball.y-pivotY)*dy)/(length*length),0,1);let sx=-omega*dy*along,sy=omega*dx*along;const speed=Math.hypot(sx,sy);if(speed>660){sx*=660/speed;sy*=660/speed}segmentCollision(pivotX,pivotY,tipX,tipY,FLIPPER.radius,.66,sx,sy);}
function advance(dt){
 if(paused||phase==='over')return;
 simulationTime+=dt;
 const oldL=leftAngle,oldR=rightAngle,targetL=controls.left.size?-.56:.45,targetR=controls.right.size?Math.PI+.56:Math.PI-.45,rate=19*dt;
 leftAngle+=clamp(targetL-leftAngle,-rate,rate);rightAngle+=clamp(targetR-rightAngle,-rate,rate);leftOmega=(leftAngle-oldL)/dt;rightOmega=(rightAngle-oldR)/dt;
 if(phase==='ready'){if(controls.launch.size)charge=clamp(charge+dt*.72,0,1);return;}
 if(targetResetAt&&simulationTime>=targetResetAt){targets.forEach(q=>q.lit=false);targetResetAt=0;updateHUD();}
 if(!ball)return;
 const endL=leftAngle,endR=rightAngle;
 // Include moving flipper tips in the subdivision: their sweep must not jump through the ball.
 const sweepSpeed=Math.max(Math.hypot(ball.vx,ball.vy),FLIPPER.length*Math.abs(leftOmega),FLIPPER.length*Math.abs(rightOmega));
 const substeps=Math.max(3,Math.ceil(sweepSpeed*dt/2)),small=dt/substeps;
 for(let n=0;n<substeps;n++){
  leftAngle=oldL+(endL-oldL)*(n+1)/substeps;rightAngle=oldR+(endR-oldR)*(n+1)/substeps;
  ball.vy+=610*small;ball.vx*=Math.exp(-.065*small);ball.vy*=Math.exp(-.065*small);ball.x+=ball.vx*small;ball.y+=ball.vy*small;
  // The gate closes only after the ball has really cleared the shooter divider.
  if(ball.launched&&ball.x<414-R-5)ball.launched=false;
  for(let pass=0;pass<6;pass++){
   rails.forEach(p=>segmentCollision(...p));
   slings.forEach((points,i)=>{
    for(let s=0;s<3;s++){
     const a=points[s],b=points[(s+1)%3],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
     const outwardX=(i===0?dy:-dy)/length,outwardY=(i===0?-dx:dx)/length;
     // Only the face looking into the playfield has a solenoid; the other two are passive rubber.
     const front=s===0&&(ball.x-a[0])*outwardX+(ball.y-a[1])*outwardY>0;
     const hit=segmentCollision(a[0],a[1],b[0],b[1],5,front?.86:.72);
     if(hit&&front&&simulationTime-(points.hit??-10)>.25){points.hit=simulationTime;ball.vx+=outwardX*135;ball.vy+=outwardY*135;addPoints(25,a[0],a[1]);sound(330,.045)}
    }
   });
   bumpers.forEach(q=>circleCollision(q,270,75));targets.forEach(q=>circleCollision(q,110,q.lit?0:125));
   flipperCollision(FLIPPER.left,leftAngle,leftOmega);flipperCollision(FLIPPER.right,rightAngle,rightOmega);
   // The visible sloped gate guides returned balls left rather than making a horizontal resting shelf.
   if(!ball.launched)segmentCollision(...EXIT_GATE,.75);
  }
  const speed=Math.hypot(ball.vx,ball.vy);if(speed>MAX_SPEED){ball.vx*=MAX_SPEED/speed;ball.vy*=MAX_SPEED/speed;}
  if(!Number.isFinite(ball.x+ball.y+ball.vx+ball.vy)||ball.x<-50||ball.x>W+50){drain();return;}
  // A ball falling down the launch lane is served again rather than stranded.
  if(ball.x>421&&ball.y>742&&ball.vy>0){serve();return;}
  if(ball.y>H+20){drain();return;}
 }
 trail.push({x:ball.x,y:ball.y});if(trail.length>9)trail.shift();
 for(let i=sparks.length-1;i>=0;i--){const q=sparks[i];q.age+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.age>.36)sparks.splice(i,1)}
 for(let i=labels.length-1;i>=0;i--){const q=labels[i];q.age+=dt;q.y-=22*dt;if(q.age>.8)labels.splice(i,1)}
}
function line(points,color,width){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();}
function roundRect(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
function circle(x,y,r,fill,stroke,width=1){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke()}}
function star(x,y,size,color){ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,r=i%2?size*.36:size;const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();ctx.fillStyle=color;ctx.fill();}
function paddle(x,angle){const y=FLIPPER.y,ex=x+Math.cos(angle)*FLIPPER.length,ey=y+Math.sin(angle)*FLIPPER.length;line([[x,y+6],[ex,ey+6]],'#061717aa',24);line([[x,y],[ex,ey]],palettes[theme].rubber,FLIPPER.radius*2);line([[x,y-2],[ex,ey-2]],'#eee5c8',14);line([[x+Math.cos(angle)*15,y-2+Math.sin(angle)*15],[ex-Math.cos(angle)*9,ey-2-Math.sin(angle)*9]],palettes[theme].rubber,3);circle(x,y,5,'#142e2c','#a8c1ae',2);}
function draw(){
 const p=palettes[theme],scaleX=canvas.width/W,scaleY=canvas.height/H;ctx.setTransform(scaleX,0,0,scaleY,0,0);ctx.clearRect(0,0,W,H);
 let bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,p.base);bg.addColorStop(1,p.deep);ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
 // Fine print, quiet stars and machined rails give the table depth without glare.
 ctx.globalAlpha=.065;for(let y=80;y<750;y+=26){line([[44,y],[407,y]],p.ink,1)}ctx.globalAlpha=1;
 for(let i=0;i<34;i++){const x=55+(i*83)%335,y=82+(i*137)%490;circle(x,y,i%3===0?1.4:.8,p.ink+'28');}
 ctx.save();ctx.translate(235,350);ctx.rotate(-.12);ctx.strokeStyle=p.accent+'30';ctx.lineWidth=1;for(let r=145;r<=220;r+=25){ctx.beginPath();ctx.ellipse(0,0,r,r*.61,0,0,Math.PI*2);ctx.stroke()}ctx.restore();
 circle(235,365,135,null,p.accent+'24',1);circle(235,365,91,null,p.accent+'18',1);
 ctx.font='700 31px system-ui';ctx.textAlign='center';ctx.fillStyle=p.ink;ctx.fillText('ODYSSEY',235,464);ctx.font='600 9px system-ui';ctx.fillStyle=p.accent;ctx.fillText('P I N B A L L   C L U B',235,485);
 const arch=[[54,192],[69,109],[105,84],[345,84],[398,111]];line(arch,p.accent+'45',2);
 rails.forEach(([x1,y1,x2,y2,r])=>{line([[x1+2,y1+6],[x2+2,y2+6]],'#04191daa',r*2+6);line([[x1,y1],[x2,y2]],'#77978b',r*2);line([[x1-1,y1-2],[x2-1,y2-2]],'#c0cbb7',Math.max(2,r*.55));});
 // The closing gate is real geometry, with the same endpoints used by the physics.
 if(!ball||!ball.launched){line([[EXIT_GATE[0],EXIT_GATE[1]],[EXIT_GATE[2],EXIT_GATE[3]]],p.hot,EXIT_GATE[4]*2);}
 // Launch lane and spring.
 roundRect(428,240,25,542,12,'#10282a66');line([[435,266],[435,677]],p.accent+'4d',1);ctx.save();ctx.translate(439,769+charge*9);ctx.strokeStyle=p.hot;ctx.lineWidth=2;ctx.beginPath();for(let j=0;j<7;j++){ctx.moveTo(-7,6+j*3);ctx.lineTo(7,9+j*3)}ctx.stroke();roundRect(-11,-9,22,11,3,p.hot);ctx.restore();
 targets.forEach(q=>{circle(q.x+1,q.y+5,q.r,'#00191977');circle(q.x,q.y,q.r-1,q.lit?p.hot:p.deep,q.lit?p.hot:p.accent,2);star(q.x,q.y,9,q.lit?p.deep:p.hot);});
 bumpers.forEach(q=>{const lit=simulationTime-q.hit<.16;circle(q.x+3,q.y+8,q.r,'#03181ebb');circle(q.x,q.y,q.r-1,p.rubber,p.accent+'60',2);circle(q.x,q.y,q.r-4,lit?p.hot:'#e8e0c4','#fff2cb',2);circle(q.x,q.y,q.r-10,p.base,p.accent,2);star(q.x,q.y,11,p.hot);line([[q.x-q.r*.45,q.y-q.r*.52],[q.x+q.r*.35,q.y-q.r*.52]],'#ffffff40',2);});
 slings.forEach(points=>{ctx.beginPath();points.forEach((a,i)=>i?ctx.lineTo(a[0],a[1]+5):ctx.moveTo(a[0],a[1]+5));ctx.closePath();ctx.fillStyle='#03191cb0';ctx.fill();ctx.beginPath();points.forEach((a,i)=>i?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1]));ctx.closePath();ctx.fillStyle=p.rubber;ctx.fill();ctx.strokeStyle=p.hot;ctx.lineWidth=10;ctx.lineJoin='round';ctx.stroke();});
 // Painted dashed arrows indicate the open drain lanes without pretending to be solid rails.
 ctx.setLineDash([3,7]);line([[53,660],[75,716],[125,743]],p.accent+'44',1);line([[409,660],[385,716],[345,743]],p.accent+'44',1);ctx.setLineDash([]);paddle(FLIPPER.left,leftAngle);paddle(FLIPPER.right,rightAngle);
 roundRect(188,775,94,12,6,'#03191e');ctx.font='700 8px system-ui';ctx.fillStyle=p.accent+'99';ctx.fillText('ODYSSEY · 01',235,789);
 if(ball){if(!matchMedia('(prefers-reduced-motion: reduce)').matches){trail.forEach((q,i)=>circle(q.x,q.y,R*(i+1)/trail.length*.6,p.hot+Math.round((i+1)/trail.length*45).toString(16).padStart(2,'0')))}circle(ball.x+3,ball.y+5,R+1,'#00131988');const metal=ctx.createRadialGradient(ball.x-3,ball.y-4,1,ball.x,ball.y,R);metal.addColorStop(0,'#fffdf4');metal.addColorStop(.35,'#e5e4d4');metal.addColorStop(.7,'#91aaa5');metal.addColorStop(1,'#304f54');circle(ball.x,ball.y,R,metal,'#ebeddd',.8);}
 sparks.forEach(q=>{ctx.globalAlpha=1-q.age/.36;circle(q.x,q.y,2,q.color)});ctx.globalAlpha=1;
 ctx.font='800 13px system-ui';labels.forEach(q=>{ctx.globalAlpha=1-q.age/.8;ctx.fillStyle=p.hot;ctx.fillText(q.text,q.x,q.y)});ctx.globalAlpha=1;
}
function resize(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);if(rect.width<1)return;const width=Math.max(1,Math.round(rect.width*dpr)),height=Math.max(1,Math.round(rect.height*dpr));if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}draw();}
function frame(now){requestAnimationFrame(frame);const isVisible=selected()&&!document.hidden&&!welcomeOpen();if(!isVisible){if(visible&&phase==='playing')pause(true);if(visible)clearControls();visible=false;last=0;accumulator=0;return;}if(!visible){visible=true;resize();last=now}if(manual){draw();return;}const elapsed=last?Math.min(.05,(now-last)/1000):0;last=now;if(!paused){accumulator+=elapsed;while(accumulator>=STEP){advance(STEP);accumulator-=STEP}}updateHUD();draw();}
const keyMap={KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right',Space:'launch'};
window.addEventListener('keydown',e=>{if(e.defaultPrevented||!selected()||welcomeOpen()||editable()||e.ctrlKey||e.metaKey||e.altKey)return;if(e.code==='KeyP'){if(!e.repeat){e.preventDefault();pause(!paused)}return;}const control=keyMap[e.code];if(!control||!canInput())return;e.preventDefault();press(control,'key:'+e.code);});
window.addEventListener('keyup',e=>{const name=keyMap[e.code];if(!name)return;const source='key:'+e.code;if(controls[name].has(source)){e.preventDefault();release(name,source,canInput())}});
['left','right','launch'].forEach(name=>{const button=$(name);button.addEventListener('pointerdown',e=>{if(e.button!==0||!canInput())return;e.preventDefault();button.setPointerCapture?.(e.pointerId);press(name,'pointer:'+e.pointerId)});button.addEventListener('pointerup',e=>{e.preventDefault();release(name,'pointer:'+e.pointerId)});button.addEventListener('pointercancel',e=>release(name,'pointer:'+e.pointerId,false));button.addEventListener('lostpointercapture',e=>release(name,'pointer:'+e.pointerId,false));button.addEventListener('keydown',e=>{if(e.code==='Enter'||e.code==='Space'){e.preventDefault();e.stopPropagation();if(!e.repeat)press(name,'button:'+e.code)}});button.addEventListener('keyup',e=>{if(e.code==='Enter'||e.code==='Space'){e.preventDefault();e.stopPropagation();release(name,'button:'+e.code)}});button.addEventListener('blur',()=>{for(const source of [...controls[name]])if(source.startsWith('button:'))release(name,source,false)});});
$('start').addEventListener('click',reset);$('pause').addEventListener('click',()=>pause(!paused));$('overlay-action').addEventListener('click',()=>phase==='over'?reset():pause(false));
$('theme').addEventListener('change',()=>{theme=palettes[$('theme').value]?$('theme').value:'space';draw()});
document.getElementById('sm-language')?.addEventListener('change',()=>translate());
$('language').addEventListener('change',()=>translate($('language').value));
window.addEventListener('blur',()=>{clearControls();if(selected()&&phase==='playing')pause(true);else updateHUD()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearControls();if(phase==='playing')pause(true);else updateHUD()}});
menu?.addEventListener('change',()=>{if(menu.value!==root.id){clearControls();if(phase==='playing')pause(true);}else resize()});
new MutationObserver(()=>{if(root.hidden){clearControls();if(phase==='playing')pause(true)}}).observe(root,{attributes:true,attributeFilter:['hidden']});
new ResizeObserver(resize).observe(canvas);
window.addEventListener('pj:entry-complete',resize);
// Small deterministic inspection API for integration tests, unused by the UI.
window.pjPinball={geometry:()=>({rails:rails.map(p=>[...p]),gate:[...EXIT_GATE],slings:slings.map(p=>p.map(a=>[...a])),bumpers:bumpers.map(({x,y,r})=>({x,y,r})),targets:targets.map(({x,y,r})=>({x,y,r})),flipper:{...FLIPPER}}),snapshot:()=>({dimensions:{width:W,height:H,ballRadius:R,fixedStep:STEP,maxSpeed:MAX_SPEED},score,best,lives,multiplier,phase,paused,charge,theme,lang,time:simulationTime,ball:ball?{...ball}:null,targets:targets.map(q=>q.lit),held:Object.fromEntries(Object.entries(controls).map(([k,v])=>[k,v.size])),flippers:[leftAngle,rightAngle]}),reset,step:(seconds=STEP)=>{manual=true;const count=Math.ceil(clamp(seconds,0,60)/STEP);for(let i=0;i<count;i++)advance(STEP);updateHUD();draw();return window.pjPinball.snapshot()},setBall:(data)=>{manual=true;ball={x:235,y:400,vx:0,vy:0,r:R,launched:false,...data};phase='playing';paused=false;trail.length=0;updateHUD();draw()},hold:(name,on=true)=>{manual=true;if(!controls[name])return;if(on)controls[name].add('test');else controls[name].delete('test')},launch:(power=.6)=>{manual=true;if(phase==='ready'){charge=clamp(power,0,1);releaseLaunch()}},pause,resumeRealtime:()=>{manual=false;accumulator=0;last=0}};
theme=palettes[$('theme').value]?$('theme').value:'space';translate();reset();requestAnimationFrame(frame);
})();

