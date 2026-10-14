
/* Magnetic environments, drawn as fitted scientific diagrams rather than to scale.
   Dipole seed curves use r=L sin²(theta); wind compression/tails are illustrative.
   https://ccmc.gsfc.nasa.gov/static/files/Dipole.pdf */
(() => {
  'use strict';
  const presets=window.PJ_MAGNETIC_PROFILES;
  if(!presets)return;
  const fit=(n,a,b)=>Math.max(a,Math.min(b,n));
  const dimensions={mercury:[1.55,3.4,1.65],venus:[1.28,3.7,1.65],earth:[2.4,4.8,2.15],mars:[1.4,3.8,1.8],jupiter:[2.95,5.5,2.4],saturn:[2.6,5.1,2.25],uranus:[2.35,4.7,2.3],neptune:[2.5,4.9,2.3]};
  let last={visible:false,bodyId:null,mode:'overview',phase:0,layout:null,lastLayers:[],overviewWind:null};
  const jsonCopy=value=>JSON.parse(JSON.stringify(value));
  function profile(body){
    const known=presets[body.id];
    const real=known&&!body.custom&&!body._modelEdited&&(!state.systemMode||state.systemMode==='solar');
    if(real)return {...known,id:body.id,modeled:false,referenceId:body.id};
    const star=body.kind==='star';
    return {id:body.id,type:star?'heliosphere':'intrinsic',modeled:true,referenceId:null,tiltDeg:star?null:0,offset:0,offsetMagnitude:0,color:star?'#edaa43':'#92acbd',subsolarR:null,title:star?'Vento estelar hipotético':'Campo magnético hipotético',label:'Geometria de estudo · sem medição',summary:'Este cenário não tem um campo magnético medido. O desenho é uma hipótese didática, não uma previsão a partir da massa, da rotação ou da textura.',details:['O tipo de campo, sua intensidade e suas fronteiras não foram determinados.','Os controles do laboratório não medem a atividade de um dínamo nem o campo transportado pelo vento estelar.'],extentNote:'A geometria serve apenas para explorar a interação com um vento estelar. Dimensões, eixo e deslocamento não representam medidas deste mundo.',source:null};
  }
  function layout(body,W,H,zoom=84){
    W=Math.max(1,W);H=Math.max(1,H);
    const p=profile(body),sun=p.type==='heliosphere';
    const [nose,tail,height]=sun?[3.4,3.4,3.4]:(dimensions[p.referenceId]||[2.2,4.5,2.0]);
    const top=H>=400?78:Math.min(78,H*.25),bottom=H>=400?45:Math.min(45,H*.15),margin=Math.min(20,W*.05);
    const shock=.36;
    const maxR=Math.min((W-margin*2)/(nose+tail+shock),(H-top-bottom)/(2*(height+shock)));
    const scale=fit((zoom/84)**.45,.68,1.17);
    const r=Math.max(.1,maxR*Math.min(1,.86*scale));
    const leftSpan=(nose+shock)*r,rightSpan=tail*r;
    const cx=(W-leftSpan-rightSpan)/2+leftSpan,cy=top+(H-top-bottom)/2;
    const spin=(typeof rotationTurns==='function'?rotationTurns(body):state.day)*2*Math.PI+state.focusYaw;
    const axisAngle=(p.tiltDeg||0)*Math.PI/180*Math.cos(spin);
    return {cx,cy,r,W,H,nose,tail,height,shock,axisAngle,wind:{x:1,y:0},bounds:{left:cx-leftSpan,top:cy-(height+shock)*r,right:cx+rightSpan,bottom:cy+(height+shock)*r}};
  }
  function rgba(hex,alpha){const a=hex.replace('#','');return `rgba(${parseInt(a.slice(0,2),16)},${parseInt(a.slice(2,4),16)},${parseInt(a.slice(4,6),16)},${alpha})`;}
  function boundaryPath(l,extra=0){
    const path=new Path2D(),n=(l.nose+extra)*l.r,t=l.tail*l.r,h=(l.height+extra)*l.r;
    path.moveTo(-n,0);path.bezierCurveTo(-n,-h*.67,t*.05,-h,t,-h*.47);
    path.lineTo(t,h*.47);path.bezierCurveTo(t*.05,h,-n,h*.67,-n,0);path.closePath();return path;
  }
  function strokePath(path,color,width=1,dash=[]){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke(path);ctx.setLineDash([]);}
  function tailColor(l,color,alpha){const gradient=ctx.createLinearGradient(-l.nose*l.r,0,l.tail*l.r,0);gradient.addColorStop(0,rgba(color,alpha));gradient.addColorStop(.60,rgba(color,alpha));gradient.addColorStop(1,rgba(color,alpha*.18));return gradient;}
  function line(points,color,width=1){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
  function arrow(x,y,length,color){line([[x,y],[x+length,y]],color,1);line([[x+length-4,y-3],[x+length,y],[x+length-4,y+3]],color,1);}
  function wind(l,p,phase){
    const left=-l.nose*l.r-l.shock*l.r+5;
    for(let i=-1;i<=1;i++){
      const y=i*l.r*l.height*.72,start=-l.nose*l.r-l.shock*l.r+3;
      arrow(start,y,Math.max(5,l.r*.35),rgba('#d8bb79',.60));
      const t=((phase*.035+i*.29)%1+1)%1;
      ctx.fillStyle=rgba('#d8bb79',.65);ctx.beginPath();ctx.arc(left+t*l.r*.32,y,1.5,0,Math.PI*2);ctx.fill();
    }
  }
  function intrinsic(l,p,phase){
    const r=l.r,angle=l.axisAngle;
    // Only the dipole axis tilts; the solar-wind tail remains horizontal.
    const shift=p.offset?r*p.offset:(p.offsetMagnitude||0)*r*.75;
    const ox=p.offset?0:shift*Math.sin(angle+.6),oy=p.offset?-shift:-shift*Math.cos(angle+.6);
    ctx.save();ctx.clip(boundaryPath(l));
    for(const sign of [-1,1])for(const shell of [1.4,1.75,2.15,2.65]){
      const points=[];
      for(let i=0;i<=64;i++){
        const theta=.03+(Math.PI-.06)*i/64,radial=shell*r*Math.sin(theta)**2;
        const u=sign*radial*Math.sin(theta),v=radial*Math.cos(theta);
        let x=ox+u*Math.cos(angle)+v*Math.sin(angle),y=oy+u*Math.sin(angle)-v*Math.cos(angle);
        x=x<0?x*.70:x*1.35;
        points.push([x,y]);
      }
      line(points,rgba(p.color,.55),1.05);
    }
    // Open polar/tail structures stretch with the wind, independently of dipole tilt.
    for(const sign of [-1,1])for(let i=0;i<3;i++){
      const path=new Path2D(),dy=sign*r*(.8+i*.27);
      path.moveTo(ox,oy+sign*r*.45);path.bezierCurveTo(r*.45,dy*1.8,r*1.9,dy,l.tail*r,dy*.77);
      strokePath(path,tailColor(l,p.color,.36+i*.06),1);
    }
    if(p.referenceId==='jupiter'||p.referenceId==='saturn'){
      ctx.save();ctx.translate(ox,oy);ctx.rotate(angle);
      ctx.beginPath();ctx.ellipse(0,0,r*1.65,r*.28,0,0,Math.PI*2);ctx.strokeStyle=rgba(p.color,.31);ctx.lineWidth=4;ctx.stroke();ctx.restore();
    }
    ctx.restore();
    line([[0,-r*1.22],[0,r*1.22]],rgba('#c1cfdd',.28),.7);
    line([[ox-Math.sin(angle)*r*1.24,oy+Math.cos(angle)*r*1.24],[ox+Math.sin(angle)*r*1.24,oy-Math.cos(angle)*r*1.24]],rgba(p.color,.8),1.15);
  }
  function induced(l,p,phase){
    const r=l.r;
    ctx.save();ctx.clip(boundaryPath(l));
    for(const sign of [-1,1])for(let i=0;i<5;i++){
      const nose=r*(1.06+i*.12),h=r*(1.14+i*.14),path=new Path2D();
      path.moveTo(-l.nose*r,sign*h*.20);path.bezierCurveTo(-nose,sign*h*.34,-nose*.7,sign*h,l.tail*r,sign*h*.55);
      strokePath(path,tailColor(l,p.color,.32+i*.055),1);
    }
    ctx.restore();
    ctx.beginPath();ctx.arc(0,0,r*1.08,0,Math.PI*2);ctx.strokeStyle=rgba(p.color,.6);ctx.lineWidth=1;ctx.stroke();
  }
  function heliosphere(l,p,phase){
    const r=l.r,outer=Math.min(l.nose,l.height)*r;
    for(let branch=0;branch<7;branch++){
      const pts=[];
      for(let i=0;i<=70;i++){
        const distance=r*.6+(outer-r*.6)*i/70;
        const angle=branch*2*Math.PI/7-phase*.018-(distance/r)*.51;
        pts.push([Math.cos(angle)*distance,Math.sin(angle)*distance]);
      }
      line(pts,rgba(p.color,.48),1.1);
      const t=((phase*.04+branch/7)%1+1)%1,distance=r+(outer-r)*t,a=branch*2*Math.PI/7-phase*.018-(distance/r)*.51;
      ctx.fillStyle=rgba(p.color,.78);ctx.beginPath();ctx.arc(Math.cos(a)*distance,Math.sin(a)*distance,1.7,0,Math.PI*2);ctx.fill();
    }
    ctx.beginPath();ctx.arc(0,0,outer,0,Math.PI*2);ctx.strokeStyle=rgba(p.color,.38);ctx.setLineDash([4,5]);ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);
  }
  function front(l,p){
    if(p.type==='hybrid'){
      // Local crustal loops do not imply a global Martian dipole.
      for(const a of [1.10,1.47,1.82]){
        const x=Math.cos(a)*l.r*.88,y=Math.sin(a)*l.r*.84;
        ctx.beginPath();ctx.ellipse(x,y,l.r*.15,l.r*.28,a,Math.PI,2*Math.PI);ctx.strokeStyle=rgba(p.color,.75);ctx.lineWidth=1.25;ctx.stroke();
      }
    }
  }
  function draw(body,l,options={}){
    const p=profile(body),layer=options.layer||'back',phase=options.phase??state.day,overview=!!options.overview;
    if(layer==='back')last={visible:true,bodyId:body.id,mode:overview?'overview':'focus',phase,layout:jsonCopy(l),lastLayers:[],overviewWind:overview?{...l.wind}:null};
    last.lastLayers.push(layer);
    ctx.save();ctx.globalAlpha=options.alpha??1;ctx.translate(l.cx,l.cy);ctx.rotate(Math.atan2(l.wind.y,l.wind.x));
    if(layer==='front')front(l,p);
    else if(p.type==='heliosphere')heliosphere(l,p,phase);
    else{
      const path=boundaryPath(l);ctx.fillStyle=rgba(p.color,.045);ctx.fill(path);
      const edge=new Path2D(),n0=l.nose*l.r,t0=l.tail*l.r,h0=l.height*l.r;
      edge.moveTo(t0,-h0*.47);edge.bezierCurveTo(t0*.05,-h0,-n0,-h0*.67,-n0,0);edge.bezierCurveTo(-n0,h0*.67,t0*.05,h0,t0,h0*.47);
      strokePath(edge,tailColor(l,'#a4bfd4',.47),1);
      // A bow shock is distinct from the magnetopause / induced boundary.
      const shock=new Path2D(),n=(l.nose+l.shock)*l.r,h=(l.height+l.shock)*l.r;
      shock.moveTo(l.r*.3,-h*.84);shock.bezierCurveTo(-n*.85,-h*.75,-n,-h*.45,-n,0);shock.bezierCurveTo(-n,h*.45,-n*.85,h*.75,l.r*.3,h*.84);
      strokePath(shock,rgba('#d5b97c',.55),1,[4,4]);
      if(p.type==='intrinsic')intrinsic(l,p,phase);else induced(l,p,phase);
      if(!overview)wind(l,p,phase);
    }
    ctx.restore();
  }
  function overview(body,cx,cy,r,W,H,alpha=.35){
    const star=project3DNew(0,0,0,W,H),dx=cx-star.x,dy=cy-star.y,len=Math.hypot(dx,dy);
    const p=profile(body),dims=dimensions[p.referenceId]||[2.2,4.5,2];
    const l={cx,cy,r:Math.max(3,r),W,H,nose:dims[0],tail:dims[1],height:dims[2],shock:.36,axisAngle:(p.tiltDeg||0)*Math.PI/180,wind:len>.01?{x:dx/len,y:dy/len}:{x:1,y:0},bounds:{left:0,top:0,right:W,bottom:H}};
    draw(body,l,{overview:true,alpha,layer:'back'});
  }
  function beginFrame(body,visible,mode){
    last={visible,bodyId:body?.id||null,mode,phase:state.day,layout:null,lastLayers:[],overviewWind:null};
    updateCaption(body,visible&&mode==='focus');
  }
  let caption=null,details=null,metadataKey='';
  const make=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text)e.textContent=text;return e;};
  function updateCaption(body,visible){
    if(!caption){caption=make('p','');caption.id='mg-diagram-caption';document.querySelector('.legendbar')?.append(caption);}
    caption.hidden=!visible;
    document.querySelector('.legendbar')?.classList.toggle('mg-view',visible);
    if(!visible||!body)return;
    const p=profile(body),key=p.id+'|'+p.type+'|'+p.modeled;
    if(caption.dataset.key===key)return;
    caption.dataset.key=key;caption.replaceChildren();
    const items=p.type==='heliosphere'?[['field','Campo no vento estelar'],['boundary','Limite ilustrativo da heliosfera']]:[['field',p.type==='intrinsic'?'Linhas de campo':p.type==='hybrid'?'Campo induzido + crosta':'Campo induzido'],['boundary',p.type==='intrinsic'?'Magnetopausa':'Barreira induzida'],['shock','Onda de choque']];
    for(const [key,label]of items){const item=make('span','mg-legend-item');const swatch=make('span','mg-legend-key');swatch.dataset.key=key;swatch.style.borderTopColor=key==='field'?p.color:'';item.append(swatch,make('span','',label));caption.append(item);}
    caption.append(make('span','mg-legend-note',p.modeled?'Hipótese didática · geometria sem medição.':p.type==='heliosphere'?'Escala esquemática · expansão do vento solar.':'Escala esquemática · cauda oposta ao vento solar.'));
  }
  function updateInfo(){
    const body=currentBody();if(!body)return;
    const p=profile(body),key=[body.id,p.modeled,p.type,body.name].join('|');
    if(!details){details=make('details','mg-details');const title=document.querySelector('.selected-title');title?.after(details);}
    const stat=[...document.querySelectorAll('#statsGrid .stat')].find(e=>e.querySelector('.k')?.textContent==='Magnetismo');
    if(stat)stat.querySelector('.v').textContent=p.modeled?'Hipótese sem medição':p.type==='intrinsic'?'Campo interno':p.type==='heliosphere'?'Vento estelar':p.type==='hybrid'?'Induzido + crosta':'Campo induzido';
    details.dataset.fieldType=p.type;details.dataset.bodyId=body.id;
    if(metadataKey===key)return;
    metadataKey=key;const wasOpen=details.open;details.replaceChildren();details.append(make('summary','',p.title));
    const content=make('div','mg-details-body');content.append(make('p','',p.summary));
    if(!p.modeled&&p.type==='intrinsic'){
      const dl=make('dl','mg-parameters');
      for(const [label,value]of [['Inclinação do dipolo',p.tiltDeg===0?'≈0°':p.tiltDeg.toLocaleString('pt-BR')+'°'],['Deslocamento do centro',p.offsetMagnitude?('≈'+p.offsetMagnitude.toLocaleString('pt-BR',{maximumFractionDigits:2})+' R'):'Não destacado no esquema']]){const pair=make('div');pair.append(make('dt','',label),make('dd','',value));dl.append(pair);}
      content.append(dl);
    }
    const facts=make('ul');for(const fact of p.details||[])facts.append(make('li','',fact));content.append(facts,make('p','mg-extent',p.extentNote));
    if(p.offsetMagnitude&&!p.offset)content.append(make('p','mg-extent','O deslocamento está projetado de forma ilustrativa; sua direção no desenho não é uma medida do vetor tridimensional.'));
    if(p.source){const link=make('a','mg-source',p.source.title);link.href=p.source.url;link.target='_blank';link.rel='noopener noreferrer';content.append(link);}
    details.append(content);details.open=wasOpen;
  }
  const previousInfoPT=updateInfoPanelPT,previousInfo=updateInfoPanel;
  updateInfoPanelPT=function(...args){const result=previousInfoPT.apply(this,args);updateInfo();return result;};
  updateInfoPanel=function(...args){const result=previousInfo.apply(this,args);updateInfo();return result;};
  window.PJMagnetosphere=Object.freeze({profile,layout,draw,overview,beginFrame,diagnostics:()=>jsonCopy({...last,moons:state._focusMoonBounds||[]})});
  drawMagnetosphereShape=function(body,cx,cy,rw,rh,alpha){overview(body,cx,cy,rw/2.4,canvas.clientWidth,canvas.clientHeight,alpha);};
  updateInfo();updateCaption(currentBody(),state.showMagnetosphere&&state.mode==='focus');
})();

