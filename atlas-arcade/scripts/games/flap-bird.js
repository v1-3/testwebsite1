
(()=>{
  'use strict';
  const root=document.getElementById('flap-bird-section');
  const canvas=document.getElementById('fb-canvas');
  const selection=document.getElementById('game-menu-select');
  if(!root||!canvas||!selection)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;
  const $=id=>document.getElementById('fb-'+id);
  const W=420,H=590,FLOOR=552,BX=118,BR=15;
  const settings={
    easy:{speed:135,gap:190,gravity:890,flap:-315,spacing:1.62},
    normal:{speed:164,gap:166,gravity:1020,flap:-337,spacing:1.49},
    hard:{speed:192,gap:148,gravity:1160,flap:-357,spacing:1.39}
  };
  const themes={
    postcard:{name:'CORREIO AÉREO',sky:'#91cef5',horizon:'#f3f7ff',bird:'#ffca4c',wing:'#ed8f34',beak:'#d93a35',tube:'#e7eefc',edge:'#2358d8',trim:'#d93a35',ground:'#e9d5af',overlay:'✉️'},
    world:{name:'VOLTA AO MUNDO',sky:'#83d9eb',horizon:'#c9f4e7',bird:'#f6c445',wing:'#3aa88b',beak:'#d95c38',tube:'#389b93',edge:'#126354',trim:'#f4d56a',ground:'#65b48f',overlay:'🌍'},
    ocean:{name:'COSTA AZUL',sky:'#83d8f7',horizon:'#f4eccf',bird:'#fff2ce',wing:'#ff9470',beak:'#f27948',tube:'#ef997c',edge:'#b44675',trim:'#fff2cf',ground:'#0e9cab',overlay:'🌊'},
    forest:{name:'BOSQUE VERDE',sky:'#b2e7c0',horizon:'#ecf3c0',bird:'#f4c44a',wing:'#72a865',beak:'#dc7e3d',tube:'#8dc98d',edge:'#2d765b',trim:'#fff1a0',ground:'#4e9265',overlay:'🌲'},
    sunset:{name:'PÔR DO SOL',sky:'#e788a3',horizon:'#ffcf9a',bird:'#ffe37d',wing:'#ff8c9c',beak:'#cd536c',tube:'#de7697',edge:'#874c85',trim:'#ffe6a8',ground:'#985577',overlay:'☀'},
    space:{name:'ÓRBITA LUNAR',sky:'#111d47',horizon:'#443c86',bird:'#8de9ff',wing:'#8b90ee',beak:'#ffc179',tube:'#39477c',edge:'#9bbaff',trim:'#52e3f9',ground:'#40345a',overlay:'🪐'},
    neon:{name:'ARCADE NEON',sky:'#140a3a',horizon:'#4c155e',bird:'#ffec57',wing:'#fb4ec7',beak:'#4ef1ee',tube:'#51296c',edge:'#fc57cd',trim:'#31e8f0',ground:'#221349',overlay:'✦'}
  };
  const themeButtons=[...root.querySelectorAll('[data-fb-theme]')];
  const levelButtons=[...root.querySelectorAll('[data-fb-level]')];
  const overlay=$('overlay'),overlayIcon=$('overlay-icon'),overlayTitle=$('overlay-title'),overlayText=$('overlay-text');
  const startButton=$('start'),pauseButton=$('pause'),soundButton=$('sound');
  let theme='postcard',level='easy',state='ready',sound=false,score=0,best=0;
  let bird={y:257,v:0,angle:0},pipes=[],particles=[],distance=0,time=0,spawner=0,frame=0,last=0;
  let audioCtx=null;
  function loadBest(){try{return Math.max(0,Number(localStorage.getItem('flap-bird-best-'+theme+'-'+level))||0)}catch(_){return 0}}
  function saveBest(){try{localStorage.setItem('flap-bird-best-'+theme+'-'+level,String(best))}catch(_){}}
  function active(){return selection.value==='flap-bird-section'&&!root.hidden&&!document.hidden;}
  function syncStatus(){
    $('score').textContent=String(score);$('best').textContent=String(best);
    $('state-label').textContent=state==='playing'?'▶':state==='paused'?'Ⅱ':state==='over'?'FIM':'—';
    pauseButton.disabled=state==='ready'||state==='over';
    pauseButton.textContent=state==='paused'?'▶ Continuar':'Ⅱ Pausar';
  }
  function showOverlay(icon,title,message,cta){
    overlayIcon.textContent=icon;overlayTitle.textContent=title;overlayText.textContent=message;
    startButton.textContent=cta;overlay.hidden=false;
  }
  function reset(){
    cancelAnimationFrame(frame);frame=0;last=0;
    bird={y:257,v:0,angle:0};pipes=[];particles=[];score=0;distance=0;time=0;spawner=0;
    best=loadBest();state='ready';syncStatus();
    showOverlay(themes[theme].overlay,'Pronto para voar?','Atravesse os portais, colecione milhas e envie seu cartão-postal!','DECOLAR →');
    draw();
  }
  function beep(pitch=520,duration=.07,type='sine'){
    if(!sound)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return;
      audioCtx=audioCtx||new Audio();
      if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      const t=audioCtx.currentTime;
      o.type=type;o.frequency.setValueAtTime(pitch,t);
      g.gain.setValueAtTime(.045,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);
      o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+duration);
    }catch(_){/* Sound must never prevent gameplay. */}
  }
  function begin(){
    if(!active())return;
    if(state==='paused'){
      state='playing';overlay.hidden=true;syncStatus();last=0;tick(performance.now());return;
    }
    if(state==='over')reset();
    if(state!=='ready')return;
    state='playing';overlay.hidden=true;syncStatus();flap();last=0;tick(performance.now());
  }
  function flap(){
    if(state!=='playing')return;
    bird.v=settings[level].flap;
    bird.angle=-.32;
    beep(560,.055);
    for(let i=0;i<4;i++)particles.push({x:BX-13,y:bird.y+6,vx:-35-i*12,vy:8+(i-2)*19,age:0,life:.3});
  }
  function pause(){
    if(state==='playing'){
      state='paused';cancelAnimationFrame(frame);frame=0;last=0;
      showOverlay('Ⅱ','Voo em espera','Seu progresso está guardado. Continue quando quiser.','CONTINUAR →');
    }else if(state==='paused'&&active())begin();
    syncStatus();
  }
  function gameOver(){
    state='over';cancelAnimationFrame(frame);frame=0;
    beep(220,.2,'triangle');syncStatus();
    showOverlay('✉️',score>0?'Cartão entregue!':'Fim de voo!',`Você atravessou ${score} ${score===1?'portal':'portais'}. Recorde neste destino: ${best}.`,'TENTAR NOVAMENTE →');
  }
  function spawn(){
    const c=settings[level];
    const min=100+c.gap/2, max=FLOOR-83-c.gap/2;
    const mid=min+Math.random()*(max-min);
    pipes.push({x:W+22,w:69,top:mid-c.gap/2,bottom:mid+c.gap/2,passed:false});
  }
  function collided(p){
    const left=p.x-5,right=p.x+p.w+5;
    if(BX+BR-3<left||BX-BR+3>right)return false;
    return bird.y-BR+4<p.top+5||bird.y+BR-4>p.bottom-5;
  }
  function update(dt){
    const c=settings[level];time+=dt;distance+=c.speed*dt;
    bird.v=Math.min(630,bird.v+c.gravity*dt);
    bird.y+=bird.v*dt;
    bird.angle=Math.max(-.46,Math.min(1.1,bird.v/480));
    spawner+=dt;
    if(spawner>c.spacing){spawner-=c.spacing;spawn()}
    for(const pipe of pipes){
      pipe.x-=c.speed*dt;
      if(!pipe.passed&&pipe.x+pipe.w<BX-BR){
        pipe.passed=true;score++;if(score>best){best=score;saveBest()}syncStatus();
        beep(800,.11,'triangle');
      }
      if(collided(pipe)){gameOver();break}
    }
    pipes=pipes.filter(p=>p.x+p.w>-25);
    particles=particles.filter(p=>p.age<p.life);
    for(const p of particles){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt}
    if(state==='playing'&&(bird.y-BR<=0||bird.y+BR>=FLOOR))gameOver();
  }
  function tick(now){
    if(state!=='playing')return;
    if(!active()){pause();return}
    if(!last)last=now;
    const dt=Math.min(.032,(now-last)/1000);last=now;
    update(dt);draw();
    if(state==='playing')frame=requestAnimationFrame(tick);
  }
  const rr=(x,y,w,h,r,fill,stroke,lw=1)=>{
    if(w<=0||h<=0)return;
    const rad=Math.max(0,Math.min(r,w/2,h/2));
    ctx.beginPath();ctx.roundRect(x,y,w,h,rad);
    if(fill){ctx.fillStyle=fill;ctx.fill()}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke()}
  };
  const circ=(x,y,r,color)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill()};
  function poly(pts,fill){ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))ctx.lineTo(p[0],p[1]);ctx.closePath();ctx.fillStyle=fill;ctx.fill()}
  function cloud(x,y,s=1,alpha=.7){
    ctx.save();ctx.globalAlpha=alpha;
    circ(x,y+11*s,20*s,'#fff');circ(x+22*s,y,24*s,'#fff');circ(x+45*s,y+9*s,19*s,'#fff');rr(x-11*s,y+8*s,71*s,21*s,9*s,'#fff');ctx.restore();
  }
  function skyline(){
    const off=(distance*.16)%85;
    ctx.fillStyle='rgba(39,83,130,.15)';
    for(let i=-1;i<8;i++){
      const x=i*85-off,w=31+(i%3)*11,h=70+(i%4)*19;
      rr(x,FLOOR-h,w,h,2,'rgba(35,88,130,.15)');
      ctx.fillStyle='rgba(255,255,255,.34)';
      for(let j=0;j<3;j++)for(let k=0;k<2;k++)ctx.fillRect(x+6+k*13,FLOOR-h+12+j*18,5,7);
    }
  }
  function mountains(colors){
    const off=(distance*.12)%210;
    for(let i=-1;i<4;i++){
      const x=i*210-off;
      poly([[x-100,FLOOR],[x+50,FLOOR-150],[x+200,FLOOR]],colors[0]);
      poly([[x-50,FLOOR],[x+100,FLOOR-100],[x+240,FLOOR]],colors[1]);
    }
  }
  function stars(){
    for(let i=0;i<64;i++){
      const x=(i*113+37)%W,y=(i*79+23)%460;
      const flicker=.45+.3*Math.sin(time*1.3+i);
      ctx.globalAlpha=flicker;
      circ(x,y,(i%8===0?2.1:1.15),i%3===0?'#a5e6fa':'#fff');
    }
    ctx.globalAlpha=1;
  }
  function ringPlanet(x,y,r){
    ctx.save();ctx.translate(x,y);ctx.rotate(-.3);
    ctx.strokeStyle='#b3b7f1';ctx.lineWidth=6;
    ctx.beginPath();ctx.ellipse(0,0,r*1.6,r*.42,0,0,Math.PI*2);ctx.stroke();
    circ(0,0,r,'#fac39d');
    ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=3;
    ctx.beginPath();ctx.ellipse(0,0,r*1.6,r*.42,0,0,Math.PI);ctx.stroke();
    ctx.restore();
  }
  function background(){
    const t=themes[theme];
    const grad=ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,t.sky);grad.addColorStop(1,t.horizon);
    ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    if(theme==='postcard'){
      circ(337,105,43,'#ffe9a4');
      for(let i=0;i<5;i++)cloud((i*125-(distance*.2)%625+625)%625-90,85+(i%3)*75,.65+(i%3)*.16,.62);
      ctx.save();ctx.setLineDash([8,9]);ctx.strokeStyle='rgba(35,88,216,.22)';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(-20,205);ctx.bezierCurveTo(110,148,200,285,445,188);ctx.stroke();ctx.restore();
      skyline();
    }else if(theme==='world'){
      circ(345,102,48,'#fff1bb');
      for(let i=0;i<5;i++)cloud((i*170-(distance*.14)%850+850)%850-100,62+(i%3)*68,.65,.55);
      for(let i=0;i<4;i++){
        const y=95+i*94;
        ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(120,y-32,310,y+32,420,y);
        ctx.strokeStyle='rgba(255,255,255,.27)';ctx.lineWidth=1.5;ctx.stroke();
      }
      mountains(['#91cf9c','#4baf9c']);
    }else if(theme==='ocean'){
      circ(326,96,46,'#fff4bd');
      for(let i=0;i<5;i++)cloud((i*147-(distance*.12)%735+735)%735-75,67+(i%2)*68,.7,.64);
      poly([[0,355],[63,332],[128,360],[186,344],[263,356],[320,327],[420,359],[420,FLOOR],[0,FLOOR]],'#6fc6b2');
      ctx.fillStyle='#189bbd';ctx.fillRect(0,389,W,FLOOR-389);
      for(let i=0;i<7;i++){
        const y=405+i*25;
        ctx.beginPath();for(let x=0;x<=W;x+=7){const v=y+Math.sin((x+distance*.55)/36+i)*4;if(x===0)ctx.moveTo(x,v);else ctx.lineTo(x,v)}
        ctx.strokeStyle='rgba(255,255,255,.27)';ctx.lineWidth=2;ctx.stroke();
      }
    }else if(theme==='forest'){
      circ(319,122,56,'#fff6b0');
      cloud(58,105,1.1,.31);cloud(220,70,.75,.4);
      mountains(['#a4d6a7','#72b894']);
      for(let i=-2;i<12;i++){
        const x=i*55-(distance*.21)%55;const h=75+(i%3)*23;
        poly([[x-25,FLOOR],[x,FLOOR-h],[x+25,FLOOR]],i%2?'#387d68':'#478a73');
        rr(x-3,FLOOR-15,6,17,1,'#754f42');
      }
    }else if(theme==='space'){
      stars();ringPlanet(315,126,43);
      circ(75,213,20,'#86a5dc');circ(80,208,7,'rgba(255,255,255,.13)');
      const neb=ctx.createRadialGradient(190,380,20,190,380,220);
      neb.addColorStop(0,'rgba(100,105,210,.42)');neb.addColorStop(1,'rgba(100,105,210,0)');
      ctx.fillStyle=neb;ctx.fillRect(0,165,W,385);
      poly([[0,FLOOR],[55,507],[108,529],[190,479],[289,525],[366,496],[420,521],[420,FLOOR]],'#273560');
    }else if(theme==='neon'){
      stars();
      const g=ctx.createLinearGradient(0,110,0,330);
      g.addColorStop(0,'#ffa86c');g.addColorStop(1,'#fa4bbd');
      circ(317,172,63,g);
      ctx.fillStyle='#2d104d';
      for(let i=0;i<6;i++)ctx.fillRect(245,188+i*11,145,3+i*.9);
      poly([[0,FLOOR],[85,421],[155,518],[242,397],[326,503],[420,432],[420,FLOOR]],'#321550');
      ctx.save();ctx.strokeStyle='rgba(36,247,238,.31)';ctx.lineWidth=1;
      for(let i=-4;i<11;i++){
        ctx.beginPath();ctx.moveTo(W/2,368);ctx.lineTo(i*88,552);ctx.stroke();
      }
      for(let i=0;i<10;i++){
        const y=369+i*i*2;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
      }
      ctx.restore();
    }
    // The top row is a tiny passport stamp, and the bottom stays a clear play boundary.
    ctx.save();ctx.globalAlpha=(theme==='space'||theme==='neon') ? .73 : .55;
    rr(14,14,120,25,7,'#101b3f');
    ctx.font='800 11px system-ui';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText('✈  FLAP BIRD',25,31);
    ctx.restore();
  }
  function obstaclePart(x,y,w,h,nearTop){
    if(h<=0)return;
    const t=themes[theme];
    ctx.save();
    if(theme==='neon'){ctx.shadowColor=t.trim;ctx.shadowBlur=13}
    rr(x,y,w,h,9,t.tube,t.edge,3);
    ctx.shadowBlur=0;
    if(theme==='postcard'){
      ctx.save();ctx.beginPath();ctx.rect(x+4,y+4,w-8,h-8);ctx.clip();
      for(let z=y-80;z<y+h+90;z+=31){
        ctx.strokeStyle='rgba(217,58,53,.23)';ctx.lineWidth=10;
        ctx.beginPath();ctx.moveTo(x,z+24);ctx.lineTo(x+w,z-25);ctx.stroke();
      }
      ctx.restore();
      rr(x+11,y+Math.max(14,Math.min(54,h/3)),w-22,4,2,'rgba(35,88,216,.4)');
    }else if(theme==='world'){
      for(let z=y+15;z<y+h-10;z+=35){
        ctx.strokeStyle='rgba(242,255,245,.38)';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.arc(x+w/2,z,14,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(x+10,z);ctx.lineTo(x+w-10,z);ctx.stroke();
      }
    }else if(theme==='ocean'){
      for(let z=y+19;z<y+h;z+=29){
        circ(x+20+10*Math.sin(z),z,6,'rgba(255,255,255,.2)');
        ctx.beginPath();ctx.arc(x+w/2,z,14,0,Math.PI);ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=2;ctx.stroke();
      }
    }else if(theme==='forest'){
      for(let z=y+11;z<y+h;z+=28){
        ctx.beginPath();ctx.moveTo(x+9,z);ctx.quadraticCurveTo(x+w/2,z+12,x+w-9,z);
        ctx.strokeStyle='rgba(20,83,55,.37)';ctx.lineWidth=3;ctx.stroke();
      }
    }else if(theme==='space'){
      for(let z=y+9;z<y+h;z+=28){rr(x+11,z,w-22,11,3,'rgba(153,196,255,.25)');}
      rr(x+w/2-6,y+7,12,Math.max(h-14,0),5,'rgba(140,215,255,.12)');
    }else if(theme==='neon'){
      for(let z=y+12;z<y+h;z+=27){
        ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(x+10,z,w-20,3);
      }
    }
    const capY=nearTop?y+h-23:y-2;
    rr(x-8,capY,w+16,25,7,t.edge,theme==='neon'?t.trim:'rgba(255,255,255,.85)',2);
    rr(x-3,capY+6,w+6,6,3,t.trim);
    ctx.restore();
  }
  function obstacles(){for(const p of pipes){obstaclePart(p.x,0,p.w,p.top,true);obstaclePart(p.x,p.bottom,p.w,FLOOR-p.bottom,false)}}
  function birdDraw(){
    const t=themes[theme];
    ctx.save();ctx.translate(BX,bird.y);ctx.rotate(bird.angle);
    ctx.shadowColor='rgba(16,27,63,.28)';ctx.shadowBlur=12;ctx.shadowOffsetY=5;
    // tail
    poly([[-11,-1],[-25,-12],[-23,11],[-10,12]],t.wing);
    ctx.beginPath();ctx.ellipse(0,0,17,15,0,0,Math.PI*2);ctx.fillStyle=t.bird;ctx.fill();
    ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
    ctx.beginPath();ctx.ellipse(-6,2+Math.sin(time*23)*3,12,7,-.37,0,Math.PI*2);
    ctx.fillStyle=t.wing;ctx.fill();
    poly([[12,1],[26,6],[12,11]],t.beak);
    circ(7,-6,5,'#fff');circ(8,-6,2.5,'#121a34');circ(9,-7,1,'#fff');
    circ(2,6,2.7,'rgba(255,255,255,.48)');
    if(theme==='postcard'){
      rr(-12,4,10,8,1,'#fff','rgba(35,88,216,.7)',1);
      ctx.strokeStyle='#d93a35';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-11,5);ctx.lineTo(-7,9);ctx.lineTo(-3,5);ctx.stroke();
    }else if(theme==='space'){
      ctx.beginPath();ctx.arc(0,-1,21,-2.6,-.32);
      ctx.strokeStyle='rgba(214,243,255,.8)';ctx.lineWidth=4;ctx.stroke();
      circ(-3,-21,4,'#ccefff');
    }else if(theme==='neon'){
      ctx.strokeStyle='#fff';ctx.lineWidth=2.1;ctx.beginPath();ctx.moveTo(-10,-12);ctx.lineTo(3,-16);ctx.stroke();
    }else if(theme==='forest'){
      ctx.strokeStyle='#287c4c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-11,-9);ctx.lineTo(-17,-16);ctx.stroke();
    }else if(theme==='ocean'){
      ctx.strokeStyle='#76dae4';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(-11,-9);ctx.lineTo(-21,-13);ctx.stroke();
    }else if(theme==='world'){
      ctx.strokeStyle='#185fa8';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-13,-7);ctx.lineTo(-19,-16);ctx.stroke();
    }
    ctx.restore();
    for(const p of particles){ctx.globalAlpha=Math.max(0,(p.life-p.age)/p.life);circ(p.x,p.y,2.3,theme==='neon'?'#fff':t.trim)}ctx.globalAlpha=1;
  }
  function ground(){
    const t=themes[theme];
    ctx.fillStyle=t.ground;ctx.fillRect(0,FLOOR,W,H-FLOOR);
    ctx.fillStyle=t.trim;ctx.fillRect(0,FLOOR,W,5);
    ctx.globalAlpha=.36;
    for(let i=-1;i<18;i++){
      const x=i*31-(distance*.6)%31;
      if(theme==='neon'){
        ctx.strokeStyle=t.trim;ctx.lineWidth=1.7;
        ctx.beginPath();ctx.moveTo(x,FLOOR+7);ctx.lineTo(x+16,H);ctx.stroke();
      }else if(theme==='space'){
        circ(x+11,FLOOR+16+(i%2)*9,4,'#d4cbfc');
      }else{
        rr(x+3,FLOOR+15,18,4,2,theme==='ocean'?'#fff':'#65788e');
      }
    }
    ctx.globalAlpha=1;
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    background();obstacles();ground();birdDraw();
    // Passport mileage sign is drawn into the world, independent of the HTML score panel.
    rr(W-84,14,70,26,8,'rgba(16,27,63,.78)');
    ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='900 16px system-ui';
    ctx.fillText(String(score).padStart(2,'0'),W-49,33);
  }
  themeButtons.forEach(btn=>btn.addEventListener('click',()=>{
    if(!themes[btn.dataset.fbTheme])return;
    theme=btn.dataset.fbTheme;
    themeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    $('destination').textContent='✦ '+themes[theme].name;
    reset();
  }));
  levelButtons.forEach(btn=>btn.addEventListener('click',()=>{
    if(!settings[btn.dataset.fbLevel])return;
    level=btn.dataset.fbLevel;
    levelButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    reset();
  }));
  startButton.addEventListener('click',()=>{begin();canvas.focus({preventScroll:true})});
  $('restart').addEventListener('click',()=>reset());
  pauseButton.addEventListener('click',()=>pause());
  soundButton.addEventListener('click',()=>{
    sound=!sound;soundButton.setAttribute('aria-pressed',String(sound));
    soundButton.textContent=sound?'♪ Som: sim':'♪ Som: não';
    if(sound)beep(650,.09);
  });
  canvas.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    if(state==='ready'||state==='over'){begin()}else if(state==='playing'){flap()}
  });
  document.addEventListener('keydown',e=>{
    if(!active()||e.altKey||e.ctrlKey||e.metaKey)return;
    const tag=e.target?.tagName;
    if(['INPUT','TEXTAREA','SELECT','BUTTON'].includes(tag)||e.target?.isContentEditable)return;
    if((e.code==='Space'||e.code==='ArrowUp')&&!e.repeat){
      e.preventDefault();if(state==='ready'||state==='over'||state==='paused')begin();else flap();
    }else if(e.code==='KeyP'&&!e.repeat){e.preventDefault();pause()}
  });
  selection.addEventListener('change',()=>{if(!active()&&state==='playing')pause()});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing')pause()});
  reset();
})();
