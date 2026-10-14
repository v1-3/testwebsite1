
function rotationTurns(body){if(body.id==='earth')return state.earthLocalHour/24;if(body.rotationHours===0)return 0;return state.day/Math.max(.0001,Math.abs(body.rotationHours??24)/24)*(body.rotationHours>=0?1:-1);}
// Focus sizes use a deliberate visual scale so small screens and zoom remain usable.
renderFocus=function(W,H){
  drawBackground(W,H);const body=currentBody();if(!body||W<1||H<1)return;
  const magnetic=state.showMagnetosphere&&window.PJMagnetosphere;
  if(window.PJMagnetosphere){PJMagnetosphere.beginFrame(body,Boolean(magnetic),'focus');W=canvas.clientWidth;H=canvas.clientHeight;}
  const magneticLayout=magnetic?PJMagnetosphere.layout(body,W,H,state.zoom):null;
  const cx=magneticLayout?.cx??W*.5,cy=magneticLayout?.cy??H*.53,r=magneticLayout?.r??Math.min(170,W*.30,H*.33)*(state.zoom/84)**.65;
  state._focusRadius=r;
  const moonData=[];
  if(state.showMoons&&body.moons?.length){
    const maxDistance=Math.max(...body.moons.map(m=>m.distanceRadii));
    const moonMargin=state.showLabels?42:20;
    const orbitLimit=Math.max(0,Math.min(cx-moonMargin,W-cx-moonMargin));
    const outer=Math.max(r*1.20,Math.min(orbitLimit,Math.min(W*.45,H*.67)*(state.zoom/84)**.15));
    body.moons.forEach((moon,i)=>{
      const angle=state.day/Math.max(.0001,Math.abs(moon.orbitalDays||4))*2*Math.PI*(moon.orbitalDays<0?-1:1)+i*.8;
      const orbit=r*1.20+(outer-r*1.20)*Math.sqrt(moon.distanceRadii/maxDistance),mx=cx+Math.cos(angle)*orbit,my=cy+Math.sin(angle)*orbit*.34;
      if(state.showOrbits){ctx.strokeStyle='rgba(210,227,255,.15)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(cx,cy,orbit,orbit*.34,0,0,Math.PI*2);ctx.stroke();}
      moonData.push({moon,mx,my,front:Math.sin(angle)>=0});
    });
  }
  ctx.save();ctx.font='11px system-ui';
  state._focusMoonBounds=moonData.map(({moon,mx,my})=>({name:moon.name,x:mx,y:my,r:clamp(moon.radiusKm/420,3,13),labelHalfWidth:ctx.measureText(moon.name).width/2}));
  ctx.restore();
  const drawMoon=({moon,mx,my})=>{
    const mr=clamp(moon.radiusKm/420,3,13),tex=textureImages[moon.texture||'moon'];ctx.save();ctx.beginPath();ctx.arc(mx,my,mr,0,Math.PI*2);ctx.clip();
    if(tex)ctx.drawImage(tex,mx-mr,my-mr,mr*2,mr*2);else{ctx.fillStyle=moon.color||'#ddd';ctx.fillRect(mx-mr,my-mr,mr*2,mr*2);}ctx.restore();
    ctx.strokeStyle='rgba(220,238,255,.35)';ctx.beginPath();ctx.arc(mx,my,mr,0,Math.PI*2);ctx.stroke();
    if(state.showLabels){ctx.fillStyle='#dfefff';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(moon.name,mx,my+mr+13);}
  };
  const ring=front=>{ctx.save();ctx.translate(cx,cy);ctx.rotate(-.45);for(const [size,width,alpha]of[[1.55,Math.max(4,r*.12),.48],[1.28,Math.max(2,r*.045),.60]]){ctx.strokeStyle='rgba(233,215,180,'+alpha+')';ctx.lineWidth=width;ctx.beginPath();ctx.ellipse(0,0,r*size,r*(size*.30),0,front?0:Math.PI,front?Math.PI:2*Math.PI);ctx.stroke();}ctx.restore();};
  if(magnetic)PJMagnetosphere.draw(body,magneticLayout,{layer:'back',phase:state.day});
  moonData.filter(m=>!m.front).forEach(drawMoon);
  if(body.id==='saturn')ring(false);
  drawAtmosphereGlow(body,cx,cy,r);ctx.drawImage(renderSphere(body,300),cx-r,cy-r,r*2,r*2);
  if(magnetic)PJMagnetosphere.draw(body,magneticLayout,{layer:'front',phase:state.day});
  if(body.id==='saturn')ring(true);
  moonData.filter(m=>m.front).forEach(drawMoon);
  const x=10,y=12,width=Math.min(300,W-20),star=body.id==='sun';ctx.textAlign='left';ctx.fillStyle='rgba(8,14,24,.82)';ctx.strokeStyle='rgba(122,175,245,.22)';ctx.lineWidth=1;ctx.beginPath();roundRect(ctx,x,y,width,star?48:66,10);ctx.fill();ctx.stroke();
  ctx.fillStyle='#ecf4ff';ctx.font='700 13px system-ui';ctx.fillText((magnetic?'Ambiente magnético · ':'Aproximação · ')+translatedName(body),x+10,y+20,width-20);
  ctx.font='11px system-ui';ctx.fillStyle='#b3c4de';
  if(magnetic){const p=PJMagnetosphere.profile(body);ctx.fillText(p.modeled?'Hipótese didática; campo não medido.':p.type==='intrinsic'?'Campo interno · eixo magnético independente':p.type==='hybrid'?'Campo induzido e regiões crustais':p.type==='induced'?'Campo induzido · sem dipolo interno':'Espiral de Parker · vento solar',x+10,y+38,width-20);if(!star)ctx.fillText('Vento solar → cauda no lado oposto',x+10,y+55,width-20);}
  else if(star)ctx.fillText('Fotosfera: '+temperatureBoth(body.avgK),x+10,y+38);
  else{ctx.fillText('Dia '+temperatureC(body.dayK)+' · Noite '+temperatureC(body.nightK),x+10,y+38);ctx.fillText(['gas','icegiant'].includes(body.kind)?'Sem superfície sólida observável':'Água: '+translatedWater(body.waterState),x+10,y+55);}
};
const resetFrameClock=()=>{loop.last=null;loop.frameTime=null;};
document.addEventListener('visibilitychange',resetFrameClock);
window.pjSolarTest=Object.freeze({
  snapshot(){return deepCopy({day:state.day,timeSpeed:state.timeSpeed,paused:state.paused,visible:isSimulationVisible(),systemMode:state.systemMode,selectedId:state.selectedId,mode:state.mode,zoom:state.zoom,earthLocalHour:state.earthLocalHour,earthCycleEnabled:state.earthCycleEnabled,focusRadius:state._focusRadius||null,canvas:{width:canvas.width,height:canvas.height,clientWidth:canvas.clientWidth,clientHeight:canvas.clientHeight,dpr:devicePixelRatio},bodies:state.bodies.map(b=>({id:b.id,name:translatedName(b),kind:b.kind,massEarth:b.massEarth,radiusKm:b.radiusKm,distanceAU:b.distanceAU,orbitalDays:b.orbitalDays,rotationHours:b.rotationHours,angle:b.angle,gravity:b.gravity,density:b.density,equilibriumK:b.equilibriumK,dayK:b.dayK,nightK:b.nightK,avgK:b.avgK,solarFlux:b.solarFlux,luminosity:b.luminosity,teff:b.teff,custom:!!b.custom})),textureKeys:Object.keys(texturePixels),cacheKey:focusCache.key});},
  step(seconds){if(!Number.isFinite(seconds)||seconds<0||seconds>60)throw new RangeError('seconds must be between 0 and 60');if(!state.paused)updateSimulation(seconds);render();return this.snapshot();},
  select(id,mode='focus'){if(!state.bodies.some(b=>b.id===id))throw new Error('Unknown body');state.selectedId=id;document.getElementById('objectSelect').value=id;syncEditorsFromSelection();updateInfoPanel();setMode(mode);render();return this.snapshot();},
  textureCoordinate(screenY){return clamp(.5+Math.asin(clamp(screenY,-1,1))/Math.PI,0,1);}
});
