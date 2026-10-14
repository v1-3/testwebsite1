
(()=>{
'use strict';
const root=document.getElementById('breakout-section');
if(!root||root.dataset.boReady)return;
root.dataset.boReady='true';
const $=name=>document.getElementById('bo-'+name),canvas=$('canvas'),ctx=canvas.getContext('2d'),menu=document.getElementById('game-menu-select');
if(!ctx){$('status').textContent='Canvas is unavailable in this browser.';return;}
const W=600,H=660,R=7,STEP=1/120,WALL=18,PADDLE_Y=603,PADDLE_H=13,MAX_SPEED=740;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const keys='subtitle language sound pause resume newgame score lives level best left launch right space keyboard mission remaining missioncopy how tip1 tip2 tip3 tip4 note ready playing lost paused pausereason cleared clearcopy next over finalscore aria progress'.split(' ');
const rows={
pt:['Encontre o ângulo. Quebre o próximo bloco.','Idioma','Som','Pausar','Continuar','Novo jogo','PONTOS','VIDAS','FASE','RECORDE','ESQUERDA','LANÇAR','DIREITA','ESPAÇO','← → / A D: mover · Espaço: lançar · P: pausa · Mouse ou toque: arrastar.','LIMPE A PAREDE','blocos restantes','Cinco desenhos, fases sem fim. A bola acelera e a raquete fica menor.','Como jogar','Mova a raquete para manter a bola em jogo. Toque na quadra ou use Espaço para lançar.','As bordas da raquete mudam o ângulo do rebote. O movimento da raquete também conta.','Blocos marcados com dois traços precisam de dois acertos. Cada acerto vale pontos.','Limpe todos os blocos para avançar. Você tem três vidas; sair da página pausa o jogo.','Um bom rebote abre caminho.','Pressione Espaço ou toque para lançar.','Bola em jogo. Encontre o próximo ângulo!','Bola perdida. Lance a próxima.','Pausado','O jogo está esperando por você.','Fase concluída!','Bônus: {bonus} pontos.\nA próxima parede está pronta.','Próxima fase','Fim de jogo','Pontuação final: {score}','Breakout. Mova com as setas, A e D, mouse ou toque. Espaço lança; P pausa.','Blocos quebrados'],
en:['Find the angle. Break the next brick.','Language','Sound','Pause','Resume','New game','SCORE','LIVES','LEVEL','BEST','LEFT','LAUNCH','RIGHT','SPACE','← → / A D: move · Space: launch · P: pause · Mouse or touch: drag.','CLEAR THE WALL','bricks remaining','Five layouts, endless levels. The ball gets faster and the paddle gets smaller.','How to play','Move the paddle to keep the ball in play. Tap the court or press Space to launch.','The paddle edges change the bounce angle. Paddle movement also matters.','Bricks marked with two strokes need two hits. Every hit scores points.','Clear all bricks to advance. You have three lives; leaving this page pauses the game.','A good bounce opens a path.','Press Space or tap to launch.','Ball in play. Find the next angle!','Ball lost. Launch the next one.','Paused','The game is waiting for you.','Level complete!','Bonus: {bonus} points.\nThe next wall is ready.','Next level','Game over','Final score: {score}','Breakout. Move with arrows, A and D, mouse or touch. Space launches; P pauses.','Bricks broken'],
es:['Encuentra el ángulo. Rompe el siguiente bloque.','Idioma','Sonido','Pausar','Continuar','Nueva partida','PUNTOS','VIDAS','NIVEL','RÉCORD','IZQUIERDA','LANZAR','DERECHA','ESPACIO','← → / A D: mover · Espacio: lanzar · P: pausa · Ratón o toque: arrastrar.','LIMPIA LA PARED','bloques restantes','Cinco diseños, niveles sin fin. La bola acelera y la paleta se reduce.','Cómo jugar','Mueve la paleta para mantener la bola en juego. Toca la pista o pulsa Espacio para lanzar.','Los bordes de la paleta cambian el ángulo del rebote. Su movimiento también cuenta.','Los bloques con dos marcas necesitan dos golpes. Cada golpe da puntos.','Rompe todos los bloques para avanzar. Tienes tres vidas; el juego se pausa al salir.','Un buen rebote abre el camino.','Pulsa Espacio o toca para lanzar.','¡Bola en juego! Encuentra el siguiente ángulo.','Bola perdida. Lanza la siguiente.','En pausa','El juego te está esperando.','¡Nivel completado!','Bonificación: {bonus} puntos.\nLa siguiente pared está lista.','Siguiente nivel','Fin de la partida','Puntuación final: {score}','Breakout. Mueve con las flechas, A y D, ratón o toque. Espacio lanza; P pausa.','Bloques rotos'],
it:['Trova l’angolo. Rompi il prossimo mattone.','Lingua','Audio','Pausa','Continua','Nuova partita','PUNTI','VITE','LIVELLO','RECORD','SINISTRA','LANCIA','DESTRA','SPAZIO','← → / A D: muovi · Spazio: lancia · P: pausa · Mouse o tocco: trascina.','LIBERA LA PARETE','mattoni rimasti','Cinque schemi, livelli senza fine. La palla accelera e la racchetta si restringe.','Come giocare','Muovi la racchetta per tenere la palla in gioco. Tocca il campo o premi Spazio per lanciare.','I bordi della racchetta cambiano l’angolo del rimbalzo. Conta anche il suo movimento.','I mattoni con due segni richiedono due colpi. Ogni colpo dà punti.','Rompi tutti i mattoni per avanzare. Hai tre vite; il gioco si ferma quando esci.','Un buon rimbalzo apre la strada.','Premi Spazio o tocca per lanciare.','Palla in gioco. Trova il prossimo angolo!','Palla persa. Lancia la prossima.','In pausa','Il gioco ti aspetta.','Livello completato!','Bonus: {bonus} punti.\nLa prossima parete è pronta.','Prossimo livello','Partita finita','Punteggio finale: {score}','Breakout. Muovi con frecce, A e D, mouse o tocco. Spazio lancia; P mette in pausa.','Mattoni rotti'],
de:['Finde den Winkel. Triff den nächsten Stein.','Sprache','Ton','Pause','Weiter','Neues Spiel','PUNKTE','LEBEN','LEVEL','REKORD','LINKS','START','RECHTS','LEERTASTE','← → / A D: bewegen · Leertaste: starten · P: Pause · Maus oder Touch: ziehen.','RÄUME DIE WAND','Steine übrig','Fünf Muster, endlose Level. Der Ball wird schneller und der Schläger kleiner.','So spielst du','Bewege den Schläger, um den Ball im Spiel zu halten. Tippe auf das Feld oder drücke die Leertaste zum Starten.','Die Schlägerränder verändern den Abprallwinkel. Auch die Schlägerbewegung zählt.','Steine mit zwei Strichen brauchen zwei Treffer. Jeder Treffer gibt Punkte.','Räume alle Steine ab, um weiterzukommen. Du hast drei Leben; beim Verlassen pausiert das Spiel.','Ein guter Abpraller öffnet den Weg.','Leertaste drücken oder zum Starten tippen.','Ball im Spiel. Finde den nächsten Winkel!','Ball verloren. Starte den nächsten.','Pausiert','Das Spiel wartet auf dich.','Level geschafft!','Bonus: {bonus} Punkte.\nDie nächste Wand ist bereit.','Nächstes Level','Spiel beendet','Endpunktzahl: {score}','Breakout. Bewege mit Pfeilen, A und D, Maus oder Touch. Leertaste startet; P pausiert.','Zerstörte Steine'],
fr:['Trouvez l’angle. Brisez la prochaine brique.','Langue','Son','Pause','Reprendre','Nouvelle partie','SCORE','VIES','NIVEAU','RECORD','GAUCHE','LANCER','DROITE','ESPACE','← → / A D : bouger · Espace : lancer · P : pause · Souris ou toucher : glisser.','VIDEZ LE MUR','briques restantes','Cinq motifs, des niveaux sans fin. La balle accélère et la raquette rétrécit.','Comment jouer','Déplacez la raquette pour garder la balle en jeu. Touchez le terrain ou appuyez sur Espace pour lancer.','Les bords de la raquette changent l’angle du rebond. Son mouvement compte aussi.','Les briques à deux traits nécessitent deux coups. Chaque coup rapporte des points.','Brisez toutes les briques pour avancer. Vous avez trois vies ; quitter la page met le jeu en pause.','Un bon rebond ouvre un chemin.','Appuyez sur Espace ou touchez pour lancer.','Balle en jeu. Trouvez le prochain angle !','Balle perdue. Lancez la suivante.','En pause','Le jeu vous attend.','Niveau terminé !','Bonus : {bonus} points.\nLe prochain mur est prêt.','Niveau suivant','Partie terminée','Score final : {score}','Breakout. Bougez avec les flèches, A et D, la souris ou le toucher. Espace lance ; P met en pause.','Briques détruites'],
nl:['Vind de hoek. Breek de volgende steen.','Taal','Geluid','Pauze','Doorgaan','Nieuw spel','SCORE','LEVENS','LEVEL','RECORD','LINKS','START','RECHTS','SPATIE','← → / A D: bewegen · Spatie: start · P: pauze · Muis of aanraking: slepen.','MAAK DE MUUR LEEG','stenen over','Vijf patronen, eindeloze levels. De bal wordt sneller en de peddel kleiner.','Zo speel je','Beweeg de peddel om de bal in het spel te houden. Tik op het veld of druk op Spatie om te starten.','De peddelranden veranderen de stuiterhoek. De beweging van de peddel telt ook mee.','Stenen met twee strepen hebben twee treffers nodig. Elke treffer geeft punten.','Breek alle stenen om verder te gaan. Je hebt drie levens; het spel pauzeert als je deze pagina verlaat.','Een goede stuiter opent een pad.','Druk op Spatie of tik om te starten.','Bal in het spel. Vind de volgende hoek!','Bal verloren. Start de volgende.','Gepauzeerd','Het spel wacht op je.','Level voltooid!','Bonus: {bonus} punten.\nDe volgende muur is klaar.','Volgend level','Spel afgelopen','Eindscore: {score}','Breakout. Beweeg met pijlen, A en D, muis of aanraking. Spatie start; P pauzeert.','Gebroken stenen'],
sv:['Hitta vinkeln. Krossa nästa tegelsten.','Språk','Ljud','Pausa','Fortsätt','Nytt spel','POÄNG','LIV','NIVÅ','REKORD','VÄNSTER','STARTA','HÖGER','MELLANSLAG','← → / A D: flytta · Mellanslag: starta · P: paus · Mus eller touch: dra.','TÖM VÄGGEN','tegelstenar kvar','Fem mönster, oändliga nivåer. Bollen blir snabbare och paddeln mindre.','Så spelar du','Flytta paddeln för att hålla bollen i spel. Tryck på planen eller Mellanslag för att starta.','Paddelns kanter ändrar studsvinkeln. Paddelns rörelse spelar också roll.','Tegelstenar med två streck behöver två träffar. Varje träff ger poäng.','Krossa alla tegelstenar för att gå vidare. Du har tre liv; spelet pausas när du lämnar sidan.','En bra studs öppnar vägen.','Tryck på Mellanslag eller planen för att starta.','Bollen är i spel. Hitta nästa vinkel!','Bollen förlorad. Starta nästa.','Pausat','Spelet väntar på dig.','Nivå klar!','Bonus: {bonus} poäng.\nNästa vägg är redo.','Nästa nivå','Spelet slut','Slutpoäng: {score}','Breakout. Flytta med pilar, A och D, mus eller touch. Mellanslag startar; P pausar.','Krossade tegelstenar'],
no:['Finn vinkelen. Knus neste murstein.','Språk','Lyd','Pause','Fortsett','Nytt spill','POENG','LIV','NIVÅ','REKORD','VENSTRE','START','HØYRE','MELLOMROM','← → / A D: flytt · Mellomrom: start · P: pause · Mus eller berøring: dra.','TØM VEGGEN','mursteiner igjen','Fem mønstre, uendelige nivåer. Ballen blir raskere og padlen mindre.','Slik spiller du','Flytt padlen for å holde ballen i spill. Trykk på banen eller Mellomrom for å starte.','Kantene på padlen endrer sprettvinkelen. Padlens bevegelse teller også.','Mursteiner med to streker trenger to treff. Hvert treff gir poeng.','Knus alle mursteinene for å gå videre. Du har tre liv; spillet pauses når du forlater siden.','En god sprett åpner veien.','Trykk på Mellomrom eller banen for å starte.','Ballen er i spill. Finn neste vinkel!','Ball mistet. Start den neste.','Pauset','Spillet venter på deg.','Nivå fullført!','Bonus: {bonus} poeng.\nNeste vegg er klar.','Neste nivå','Spillet er over','Sluttpoeng: {score}','Breakout. Flytt med piler, A og D, mus eller berøring. Mellomrom starter; P pauser.','Knuste mursteiner']
};
const layouts={pt:['Primeiro contato','Xadrez','Diamante','Cruzamento','Colunas'],en:['First contact','Checkerboard','Diamond','Crossroads','Columns'],es:['Primer contacto','Ajedrez','Diamante','Cruce','Columnas'],it:['Primo contatto','Scacchiera','Diamante','Incrocio','Colonne'],de:['Erster Kontakt','Schachbrett','Diamant','Kreuzung','Säulen'],fr:['Premier contact','Damier','Diamant','Croisement','Colonnes'],nl:['Eerste contact','Schaakbord','Diamant','Kruispunt','Kolommen'],sv:['Första kontakt','Schackbräde','Diamant','Korsning','Kolumner'],no:['Første kontakt','Sjakkbrett','Diamant','Kryss','Kolonner']};
const palettes={
original:{bg:'#102a30',base:'#183d42',line:'#4b6e65',ink:'#d7e7d6',ball:'#fff1c6',paddle:'#90c5ad',bricks:['#dc9b76','#d6b26f','#bfc980','#7fb89b','#6ca8b2','#969dc4','#bc91ae']},
postcard:{bg:'#253930',base:'#374a3c',line:'#72816b',ink:'#e6ead6',ball:'#fff0c5',paddle:'#d3ce9b',bricks:['#d99671','#d6b47a','#c1c18a','#91b692','#78aaab','#9ea6bf','#bd9dab']},
ocean:{bg:'#092b3a',base:'#123e4b',line:'#427584',ink:'#d5eee6',ball:'#fff0bc',paddle:'#87d0cb',bricks:['#d59b78','#c8b679','#9ec5a9','#73bbae','#70aec6','#92a5cd','#b3a2c8']},
forest:{bg:'#172e25',base:'#244234',line:'#577962',ink:'#e2ecd3',ball:'#ffe5ae',paddle:'#b4c78a',bricks:['#d79a78','#d5b57b','#bfc686','#89b68b','#72a69c','#8da9b1','#bca6b1']},
sunset:{bg:'#39252d',base:'#503339',line:'#85636a',ink:'#f2e1cd',ball:'#ffebb9',paddle:'#dfb396',bricks:['#df9e8b','#e5b77b','#d4c492','#b2bd91','#92b4b0','#a1a9ce','#c0a0bf']},
galaxy:{bg:'#1f263e',base:'#30354e',line:'#636b93',ink:'#e7e5e9',ball:'#fcebb9',paddle:'#aca9d8',bricks:['#d99b9b','#d6b28b','#c6c293','#8fbfa9','#87b5cc','#aaa5d8','#c49dc5']},
neon:{bg:'#242538',base:'#34354b',line:'#6d7692',ink:'#e1e6e3',ball:'#e9edbe',paddle:'#8bc9ba',bricks:['#d8a4b8','#d1b28c','#c1ce99','#91c6b1','#89b5d0','#b5a7d7','#c89abe']}
};
let lang='pt',words={},theme='original',score=0,best=0,lives=3,level=1,phase='ready',paused=false,statusKey='ready',bricks=[],initialBricks=0,ball=null,elapsedTime=0,bonus=0,manual=false,visible=false,last=0,accumulator=0;
try{best=Math.max(0,Number(localStorage.getItem('pj-breakout-best-v1'))||0)}catch(_){}
const paddle={x:W/2,w:108,vx:0,target:W/2},controls={left:new Set(),right:new Set()},contactIds=new Set(),sparks=[],trail=[];
const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
function t(key,values={}){return (words[key]||key).replace(/\{(\w+)\}/g,(_,name)=>values[name]??'');}
function selected(){return !root.hidden&&(!menu||menu.value===root.id)&&root.getClientRects().length>0;}
function welcomeOpen(){const e=document.getElementById('welcome-screen');return !!(e&&!e.hidden&&e.style.display!=='none'&&document.documentElement.dataset.entryState!=='entered');}
function editable(){const e=document.activeElement;return !!e&&(e.isContentEditable||/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName));}
function canInput(){return selected()&&!document.hidden&&!welcomeOpen();}
function sound(freq=470,duration=.06){if(!$('sound').checked||manual)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const a=sound.audio||(sound.audio=new C());a.resume().catch(()=>{});const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(freq,a.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(60,freq*.65),a.currentTime+duration);g.gain.setValueAtTime(.028,a.currentTime);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+duration);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+duration)}catch(_) {}}
function setStatus(key){statusKey=key;$('status').textContent=t(key);}
function number(n){return n.toLocaleString(lang);}
function updateHUD(){
 $('score').textContent=number(score);$('best').textContent=number(best);$('lives').textContent=String(lives);$('level').textContent=String(level);
 const remaining=bricks.reduce((n,b)=>n+(b.hp>0),0),percent=initialBricks?Math.round(100*(initialBricks-remaining)/initialBricks):0;
 $('remaining').textContent=String(remaining);$('progress-bar').style.width=percent+'%';$('progress').setAttribute('aria-valuenow',percent);$('layout-name').textContent=layouts[lang][(level-1)%5];
 $('pause').disabled=phase==='over'||phase==='cleared';$('pause').textContent=t(paused?'resume':'pause');$('pause').setAttribute('aria-pressed',String(paused));
 $('launch').disabled=paused||phase==='playing';$('launch-label').textContent=t(phase==='cleared'?'next':phase==='over'?'newgame':'launch');
 $('left').disabled=paused||phase==='over'||phase==='cleared';$('right').disabled=$('left').disabled;
 $('overlay').hidden=!(paused||phase==='cleared'||phase==='over');
 if(!$('overlay').hidden){$('overlay-title').textContent=t(paused?'paused':phase);$('overlay-copy').textContent=t(paused?'pausereason':phase==='cleared'?'clearcopy':'finalscore',{score:number(score),bonus:number(bonus)});$('overlay-action').textContent=t(paused?'resume':phase==='cleared'?'next':'newgame');}
}
function translate(preferred){lang=rows[preferred]?preferred:rows[document.getElementById('sm-language')?.value]?document.getElementById('sm-language').value:'pt';words=Object.fromEntries(keys.map((key,i)=>[key,rows[lang][i]]));root.lang=lang;root.querySelectorAll('[data-bo]').forEach(e=>e.textContent=t(e.dataset.bo));$('language').value=lang;canvas.setAttribute('aria-label',t('aria'));$('progress').setAttribute('aria-label',t('progress'));$('status').textContent=t(statusKey);updateHUD();draw();}
function clearControls(){for(const name of ['left','right']){controls[name].clear();$(name).classList.remove('bo-held')}paddle.vx=0;paddle.target=paddle.x;}
function addScore(points){score+=points;if(score>best){best=score;try{localStorage.setItem('pj-breakout-best-v1',String(best))}catch(_) {}}}
function makeLayout(){
 const index=(level-1)%5;bricks=[];contactIds.clear();
 for(let row=0;row<7;row++)for(let col=0;col<9;col++){
  const include=index===0?row<5:index===1?row<6&&(row+col)%2===0:index===2?Math.abs(col-4)+Math.abs(row-3)<=4:index===3?row===0||row===6||col===row||col===8-row:col%3!==1||row%3===1;
  if(!include)continue;
  const hp=level>=2&&(row+col+level)%Math.max(2,5-Math.floor(level/5))===0?2:1;
  bricks.push({id:row*9+col,x:24+col*62,y:88+row*29,w:56,h:22,hp,maxHP:hp,row,hit:-10});
 }
 initialBricks=bricks.length;paddle.w=Math.max(74,108-(level-1)*4);paddle.x=clamp(paddle.x,WALL+paddle.w/2,W-WALL-paddle.w/2);paddle.target=paddle.x;
}
function serve(){phase='ready';ball={x:paddle.x,y:PADDLE_Y-R-2,vx:0,vy:0,r:R};contactIds.clear();trail.length=0;}
function reset(options={}){if(options.manual!==undefined)manual=!!options.manual;score=0;lives=3;level=1;bonus=0;elapsedTime=0;paused=false;accumulator=0;last=0;clearControls();paddle.x=paddle.target=W/2;makeLayout();serve();sparks.length=0;setStatus('ready');updateHUD();draw();}
function nextLevel(){if(phase!=='cleared')return;level++;bonus=0;paused=false;clearControls();makeLayout();serve();setStatus('ready');updateHUD();draw();}
function launch(){if(paused||phase!=='ready')return false;const speed=Math.min(555,320+(level-1)*24),direction=(level+lives)%2?1:-1;ball.vx=direction*speed*.31;ball.vy=-Math.sqrt(speed*speed-ball.vx*ball.vx);phase='playing';contactIds.clear();setStatus('playing');sound(250,.11);updateHUD();return true;}
function pause(value=true){if(phase==='over'||phase==='cleared')return;paused=!!value;clearControls();accumulator=0;last=0;setStatus(paused?'paused':phase==='ready'?'ready':'playing');updateHUD();draw();}
function primaryAction(){if(paused)pause(false);else if(phase==='cleared')nextLevel();else if(phase==='over')reset();else launch();}
function drain(){lives--;clearControls();if(lives<=0){lives=0;phase='over';ball=null;setStatus('over');sound(90,.25)}else{serve();setStatus('lost');sound(145,.12)}updateHUD();}
function levelClear(){phase='cleared';bonus=250*level;addScore(bonus);clearControls();trail.length=0;ball.vx=ball.vy=0;setStatus('cleared');sound(740,.18);updateHUD();}
function burst(x,y,color){if(reduced())return;for(let i=0;i<7;i++){const angle=i*Math.PI*2/7;sparks.push({x,y,vx:Math.cos(angle)*85,vy:Math.sin(angle)*85,color,age:0})}}
function normalizeVelocity(faster=false){if(!ball)return;let speed=Math.hypot(ball.vx,ball.vy);if(!Number.isFinite(speed)||speed<1){ball.vx=130;ball.vy=-300;speed=Math.hypot(ball.vx,ball.vy)}const target=Math.min(MAX_SPEED,speed*(faster?1.008:1));ball.vx*=target/speed;ball.vy*=target/speed;
 // A minimum vertical component prevents endless nearly horizontal wall bounces.
 if(Math.abs(ball.vy)<target*.23){ball.vy=(ball.vy>0?1:-1)*target*.23;ball.vx=(ball.vx<0?-1:1)*Math.sqrt(target*target-ball.vy*ball.vy)}
}
function overlapsCircle(b){const x=clamp(ball.x,b.x,b.x+b.w),y=clamp(ball.y,b.y,b.y+b.h);return Math.hypot(ball.x-x,ball.y-y)<R+.05;}
/* Sweep against four flat faces and four circular corners. The rounded corners
   avoid the false corner hits caused by simply expanding a rectangular box. */
function sweepCircleRect(px,py,vx,vy,rect,maxTime){
 let bestHit=null;const epsilon=1e-8;
 function offer(time,nx,ny,penetration=0){if(time<-epsilon||time>maxTime+epsilon||vx*nx+vy*ny>=-epsilon)return;if(!bestHit||time<bestHit.time-epsilon)bestHit={time:Math.max(0,time),nx,ny,penetration};}
 const nearX=clamp(px,rect.x,rect.x+rect.w),nearY=clamp(py,rect.y,rect.y+rect.h),dx=px-nearX,dy=py-nearY,d=Math.hypot(dx,dy);
 if(d<R-1e-5){if(d>1e-7)offer(0,dx/d,dy/d,R-d);else{const exits=[{d:px-rect.x,nx:-1,ny:0},{d:rect.x+rect.w-px,nx:1,ny:0},{d:py-rect.y,nx:0,ny:-1},{d:rect.y+rect.h-py,nx:0,ny:1}].sort((a,b)=>a.d-b.d);const q=exits.find(e=>vx*e.nx+vy*e.ny<0)||exits[0];offer(0,q.nx,q.ny,R+q.d)}}
 if(vx>epsilon){const time=(rect.x-R-px)/vx,y=py+vy*time;if(y>=rect.y-epsilon&&y<=rect.y+rect.h+epsilon)offer(time,-1,0)}
 if(vx<-epsilon){const time=(rect.x+rect.w+R-px)/vx,y=py+vy*time;if(y>=rect.y-epsilon&&y<=rect.y+rect.h+epsilon)offer(time,1,0)}
 if(vy>epsilon){const time=(rect.y-R-py)/vy,x=px+vx*time;if(x>=rect.x-epsilon&&x<=rect.x+rect.w+epsilon)offer(time,0,-1)}
 if(vy<-epsilon){const time=(rect.y+rect.h+R-py)/vy,x=px+vx*time;if(x>=rect.x-epsilon&&x<=rect.x+rect.w+epsilon)offer(time,0,1)}
 const speed2=vx*vx+vy*vy;if(speed2>epsilon)for(const [cx,cy,sx,sy] of [[rect.x,rect.y,-1,-1],[rect.x+rect.w,rect.y,1,-1],[rect.x,rect.y+rect.h,-1,1],[rect.x+rect.w,rect.y+rect.h,1,1]]){
  const ox=px-cx,oy=py-cy,b=2*(ox*vx+oy*vy),c=ox*ox+oy*oy-R*R,disc=b*b-4*speed2*c;if(disc<0)continue;const time=(-b-Math.sqrt(disc))/(2*speed2),x=px+vx*time-cx,y=py+vy*time-cy;if(x*sx>=-epsilon&&y*sy>=-epsilon)offer(time,x/R,y/R);
 }
 return bestHit;
}
function advance(dt){
 if(paused||phase==='over'||phase==='cleared')return;
 elapsedTime+=dt;const oldX=paddle.x,keyboard=(controls.right.size?1:0)-(controls.left.size?1:0),half=paddle.w/2;
 if(keyboard){paddle.x=clamp(oldX+keyboard*560*dt,WALL+half,W-WALL-half);paddle.target=paddle.x}else paddle.x=clamp(oldX+clamp(paddle.target-oldX,-1080*dt,1080*dt),WALL+half,W-WALL-half);
 paddle.vx=(paddle.x-oldX)/dt;
 if(phase==='ready'){ball.x=paddle.x;return;}
 if(!ball)return;
 for(const id of [...contactIds]){const b=bricks.find(e=>e.id===id);if(!b||b.hp<=0||!overlapsCircle(b))contactIds.delete(id)}
 let remaining=dt,consumed=0;const hitThisStep=new Set();
 for(let iteration=0;iteration<10&&remaining>1e-7&&phase==='playing';iteration++){
  let hit=null;
  function offer(h,type,brick=null){if(!h||h.time<-1e-8||h.time>remaining+1e-8)return;if(!hit||h.time<hit.time-1e-8)hit={...h,type,brick};}
  if(ball.vx<0)offer({time:(WALL+R-ball.x)/ball.vx,nx:1,ny:0},'wall');
  if(ball.vx>0)offer({time:(W-WALL-R-ball.x)/ball.vx,nx:-1,ny:0},'wall');
  if(ball.vy<0)offer({time:(WALL+R-ball.y)/ball.vy,nx:0,ny:1},'wall');
  if(ball.vy>0&&ball.y<=PADDLE_Y+PADDLE_H){const rect={x:oldX+paddle.vx*consumed-half,y:PADDLE_Y,w:paddle.w,h:PADDLE_H},h=sweepCircleRect(ball.x,ball.y,ball.vx-paddle.vx,ball.vy,rect,remaining);if(h&&h.ny<=0)offer(h,'paddle')}
  for(const b of bricks){if(b.hp<=0||contactIds.has(b.id)||hitThisStep.has(b.id))continue;offer(sweepCircleRect(ball.x,ball.y,ball.vx,ball.vy,b,remaining),'brick',b)}
  if(!hit){ball.x+=ball.vx*remaining;ball.y+=ball.vy*remaining;consumed+=remaining;remaining=0;break;}
  const travel=Math.max(0,hit.time);ball.x+=ball.vx*travel;ball.y+=ball.vy*travel;consumed+=travel;remaining-=travel;
  ball.x+=hit.nx*((hit.penetration||0)+.015);ball.y+=hit.ny*((hit.penetration||0)+.015);
  if(hit.type==='paddle'&&hit.ny<-.15){const speed=Math.min(MAX_SPEED,Math.max(320+(level-1)*8,Math.hypot(ball.vx,ball.vy))),center=oldX+paddle.vx*consumed,offset=clamp((ball.x-center)/half,-1,1),angle=clamp(offset*1.05+clamp(paddle.vx*.00022,-.14,.14),-1.14,1.14);ball.vx=speed*Math.sin(angle);ball.vy=-speed*Math.cos(angle);sound(245,.04)}
  else{const surfaceVX=hit.type==='paddle'?paddle.vx:0,approach=(ball.vx-surfaceVX)*hit.nx+ball.vy*hit.ny;ball.vx-=2*approach*hit.nx;ball.vy-=2*approach*hit.ny;if(hit.type==='wall')sound(165,.025);}
  if(hit.type==='brick'){const b=hit.brick;b.hp--;b.hit=elapsedTime;contactIds.add(b.id);hitThisStep.add(b.id);addScore((70-b.row*8)*Math.min(level,10));burst(ball.x,ball.y,palettes[theme].bricks[b.row]);sound(390+b.row*45,.055);normalizeVelocity(true);if(bricks.every(e=>e.hp<=0)){levelClear();return;}}
  else normalizeVelocity();
  // Exact contact ties choose one collider. Move on after reflection so the same
  // brick cannot score twice on a corner or remain trapped at time zero.
  if(travel<1e-7){const tiny=Math.min(remaining,1e-6);ball.x+=ball.vx*tiny;ball.y+=ball.vy*tiny;remaining-=tiny;consumed+=tiny;}
 }
 if(!Number.isFinite(ball.x+ball.y+ball.vx+ball.vy)||ball.x<-40||ball.x>W+40||ball.y>H+R){drain();return;}
 trail.push({x:ball.x,y:ball.y});if(trail.length>9)trail.shift();
 for(let i=sparks.length-1;i>=0;i--){const s=sparks[i];s.age+=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=140*dt;if(s.age>.35)sparks.splice(i,1)}
}
function roundRect(x,y,w,h,r,fill,stroke=null,lineWidth=1){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.lineWidth=lineWidth;ctx.strokeStyle=stroke;ctx.stroke();}}
function draw(){
 const p=palettes[theme];ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);
 const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,p.base);bg.addColorStop(1,p.bg);ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
 ctx.fillStyle=p.line+'22';for(let x=39;x<W;x+=29)for(let y=40;y<H;y+=29){ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}
 roundRect(8,8,W-16,H-16,15,'#00000000',p.line,2);ctx.fillStyle=p.ink;ctx.textAlign='left';ctx.font='700 11px system-ui';ctx.fillText('BRICK CLUB',30,47);ctx.textAlign='right';ctx.fillStyle=p.ink+'c0';ctx.fillText(t('level')+' '+String(level).padStart(2,'0'),W-30,47);
 for(const b of bricks){if(b.hp<=0)continue;const c=p.bricks[b.row],flash=elapsedTime-b.hit<.09;roundRect(b.x+1,b.y+4,b.w,b.h,5,'#071d2380');roundRect(b.x,b.y,b.w,b.h,5,flash?p.ball:c,'#ffffff30');ctx.strokeStyle='#ffffff45';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(b.x+7,b.y+4);ctx.lineTo(b.x+b.w-7,b.y+4);ctx.stroke();if(b.hp>1){ctx.strokeStyle=p.bg;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(b.x+b.w/2-5,b.y+8);ctx.lineTo(b.x+b.w/2-5,b.y+15);ctx.moveTo(b.x+b.w/2+5,b.y+8);ctx.lineTo(b.x+b.w/2+5,b.y+15);ctx.stroke();}}
 ctx.strokeStyle=p.line+'66';ctx.lineWidth=1;ctx.setLineDash([5,8]);ctx.beginPath();ctx.moveTo(30,PADDLE_Y+34);ctx.lineTo(W-30,PADDLE_Y+34);ctx.stroke();ctx.setLineDash([]);
 roundRect(paddle.x-paddle.w/2+2,PADDLE_Y+4,paddle.w,PADDLE_H,6,'#001b2280');roundRect(paddle.x-paddle.w/2,PADDLE_Y,paddle.w,PADDLE_H,6,p.paddle,p.ink+'a0',1);ctx.fillStyle=p.bg;ctx.fillRect(paddle.x-1,PADDLE_Y+3,2,PADDLE_H-6);
 if(ball){if(!reduced()&&phase==='playing'){trail.forEach((s,i)=>{ctx.beginPath();ctx.arc(s.x,s.y,R*(i+1)/trail.length*.55,0,Math.PI*2);ctx.fillStyle=p.ball+Math.round((i+1)/trail.length*35).toString(16).padStart(2,'0');ctx.fill()})}ctx.beginPath();ctx.arc(ball.x+2,ball.y+3,R,0,Math.PI*2);ctx.fillStyle='#00171d77';ctx.fill();ctx.beginPath();ctx.arc(ball.x,ball.y,R,0,Math.PI*2);ctx.fillStyle=p.ball;ctx.fill();ctx.beginPath();ctx.arc(ball.x-2,ball.y-2,2,0,Math.PI*2);ctx.fillStyle='#ffffffcc';ctx.fill();}
 if(phase==='ready'&&!paused){ctx.textAlign='center';ctx.fillStyle=p.ink;ctx.font='650 15px system-ui';ctx.fillText(t('ready'),W/2,492);ctx.strokeStyle=p.paddle+'77';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(paddle.x,566);ctx.lineTo(paddle.x,546);ctx.moveTo(paddle.x-5,552);ctx.lineTo(paddle.x,546);ctx.lineTo(paddle.x+5,552);ctx.stroke();}
 if(!reduced())for(const s of sparks){ctx.globalAlpha=Math.max(0,1-s.age/.35);ctx.fillStyle=s.color;ctx.fillRect(s.x-1.5,s.y-1.5,3,3)}ctx.globalAlpha=1;
}
function resize(){const rect=canvas.getBoundingClientRect();if(rect.width<1)return;const dpr=Math.min(2,window.devicePixelRatio||1),width=Math.max(1,Math.round(rect.width*dpr)),height=Math.max(1,Math.round(rect.height*dpr));if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}draw();}
function frame(now){requestAnimationFrame(frame);const isVisible=selected()&&!document.hidden&&!welcomeOpen();if(!isVisible){if(visible&&phase==='playing')pause(true);if(visible)clearControls();visible=false;last=0;accumulator=0;return;}if(!visible){visible=true;resize();last=now;}if(manual){draw();return;}const seconds=last?Math.min(.05,(now-last)/1000):0;last=now;if(!paused){accumulator+=seconds;while(accumulator>=STEP){advance(STEP);accumulator-=STEP}}updateHUD();draw();}
function movePointer(e){if(!canInput()||paused||phase==='over'||phase==='cleared')return;const rect=canvas.getBoundingClientRect();if(rect.width>0)paddle.target=clamp((e.clientX-rect.left)*W/rect.width,WALL+paddle.w/2,W-WALL-paddle.w/2);}
let courtPointer=null;
canvas.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||courtPointer?.id===e.pointerId)movePointer(e);});
canvas.addEventListener('pointerdown',e=>{if(e.button!==0||!canInput()||paused)return;e.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture?.(e.pointerId);courtPointer={id:e.pointerId,x:e.clientX,y:e.clientY};movePointer(e);});
canvas.addEventListener('pointerup',e=>{if(courtPointer?.id!==e.pointerId)return;const start=courtPointer;courtPointer=null;if(Math.hypot(e.clientX-start.x,e.clientY-start.y)<12&&canInput())primaryAction();});
canvas.addEventListener('pointercancel',()=>{courtPointer=null;});canvas.addEventListener('lostpointercapture',()=>{courtPointer=null;});
function press(name,source){if(!canInput()||paused||phase==='over'||phase==='cleared')return;controls[name].add(source);$(name).classList.add('bo-held');}
function release(name,source){controls[name].delete(source);if(!controls[name].size)$(name).classList.remove('bo-held');}
for(const name of ['left','right']){const button=$(name);button.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();button.setPointerCapture?.(e.pointerId);press(name,'pointer:'+e.pointerId);});for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,e=>release(name,'pointer:'+e.pointerId));button.addEventListener('keydown',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();e.stopPropagation();press(name,'button:'+e.code)}});button.addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();e.stopPropagation();release(name,'button:'+e.code)}});button.addEventListener('blur',()=>{for(const source of [...controls[name]])if(source.startsWith('button:'))release(name,source)});}
const keyMap={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'};
window.addEventListener('keydown',e=>{if(e.defaultPrevented||!canInput()||editable()||e.ctrlKey||e.metaKey||e.altKey)return;if(e.code==='KeyP'){e.preventDefault();if(!e.repeat)pause(!paused);return;}if(e.code==='Space'){if(/^(BUTTON|A)$/.test(document.activeElement?.tagName||''))return;e.preventDefault();if(!e.repeat)primaryAction();return;}const name=keyMap[e.code];if(name){e.preventDefault();press(name,'key:'+e.code);}});
window.addEventListener('keyup',e=>{const name=keyMap[e.code];if(name&&controls[name].has('key:'+e.code)){e.preventDefault();release(name,'key:'+e.code)}});
$('launch').addEventListener('click',()=>{if(canInput()){primaryAction();canvas.focus({preventScroll:true})}});
$('restart').addEventListener('click',()=>{reset();canvas.focus({preventScroll:true})});$('pause').addEventListener('click',()=>pause(!paused));$('overlay-action').addEventListener('click',()=>{primaryAction();canvas.focus({preventScroll:true})});
$('language').addEventListener('change',()=>translate($('language').value));document.getElementById('sm-language')?.addEventListener('change',()=>translate());
window.addEventListener('tp:game-theme-change',e=>{if(e.detail?.id===root.id){theme=palettes[e.detail.theme]?e.detail.theme:'original';draw();}});
window.addEventListener('blur',()=>{courtPointer=null;clearControls();if(selected()&&phase==='playing')pause(true)});
document.addEventListener('visibilitychange',()=>{if(document.hidden){courtPointer=null;clearControls();if(phase==='playing')pause(true)}});
menu?.addEventListener('change',()=>{if(menu.value!==root.id){courtPointer=null;clearControls();if(phase==='playing')pause(true)}else resize()});
window.addEventListener('resize',resize);document.addEventListener('pj:entry-complete',resize);
if(window.ResizeObserver)new ResizeObserver(resize).observe(canvas);
/* Read-only snapshots plus explicit deterministic hooks for meaningful physics
   checks. Calling a physics hook suspends the real-time clock until resumed. */
window.pjBreakout={
 snapshot:()=>({phase,paused,score,best,lives,level,theme,lang,manual,time:elapsedTime,width:W,height:H,ball:ball?{...ball}:null,paddle:{...paddle,y:PADDLE_Y,h:PADDLE_H},bricks:bricks.map(b=>({...b})),remaining:bricks.filter(b=>b.hp>0).length}),
 reset:(options={})=>reset({manual:true,...options}),
 step:seconds=>{manual=true;let left=clamp(Number(seconds)||0,0,60);while(left>1e-8){const dt=Math.min(STEP,left);advance(dt);left-=dt}updateHUD();draw();return window.pjBreakout.snapshot();},
 setBall:patch=>{manual=true;if(!ball)serve();for(const key of ['x','y','vx','vy'])if(Number.isFinite(patch[key]))ball[key]=patch[key];phase='playing';paused=false;contactIds.clear();trail.length=0;setStatus('playing');updateHUD();draw();},
 positionPaddle:x=>{manual=true;paddle.x=paddle.target=clamp(Number(x)||W/2,WALL+paddle.w/2,W-WALL-paddle.w/2);paddle.vx=0;if(phase==='ready')ball.x=paddle.x;draw();},
 setBricks:list=>{manual=true;bricks=list.map((b,i)=>({id:b.id??i,x:b.x,y:b.y,w:b.w??56,h:b.h??22,hp:b.hp??1,maxHP:b.hp??1,row:b.row??0,hit:-10}));initialBricks=bricks.length;contactIds.clear();updateHUD();draw();},
 launch,pause,nextLevel,
 resumeRealtime:()=>{manual=false;last=0;accumulator=0;},
 sweepCircleRect
};
reset();translate();resize();requestAnimationFrame(frame);
})();

