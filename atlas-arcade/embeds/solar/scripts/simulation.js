

const KIND_INFO = {
  star:      {label:'Star', texture:'sun', color:'#ffd36f', albedo:0.30, greenhouse:0, atmosphere:0, water:0, radiusRule:(m)=>696340*Math.pow(Math.max(0.5,m/333000),0.74)},
  rocky:     {label:'Rocky planet', texture:'mercury', color:'#c7b29f', albedo:0.18, greenhouse:8, atmosphere:0.3, water:0.05, radiusRule:(m)=>6371*Math.pow(Math.max(0.05,m),0.27)},
  ocean:     {label:'Ocean world', texture:'earth', color:'#73b9ff', albedo:0.30, greenhouse:18, atmosphere:1.2, water:0.85, radiusRule:(m)=>6371*Math.pow(Math.max(0.05,m),0.28)},
  desert:    {label:'Desert world', texture:'mars', color:'#d89b6c', albedo:0.22, greenhouse:5, atmosphere:0.5, water:0.02, radiusRule:(m)=>6100*Math.pow(Math.max(0.05,m),0.27)},
  ice:       {label:'Ice world', texture:'moon', color:'#cfe7ff', albedo:0.50, greenhouse:1, atmosphere:0.15, water:0.95, radiusRule:(m)=>5800*Math.pow(Math.max(0.05,m),0.30)},
  gas:       {label:'Gas giant', texture:'jupiter', color:'#d8b38d', albedo:0.45, greenhouse:120, atmosphere:60, water:0.0, radiusRule:(m)=>69911*Math.pow(Math.max(1,m/317.8),0.06)},
  icegiant:  {label:'Ice giant', texture:'neptune', color:'#6fa6ff', albedo:0.40, greenhouse:55, atmosphere:30, water:0.2, radiusRule:(m)=>25000*Math.pow(Math.max(1,m/14.5),0.10)}
};
const DEFAULT_BODIES = [
  {id:'sun',name:'Sun',kind:'star',texture:'sun',massEarth:333000,radiusKm:696340,distanceAU:0,orbitalDays:0,rotationHours:609.1,albedo:0.30,greenhouse:0,atmosphere:0,water:0,luminosity:1,color:'#ffcf67',axialTilt:7.25,layers:[{name:'Core',fraction:.28,color:'#fff0a6'},{name:'Radiative zone',fraction:.65,color:'#ffba54'},{name:'Convective zone',fraction:.86,color:'#ff8d38'},{name:'Photosphere / corona',fraction:1,color:'#ffe2a8'}],composition:[['Hydrogen',74],['Helium',24],['Heavier elements',2]],facts:['The Sun contains about 99.8% of the Solar System\'s mass.','Its luminosity sets the habitable-zone distances for the system.','The visible surface is the photosphere; the outer corona extends far beyond it.'],moons:[]},
  {id:'mercury',name:'Mercury',kind:'rocky',texture:'mercury',massEarth:0.0553,radiusKm:2439.7,distanceAU:0.387,orbitalDays:87.97,rotationHours:1407.6,albedo:0.119,greenhouse:0,atmosphere:0.01,water:0.0,color:'#c9b49e',axialTilt:0.03,layers:[{name:'Crust',fraction:.18,color:'#9f9186'},{name:'Mantle',fraction:.45,color:'#867465'},{name:'Large iron core',fraction:1,color:'#d2a15d'}],composition:[['Iron core',60],['Silicate rock',39],['Volatiles',1]],facts:['Mercury has the largest core fraction of any major planet.','A solar day on Mercury lasts about 176 Earth days.','It has a weak but real global magnetic field.'],moons:[]},
  {id:'venus',name:'Venus',kind:'rocky',texture:'venus',massEarth:0.815,radiusKm:6051.8,distanceAU:0.723,orbitalDays:224.7,rotationHours:-5832.5,albedo:0.75,greenhouse:465,atmosphere:92,water:0.0,color:'#d3b08d',axialTilt:177.4,layers:[{name:'Crust',fraction:.20,color:'#ae8e67'},{name:'Mantle',fraction:.72,color:'#8e654a'},{name:'Metallic core',fraction:1,color:'#d7a05c'}],composition:[['Carbon dioxide atmosphere',96],['Nitrogen atmosphere',3],['Surface rock and metal',1]],facts:['Venus is the hottest planet because of its extreme greenhouse effect.','It rotates retrograde, so the Sun appears to rise in the west.','Its atmosphere is thick enough to crush most spacecraft quickly.'],moons:[]},
  {id:'earth',name:'Earth',kind:'ocean',texture:'earth',massEarth:1,radiusKm:6371,distanceAU:1,orbitalDays:365.25,rotationHours:23.93,albedo:0.306,greenhouse:33,atmosphere:1,water:0.71,color:'#7cb9ff',axialTilt:23.44,layers:[{name:'Crust',fraction:.16,color:'#679f65'},{name:'Upper mantle',fraction:.45,color:'#b48f63'},{name:'Lower mantle',fraction:.74,color:'#a06b43'},{name:'Outer core',fraction:.88,color:'#f2b25b'},{name:'Inner core',fraction:1,color:'#fff0ae'}],composition:[['Surface water',71],['Silicate rock',28],['Metallic core',1]],facts:['Earth is the only known world with surface oceans of liquid water and life.','Its magnetic field helps protect the atmosphere from solar-wind erosion.','At night the simulation uses a rebuilt offline texture of Earth\'s surface and city lights.'],moons:[{name:'Moon',radiusKm:1737,distanceRadii:30.2,orbitalDays:27.3,texture:'moon',color:'#d9d5ce'}]},
  {id:'mars',name:'Mars',kind:'desert',texture:'mars',massEarth:0.107,radiusKm:3389.5,distanceAU:1.524,orbitalDays:687,rotationHours:24.62,albedo:0.25,greenhouse:5,atmosphere:0.006,water:0.02,color:'#d69063',axialTilt:25.19,layers:[{name:'Crust',fraction:.16,color:'#a46a4b'},{name:'Mantle',fraction:.74,color:'#7f4c37'},{name:'Core',fraction:1,color:'#d18f50'}],composition:[['Basaltic rock',67],['Iron oxides',17],['Ice / frozen volatiles',16]],facts:['Mars hosts giant volcanoes and the vast canyon system Valles Marineris.','It once had flowing surface water and still stores water as ice.','Its global magnetic field faded long ago, leaving only crustal remnants.'],moons:[{name:'Phobos',radiusKm:11.1,distanceRadii:2.76,orbitalDays:0.319,texture:'moon',color:'#a8a39d'},{name:'Deimos',radiusKm:6.2,distanceRadii:6.92,orbitalDays:1.263,texture:'moon',color:'#b4aea6'}]},
  {id:'jupiter',name:'Jupiter',kind:'gas',texture:'jupiter',massEarth:317.8,radiusKm:69911,distanceAU:5.203,orbitalDays:4332.6,rotationHours:9.93,albedo:0.50,greenhouse:120,atmosphere:100,water:0,color:'#d7b083',axialTilt:3.13,layers:[{name:'Upper clouds',fraction:.18,color:'#dec49d'},{name:'Molecular hydrogen',fraction:.58,color:'#c9a579'},{name:'Metallic hydrogen',fraction:.88,color:'#a66d4b'},{name:'Dense core',fraction:1,color:'#f3c572'}],composition:[['Hydrogen',90],['Helium',10],['Trace compounds',1]],facts:['Jupiter has the strongest planetary magnetic field in the Solar System.','Its Great Red Spot is a gigantic storm larger than Earth.','Deep inside, hydrogen may exist in a metallic state.'],moons:[{name:'Io',radiusKm:1821,distanceRadii:5.9,orbitalDays:1.77,texture:'moon',color:'#f2df7d'},{name:'Europa',radiusKm:1560,distanceRadii:9.4,orbitalDays:3.55,texture:'moon',color:'#d8d9db'},{name:'Ganymede',radiusKm:2634,distanceRadii:15.0,orbitalDays:7.15,texture:'moon',color:'#b9a38d'},{name:'Callisto',radiusKm:2410,distanceRadii:26.4,orbitalDays:16.69,texture:'moon',color:'#8d8377'}]},
  {id:'saturn',name:'Saturn',kind:'gas',texture:'saturn',massEarth:95.2,radiusKm:58232,distanceAU:9.537,orbitalDays:10759,rotationHours:10.7,albedo:0.47,greenhouse:90,atmosphere:80,water:0,color:'#d9c08d',axialTilt:26.73,layers:[{name:'Cloud tops',fraction:.20,color:'#e1c98d'},{name:'Molecular hydrogen',fraction:.60,color:'#cdb17d'},{name:'Metallic interior',fraction:.88,color:'#a97a58'},{name:'Core',fraction:1,color:'#f0c56f'}],composition:[['Hydrogen',96],['Helium',3],['Other compounds',1]],facts:['Saturn\'s density is low enough that it would float in a giant ocean.','Its rings are made mostly of water ice and spread across a huge distance.','Like Jupiter, Saturn probably has metallic hydrogen deep inside.'],moons:[{name:'Titan',radiusKm:2575,distanceRadii:20.3,orbitalDays:15.95,texture:'moon',color:'#d2ae71'},{name:'Enceladus',radiusKm:252,distanceRadii:4.1,orbitalDays:1.37,texture:'moon',color:'#eff6ff'}]},
  {id:'uranus',name:'Uranus',kind:'icegiant',texture:'uranus',massEarth:14.5,radiusKm:25362,distanceAU:19.191,orbitalDays:30688,rotationHours:-17.24,albedo:0.51,greenhouse:25,atmosphere:30,water:0.15,color:'#8ccff1',axialTilt:97.77,layers:[{name:'H/He atmosphere',fraction:.18,color:'#b4f2ff'},{name:'Water-ammonia mantle',fraction:.78,color:'#7ac8df'},{name:'Rocky core',fraction:1,color:'#d7b468'}],composition:[['Hydrogen + helium',73],['Water / ammonia / methane ices',25],['Rocky core',2]],facts:['Uranus rotates on its side, with an axial tilt of about 98°.','It is often called an ice giant because of its deep volatile-rich mantle.','Its magnetic field is strongly tilted and offset from the center.'],moons:[{name:'Titania',radiusKm:789,distanceRadii:17.1,orbitalDays:8.71,texture:'moon',color:'#cfc9bf'},{name:'Miranda',radiusKm:236,distanceRadii:5.1,orbitalDays:1.41,texture:'moon',color:'#ece5d8'}]},
  {id:'neptune',name:'Neptune',kind:'icegiant',texture:'neptune',massEarth:17.1,radiusKm:24622,distanceAU:30.07,orbitalDays:60182,rotationHours:16.11,albedo:0.41,greenhouse:30,atmosphere:35,water:0.15,color:'#709dff',axialTilt:28.32,layers:[{name:'Upper atmosphere',fraction:.20,color:'#8ab8ff'},{name:'Ice-rich mantle',fraction:.80,color:'#4c7fe1'},{name:'Core',fraction:1,color:'#d7b26d'}],composition:[['Hydrogen + helium',80],['Water / methane / ammonia ices',18],['Rocky core',2]],facts:['Neptune has supersonic winds and a deep blue color from methane.','Like Uranus, it is an ice giant with a volatile-rich interior.','Triton, its largest moon, likely came from the Kuiper Belt.'],moons:[{name:'Triton',radiusKm:1353,distanceRadii:14.3,orbitalDays:-5.88,texture:'moon',color:'#cdd6db'}]}
];
const textureImages = {};
const texturePixels = {};
const state = {
  bodies: [], paused: false, mode: 'overview', day: 0, timeSpeed: 40, selectedId: 'earth',
  compressedScale: true, showOrbits: true, showLabels: true, showHabitable: true,
  showMagnetosphere: true, showTemperature: false, showCutaway: false, showAtmosphereSlice: true,
  showMoons: true, showNightLights: true, zoom: 84, tilt: 46, yaw: -0.3, focusYaw: 0, focusPitch: 0.1,
  dragging: false, dragMode: 'overview', lastX: 0, lastY: 0, starField: []
};
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
const tempCanvas = document.getElementById('tempCanvas');
const tempCtx = tempCanvas.getContext('2d');
const cutCanvas = document.getElementById('cutCanvas');
const cutCtx = cutCanvas.getContext('2d');
const loadingEl = document.getElementById('loading');
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
function lerp(a,b,t){ return a + (b-a)*t; }
function smoothstep(a,b,x){ const t = clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); }
function mixColor(c1,c2,t){ return [Math.round(lerp(c1[0],c2[0],t)),Math.round(lerp(c1[1],c2[1],t)),Math.round(lerp(c1[2],c2[2],t))]; }
function rgbArr(hex){ const h=hex.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function deepCopy(v){ return JSON.parse(JSON.stringify(v)); }
function fmt(n,d=2){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:d,minimumFractionDigits:d}); }
function fmtSigned(n,d=1){ const sign=n>0?'+':''; return sign+fmt(n,d); }
function seededRandom(seed){ const x=Math.sin(seed)*10000; return x-Math.floor(x); }
function generateStars(){
  state.starField = [];
  for(let i=0;i<480;i++) state.starField.push({x:seededRandom(i*91.3),y:seededRandom(i*17.1+3.1),r:0.3+seededRandom(i*4.7)*2.2,a:0.15+seededRandom(i*9.8)*0.85,c:seededRandom(i*11.7)>0.85?'rgba(160,210,255,':'rgba(255,255,255,'});
}
function compositionFromKind(kind, water=0.2){
  const map = {
    star:[['Hydrogen',74],['Helium',24],['Heavier elements',2]], rocky:[['Silicate rock',57],['Metal',38],['Water / ice',Math.round(water*100)],['Atmosphere',5]],
    ocean:[['Surface water',Math.round(water*100)],['Rock',Math.max(0,Math.round(85-water*100))],['Metal',10],['Atmosphere',5]], desert:[['Rock',70],['Dust / regolith',20],['Ice / water',Math.round(water*100)],['Atmosphere',10]],
    ice:[['Ice',Math.round(Math.max(50,water*100))],['Rock',30],['Metal',10],['Atmosphere',10]], gas:[['Hydrogen',89],['Helium',10],['Other compounds',1]], icegiant:[['Hydrogen + helium',74],['Water / ammonia / methane',24],['Rocky core',2]]
  };
  return deepCopy(map[kind] || map.rocky);
}
function layersFromKind(kind){
  const map = {
    star:[{name:'Core',fraction:.30,color:'#fff0a6'},{name:'Radiative zone',fraction:.66,color:'#ffba54'},{name:'Convective zone',fraction:.86,color:'#ff9135'},{name:'Photosphere / corona',fraction:1,color:'#ffe2a8'}],
    rocky:[{name:'Crust',fraction:.18,color:'#8f877d'},{name:'Mantle',fraction:.74,color:'#9c6b48'},{name:'Core',fraction:1,color:'#f1b55e'}],
    ocean:[{name:'Ocean / crust',fraction:.22,color:'#67a4ff'},{name:'Mantle',fraction:.74,color:'#967555'},{name:'Core',fraction:1,color:'#f5c165'}],
    desert:[{name:'Crust',fraction:.18,color:'#be8a60'},{name:'Mantle',fraction:.74,color:'#8d5f44'},{name:'Core',fraction:1,color:'#efb865'}],
    ice:[{name:'Ice shell',fraction:.25,color:'#dff4ff'},{name:'Ice-rock mantle',fraction:.82,color:'#7abed5'},{name:'Core',fraction:1,color:'#d1a562'}],
    gas:[{name:'Cloud tops',fraction:.22,color:'#e2c194'},{name:'Molecular envelope',fraction:.62,color:'#c59d72'},{name:'Metallic interior',fraction:.88,color:'#a77254'},{name:'Core',fraction:1,color:'#efc56e'}],
    icegiant:[{name:'Atmosphere',fraction:.18,color:'#96d8ff'},{name:'Ice-rich mantle',fraction:.82,color:'#4d84eb'},{name:'Core',fraction:1,color:'#d9b46e'}]
  };
  return deepCopy(map[kind] || map.rocky);
}
function factsFromKind(kind){
  const map = {
    rocky:['Rocky worlds can show large temperature swings if their atmosphere is thin.','Increasing mass raises gravity and often increases radius more slowly than mass.','Distance from the Sun strongly changes the equilibrium temperature.'],
    ocean:['Ocean worlds buffer temperatures because water stores heat efficiently.','If temperatures fall below freezing, surface water turns to global ice.','A thicker atmosphere amplifies greenhouse warming and narrows day/night swings.'],
    desert:['Desert worlds can be warm by day and cold at night.','Low water content reduces cloud formation and surface heat buffering.','A slow rotation rate makes the day side hotter and the night side colder.'],
    ice:['Ice worlds usually reflect more light because of their bright surfaces.','Far from the Sun they remain deeply frozen unless greenhouse warming is extreme.','High albedo reduces absorbed solar energy and lowers equilibrium temperature.'],
    gas:['Gas giants have no solid surface but they do have visible cloud decks.','Stronger internal heat can help drive storms and atmospheric bands.','Their large magnetospheres can trap charged particles over huge volumes.'],
    icegiant:['Ice giants likely have deep mantles rich in water, methane, and ammonia.','Their magnetic fields are often tilted and offset.','Even far from the Sun they can retain vigorous weather systems.'],
    star:['A star defines the habitable zone through its luminosity.','More luminous stars shift the habitable zone outward.','The heliosphere shields the planets from part of the interstellar environment.']
  };
  return deepCopy(map[kind] || map.rocky);
}
function classifyMagnetosphere(body){
  if(body.kind==='star') return {type:'heliosphere',strength:1,color:'rgba(255,170,100,.55)'};
  const spin = Math.max(0.1, 24 / Math.max(2, Math.abs(body.rotationHours || 24)));
  const metalBias = /rocky|desert|ocean/.test(body.kind) ? 1 : (body.kind==='icegiant' ? .7 : .5);
  const strength = clamp((body.massEarth / Math.max(0.15, body.radiusKm/6371)) * spin * metalBias, 0.02, 8);
  const type = body.kind==='gas' ? 'giant' : body.kind==='icegiant' ? 'tilted' : strength > 0.25 ? 'earth' : 'small';
  return {type, strength, color: type==='giant' ? 'rgba(115,189,255,.38)' : type==='tilted' ? 'rgba(140,220,255,.40)' : 'rgba(110,196,255,.45)'};
}
function initBodies(){
  state.bodies = deepCopy(DEFAULT_BODIES).map((b,i)=>{ b.default = deepCopy(b); b.angle = i===0?0:seededRandom(i*7.77)*Math.PI*2; return computeDerived(b); });
}
function computeRadius(kind, massEarth){ const info = KIND_INFO[kind] || KIND_INFO.rocky; return info.radiusRule(massEarth); }
function computeDerived(body){
  const preset = KIND_INFO[body.kind] || KIND_INFO.rocky;
  if(!body.texture) body.texture = preset.texture;
  if(body.recomputeRadius || body.custom){ body.radiusKm = computeRadius(body.kind, body.massEarth); }
  const albedo = body.albedo ?? preset.albedo;
  body.composition = body.composition || compositionFromKind(body.kind, body.water || preset.water || 0);
  body.layers = body.layers || layersFromKind(body.kind);
  body.facts = body.facts || factsFromKind(body.kind);
  if(!body.moons) body.moons = [];
  const atmMultiplier = Math.max(0, body.atmosphere ?? preset.atmosphere);
  if(body.kind !== 'star') {
    body.gravity = 9.81 * (body.massEarth / Math.pow(body.radiusKm/6371,2));
    body.density = (body.massEarth / Math.pow(body.radiusKm/6371,3)) * 5.51;
    body.orbitalDays = 365.25 * Math.sqrt(Math.pow(Math.max(0.02, body.distanceAU),3));
    const absorbed = 278 * Math.pow(1 - albedo, 0.25) / Math.sqrt(Math.max(0.05, body.distanceAU));
    const greenhouse = (body.greenhouse ?? preset.greenhouse) + atmMultiplier*1.5;
    body.equilibriumK = absorbed;
    const baseTemp = absorbed + greenhouse;
    const rotFactor = clamp(Math.abs(body.rotationHours || 24) / 24, 0.15, 12);
    const atmosphereBuffer = 1 / (1 + atmMultiplier*0.08);
    const daySwing = 22 * Math.sqrt(rotFactor) * atmosphereBuffer + (body.distanceAU > 5 ? 4 : 0);
    body.dayK = baseTemp + daySwing;
    body.nightK = Math.max(40, baseTemp - daySwing*0.92);
    body.avgK = (body.dayK + body.nightK) / 2;
    body.waterState = body.avgK < 260 ? 'Frozen' : body.avgK > 370 ? 'Evaporated' : 'Liquid';
    body.iceLevel = clamp((273 - body.avgK)/70, 0, 1);
    body.evapLevel = clamp((body.avgK - 340)/120, 0, 1);
    body.habitable = body.avgK >= 250 && body.avgK <= 330 && body.waterState === 'Liquid' && body.distanceAU >= 0.95 && body.distanceAU <= 1.67;
    body.magnetosphere = classifyMagnetosphere(body);
  } else {
    body.gravity = 274 * (body.massEarth/333000) / Math.pow(body.radiusKm/696340,2);
    body.density = 1.41 * (body.massEarth/333000) / Math.pow(body.radiusKm/696340,3);
    body.orbitalDays = 0; body.equilibriumK = 5778; body.avgK = 5778; body.dayK = 5778; body.nightK = 5778;
    body.waterState = 'Plasma'; body.habitable = false; body.iceLevel = 0; body.evapLevel = 1; body.magnetosphere = classifyMagnetosphere(body);
  }
  return body;
}
function loadTextures(){
  const entries=Object.entries(EMBEDDED_TEXTURES);let settled=0;
  const ready=()=>{if(++settled===entries.length){loadingEl.style.display='none';start();}};
  if(!entries.length){loadingEl.style.display='none';start();return;}
  entries.forEach(([key,src])=>{
    const img=new Image();let done=false;
    const settle=()=>{if(done)return;done=true;clearTimeout(timeout);ready();};
    const timeout=setTimeout(settle,8000);
    img.onload=()=>{if(done)return;try{const off=document.createElement('canvas');off.width=img.naturalWidth;off.height=img.naturalHeight;const octx=off.getContext('2d',{willReadFrequently:true});octx.drawImage(img,0,0);const pixels=octx.getImageData(0,0,off.width,off.height);textureImages[key]=img;texturePixels[key]={w:off.width,h:off.height,data:pixels.data};}catch(error){console.warn('Mapa integrado indisponível:',key);}finally{settle();}};
    img.onerror=settle;img.src=src;
  });
}
function start(){ generateStars(); initBodies(); populateObjectSelect(); bindUI(); resize(); requestAnimationFrame(loop); }
function populateObjectSelect(){ const select = document.getElementById('objectSelect'); select.innerHTML=''; state.bodies.forEach(b=>{ const opt=document.createElement('option'); opt.value=b.id; opt.textContent=b.name+(b.custom?' (custom)':''); select.appendChild(opt); }); select.value=state.selectedId; }
function currentBody(){ return state.bodies.find(b=>b.id===state.selectedId) || state.bodies[0]; }
function updateEditReadouts(){const val=id=>Number(document.getElementById(id).value),star=currentBody()?.id==='sun';document.getElementById('editMassValue').textContent=star?fmt(val('editMass')/333000,4)+' M☉':fmt(val('editMass'),4)+' M⊕';document.getElementById('editDistanceValue').textContent=fmt(val('editDistance'),5)+' UA';document.getElementById('editRotationValue').textContent=fmt(val('editRotation'),2)+' h';document.getElementById('editAtmosphereValue').textContent=fmt(val('editAtmosphere'),3)+' × Terra';document.getElementById('editWaterValue').textContent=val('editWater')+'%';}
function syncEditorsFromSelection(){ const b=currentBody(); if(!b) return; const set=(id,val)=>document.getElementById(id).value=val; set('editName',b.name); set('editKind',b.kind); set('editTexture',b.texture||(KIND_INFO[b.kind]||KIND_INFO.rocky).texture); set('editMass',b.massEarth); set('editDistance',b.distanceAU??1); set('editRotation',b.rotationHours??24); set('editAtmosphere',b.atmosphere ?? 1); set('editWater',Math.round((b.water ?? 0)*100)); updateEditReadouts(); }
function setMode(mode){ state.mode=mode; document.getElementById('overviewBtn').classList.toggle('active',mode==='overview'); document.getElementById('focusBtn').classList.toggle('active',mode==='focus'); document.getElementById('overviewBtn').classList.toggle('secondary',mode!=='overview'); document.getElementById('focusBtn').classList.toggle('secondary',mode!=='focus'); }
function makeCustomPlanet(name='Custom World'){ return computeDerived({id:'custom-'+Math.random().toString(36).slice(2,8),custom:true,name,kind:'ocean',texture:'earth',massEarth:1,radiusKm:6371,distanceAU:1.15+Math.random()*4.5,orbitalDays:0,rotationHours:26,albedo:0.28,greenhouse:16,atmosphere:1.2,water:0.65,color:'#83c2ff',axialTilt:15+Math.random()*18,moons:[],facts:factsFromKind('ocean'),composition:compositionFromKind('ocean',.65),layers:layersFromKind('ocean'),angle:Math.random()*Math.PI*2,recomputeRadius:true}); }
function addCustomPlanet(){ const world=makeCustomPlanet('Custom World '+(state.bodies.filter(b=>b.custom).length+1)); state.bodies.push(world); state.selectedId=world.id; populateObjectSelect(); document.getElementById('objectSelect').value=world.id; syncEditorsFromSelection(); updateInfoPanel(); setMode('focus'); }
function removeCustomPlanet(){const body=currentBody();if(!body||!body.custom)return;state.bodies=state.bodies.filter(b=>b.id!==body.id);state.selectedId=(state.bodies.find(b=>b.id==='earth')||state.bodies.find(b=>b.id!=='sun')||state.bodies[0]).id;populateObjectSelect();syncEditorsFromSelection();updateInfoPanel();}
function applyEdit(){
  const b=currentBody(); if(!b) return; const kind=document.getElementById('editKind').value; const texture=document.getElementById('editTexture').value; const water=document.getElementById('editWater').value/100; const name=document.getElementById('editName').value.trim()||b.name; const preset=KIND_INFO[kind]||KIND_INFO.rocky;
  b.name=name; b.kind=kind; b.texture=texture; b.massEarth=+document.getElementById('editMass').value; b.distanceAU=b.id==='sun'?0:+document.getElementById('editDistance').value; b.rotationHours=+document.getElementById('editRotation').value; b.atmosphere=+document.getElementById('editAtmosphere').value; b.water=water; b.recomputeRadius=true;
  if(b.custom){ b.albedo=preset.albedo; b.greenhouse=preset.greenhouse; b.layers=layersFromKind(kind); b.composition=compositionFromKind(kind,water); b.facts=factsFromKind(kind); b.color=preset.color; if(kind==='star') b.distanceAU=0; }
  else { b.layers=layersFromKind(kind); b.composition=compositionFromKind(kind,water); }
  computeDerived(b); populateObjectSelect(); document.getElementById('objectSelect').value=b.id; updateInfoPanel();
}
function restoreSelected(){ const idx=state.bodies.findIndex(b=>b.id===state.selectedId); if(idx<0) return; const original=DEFAULT_BODIES.find(x=>x.id===state.selectedId); if(original){ const angle=state.bodies[idx].angle||0; state.bodies[idx]=computeDerived(Object.assign(deepCopy(original),{default:deepCopy(original),angle})); } else if(state.bodies[idx].custom){ const name=state.bodies[idx].name||'Custom World'; const world=makeCustomPlanet(name); world.id=state.bodies[idx].id; state.bodies[idx]=world; } syncEditorsFromSelection(); updateInfoPanel(); }
function bindUI(){
  const qs=id=>document.getElementById(id); qs('overviewBtn').onclick=()=>setMode('overview'); qs('focusBtn').onclick=()=>setMode('focus'); qs('playPauseBtn').onclick=()=>{ state.paused=!state.paused; qs('playPauseBtn').textContent=state.paused?'Resume':'Pause'; }; qs('resetBtn').onclick=()=>{ state.day=0; initBodies(); state.selectedId='earth'; populateObjectSelect(); syncEditorsFromSelection(); updateInfoPanel(); };
  qs('objectSelect').onchange=e=>{ state.selectedId=e.target.value; syncEditorsFromSelection(); updateInfoPanel(); }; qs('timeSpeed').oninput=e=>{ state.timeSpeed=+e.target.value; qs('timeSpeedValue').textContent=e.target.value+'×'; }; qs('zoomRange').oninput=e=>state.zoom=+e.target.value; qs('tiltRange').oninput=e=>state.tilt=+e.target.value;
  qs('toggleOrbits').onchange=e=>state.showOrbits=e.target.checked; qs('toggleLabels').onchange=e=>state.showLabels=e.target.checked; qs('toggleCompressed').onchange=e=>state.compressedScale=e.target.checked; qs('toggleHabitable').onchange=e=>state.showHabitable=e.target.checked; qs('toggleMagnetosphere').onchange=e=>state.showMagnetosphere=e.target.checked; qs('toggleTemperature').onchange=e=>state.showTemperature=e.target.checked; qs('toggleCutaway').onchange=e=>state.showCutaway=e.target.checked; qs('toggleAtmosphereSlice').onchange=e=>state.showAtmosphereSlice=e.target.checked; qs('toggleMoons').onchange=e=>state.showMoons=e.target.checked; qs('toggleNightLights').onchange=e=>state.showNightLights=e.target.checked;
  qs('applyEditBtn').onclick=applyEdit; qs('restoreEditBtn').onclick=restoreSelected; qs('addPlanetBtn').onclick=addCustomPlanet; qs('removePlanetBtn').onclick=removeCustomPlanet;
  ['editMass','editDistance','editRotation','editAtmosphere','editWater'].forEach(id=>document.getElementById(id).addEventListener('input',updateEditReadouts));
  syncEditorsFromSelection(); updateInfoPanel();
  canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;state.dragging=true;state.dragDistance=0;state.lastX=e.clientX;state.lastY=e.clientY;state.dragMode=state.mode;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!state.dragging)return;const dx=e.clientX-state.lastX,dy=e.clientY-state.lastY;state.dragDistance+=Math.hypot(dx,dy);state.lastX=e.clientX;state.lastY=e.clientY;if(state.dragMode==='overview'){state.yaw+=dx*.004;state.tilt=clamp(state.tilt+dy*.08,10,80);document.getElementById('tiltRange').value=state.tilt;}else{state.focusYaw+=dx*.01;state.focusPitch=clamp(state.focusPitch+dy*.005,-.55,.55);}});
  canvas.addEventListener('pointerup',()=>state.dragging=false);canvas.addEventListener('pointercancel',()=>state.dragging=false);canvas.addEventListener('lostpointercapture',()=>state.dragging=false);canvas.addEventListener('wheel',e=>{e.preventDefault();state.zoom=clamp(state.zoom-e.deltaY*.03,20,260);document.getElementById('zoomRange').value=state.zoom;},{passive:false});canvas.addEventListener('click',onCanvasClick);window.addEventListener('resize',resize);new ResizeObserver(resize).observe(canvas);
}
function resize(){const rect=canvas.getBoundingClientRect(),ratio=window.devicePixelRatio||1,w=Math.max(1,Math.round(rect.width*ratio)),h=Math.max(1,Math.round(rect.height*ratio));if(canvas.width===w&&canvas.height===h)return;canvas.width=w;canvas.height=h;}
function isSimulationVisible(){if(document.visibilityState==='hidden')return false;try{const frame=window.frameElement;if(frame){const rect=frame.getBoundingClientRect();if(rect.width<1||rect.height<1)return false;const entry=frame.ownerDocument.documentElement.dataset.entryState;if(entry==='closed'||entry==='opening')return false;}}catch(error){}return true;}
function loop(ts){const dt=loop.last==null?0:Math.min(.25,Math.max(0,(ts-loop.last)/1000));loop.last=ts;if(isSimulationVisible()){if(!state.paused)updateSimulation(dt);render();}requestAnimationFrame(loop);}
function updateSimulation(dt){state.day+=dt*state.timeSpeed;state.bodies.forEach(body=>{if(body.id==='sun')return;const speed=2*Math.PI/Math.max(.0001,body.orbitalDays);body.angle=(body.angle+speed*dt*state.timeSpeed)%(Math.PI*2);});}
function drawBackground(viewW,viewH){ const g=ctx.createRadialGradient(viewW*0.5,viewH*0.3,10,viewW*0.5,viewH*0.5,viewW*0.65); g.addColorStop(0,'rgba(17,35,64,.34)'); g.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle='#03060b'; ctx.fillRect(0,0,viewW,viewH); ctx.fillStyle=g; ctx.fillRect(0,0,viewW,viewH); state.starField.forEach(s=>{ ctx.fillStyle=s.c+s.a+')'; ctx.beginPath(); ctx.arc(s.x*viewW,s.y*viewH,s.r,0,Math.PI*2); ctx.fill(); }); }
function project3D(x,y,z,viewW,viewH){ const yaw=state.yaw, tilt=state.tilt*Math.PI/180, cy=Math.cos(yaw), sy=Math.sin(yaw); let dx=x*cy-z*sy, dz=x*sy+z*cy, dy=y; const ct=Math.cos(tilt), st=Math.sin(tilt); const py=dy*ct-dz*st, pz=dy*st+dz*ct+12; const scale=state.zoom/pz; return {x:viewW*0.5+dx*scale,y:viewH*0.53+py*scale,z:pz,scale}; }
function distanceScale(au){ return state.compressedScale ? Math.pow(au,0.67)*24 : au*10; }
function radiusScale(radiusKm){ return state.compressedScale ? Math.max(2,Math.pow(radiusKm,0.32)*0.8) : Math.max(1.4,radiusKm/7000); }
function drawHabitableZone(viewW,viewH){
  const center=project3D(0,0,0,viewW,viewH), tilt=state.tilt*Math.PI/180; const rings=[{inner:distanceScale(0.55),outer:distanceScale(0.95),a:'rgba(255,80,60,.26)',b:'rgba(255,55,40,0)'},{inner:distanceScale(0.95),outer:distanceScale(1.67),a:'rgba(80,240,130,.22)',b:'rgba(90,255,170,0)'},{inner:distanceScale(1.67),outer:distanceScale(2.45),a:'rgba(70,150,255,.18)',b:'rgba(60,140,255,0)'}];
  rings.forEach(r=>{ const outerRx=r.outer*(state.zoom/12), outerRy=outerRx*Math.max(0.12,Math.cos(tilt)), innerRx=r.inner*(state.zoom/12), innerRy=innerRx*Math.max(0.12,Math.cos(tilt)); const grad=ctx.createRadialGradient(center.x,center.y,innerRx*0.65,center.x,center.y,outerRx); grad.addColorStop(0,r.b); grad.addColorStop(Math.max(0.05,innerRx/Math.max(outerRx,1)),r.a); grad.addColorStop(1,r.b); ctx.fillStyle=grad; ctx.beginPath(); ctx.ellipse(center.x,center.y,outerRx,outerRy,0,0,Math.PI*2); ctx.ellipse(center.x,center.y,innerRx,innerRy,0,0,Math.PI*2,true); ctx.fill('evenodd'); ctx.strokeStyle=r.a; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(center.x,center.y,innerRx,innerRy,0,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.ellipse(center.x,center.y,outerRx,outerRy,0,0,Math.PI*2); ctx.stroke(); });
}
function drawOrbit(body,viewW,viewH){ const dist=distanceScale(body.distanceAU); ctx.strokeStyle=body.id===state.selectedId?'rgba(116,193,255,.5)':'rgba(255,255,255,.14)'; ctx.lineWidth=body.id===state.selectedId?1.5:1; ctx.beginPath(); for(let i=0;i<=120;i++){ const a=(i/120)*Math.PI*2; const p=project3D(Math.cos(a)*dist,0,Math.sin(a)*dist,viewW,viewH); if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y); } ctx.stroke(); }
function drawBodyDisc(body,pos){ const r=radiusScale(body.radiusKm)*(body.id==='sun'?1.15:1)*(1+pos.scale*0.008); const texture=textureImages[body.texture]; ctx.save(); ctx.translate(pos.x,pos.y); const glow=ctx.createRadialGradient(0,0,1,0,0,r*1.9); const rgb=rgbArr(body.color||'#ffffff'); glow.addColorStop(0,'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+(body.id==='sun'?0.38:0.12)+')'); glow.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(0,0,r*2,0,Math.PI*2); ctx.fill(); if(texture){ ctx.save(); ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.clip(); ctx.drawImage(texture,-r,-r,r*2,r*2); if(body.id!=='sun'){ const lg=ctx.createLinearGradient(-r*1.2,-r*0.6,r*1.2,r*0.8); lg.addColorStop(0,'rgba(255,255,255,.18)'); lg.addColorStop(.48,'rgba(255,255,255,.03)'); lg.addColorStop(.65,'rgba(0,0,0,.18)'); lg.addColorStop(1,'rgba(0,0,0,.5)'); ctx.fillStyle=lg; ctx.fillRect(-r,-r,r*2,r*2); } ctx.restore(); } else { ctx.fillStyle=body.color||'#ccc'; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill(); } ctx.strokeStyle=body.id===state.selectedId?'#89d2ff':'rgba(255,255,255,.18)'; ctx.lineWidth=body.id===state.selectedId?2:1; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke(); if(state.showLabels){ ctx.fillStyle='#eef6ff'; ctx.font='12px Inter, sans-serif'; ctx.textAlign='center'; ctx.fillText(body.name,0,-r-8); } body._screen={x:pos.x,y:pos.y,r}; ctx.restore(); }
function renderOverview(viewW,viewH){ drawBackground(viewW,viewH); if(state.showHabitable) drawHabitableZone(viewW,viewH); if(state.showOrbits) state.bodies.filter(b=>b.id!=='sun').forEach(b=>drawOrbit(b,viewW,viewH)); const drawables=state.bodies.map(body=>{ const dist=body.id==='sun'?0:distanceScale(body.distanceAU); const x=Math.cos(body.angle||0)*dist, z=Math.sin(body.angle||0)*dist; return {body, pos:project3D(x,0,z,viewW,viewH)}; }).sort((a,b)=>b.pos.z-a.pos.z); drawables.forEach(d=>drawBodyDisc(d.body,d.pos)); const selected=currentBody(); if(state.showMagnetosphere && selected && selected._screen && selected.id!=='sun') drawMagnetosphereShape(selected, selected._screen.x, selected._screen.y, selected._screen.r*1.8, selected._screen.r*1.2, 0.4); }
function sampleTexture(pixelSrc,u,v){ if(!pixelSrc) return [200,200,200]; u=((u%1)+1)%1; v=clamp(v,0,0.999999); const x=Math.floor(u*pixelSrc.w), y=Math.floor(v*pixelSrc.h), idx=(y*pixelSrc.w+x)*4; return [pixelSrc.data[idx],pixelSrc.data[idx+1],pixelSrc.data[idx+2],pixelSrc.data[idx+3]]; }
function tempToColor(k){ const cold=[82,144,255], temperate=[255,227,134], hot=[255,92,65]; const t=clamp((k-120)/560,0,1); return t<0.5 ? mixColor(cold,temperate,t*2) : mixColor(temperate,hot,(t-0.5)*2); }
function renderSphere(body,size=340){
  const off=document.createElement('canvas'); off.width=size; off.height=size; const octx=off.getContext('2d'); const img=octx.createImageData(size,size); const data=img.data; const r=size*0.5, radiusPx=size*0.46; const v=[-0.82,0.18,0.54]; const sunMag=Math.hypot(v[0],v[1],v[2]); const sunDir=[v[0]/sunMag,v[1]/sunMag,v[2]/sunMag]; const tex=texturePixels[body.texture], night=texturePixels.earthNight; const spin=rotationTurns(body)*Math.PI*2+state.focusYaw; const tilt=(body.axialTilt||0)*Math.PI/180; const ct=Math.cos(tilt), st=Math.sin(tilt);
  for(let y=0;y<size;y++){
    const py=(y-r)/radiusPx;
    for(let x=0;x<size;x++){
      const px=(x-r)/radiusPx, d2=px*px+py*py, idx=(y*size+x)*4; if(d2>1){ data[idx+3]=0; continue; }
      const pz=Math.sqrt(1-d2); let nx=px, ny=py, nz=pz; const cp=Math.cos(state.focusPitch), sp=Math.sin(state.focusPitch); const nny=ny*cp-nz*sp, nnz=ny*sp+nz*cp; ny=nny; nz=nnz;
      let bx=nx*Math.cos(-spin)-nz*Math.sin(-spin), bz=nx*Math.sin(-spin)+nz*Math.cos(-spin), by=ny; const iby=by*ct-bz*st, ibz=by*st+bz*ct; by=iby; bz=ibz; const lon=Math.atan2(bz,bx), lat=Math.asin(clamp(-by,-1,1)), u=0.5-lon/(Math.PI*2), vv=0.5-lat/Math.PI;
      let s=sampleTexture(tex,u,vv), rr=s[0], gg=s[1], bb=s[2];
      if(['ocean','desert','rocky','ice'].includes(body.kind) || body.texture==='earth'){ const ocean=bb>rr*1.05 && bb>gg*1.03; if(ocean){ if(body.iceLevel>0){ rr=lerp(rr,225,body.iceLevel*0.92); gg=lerp(gg,242,body.iceLevel*0.92); bb=lerp(bb,255,body.iceLevel*0.92); } if(body.evapLevel>0){ rr=lerp(rr,88,body.evapLevel*0.52); gg=lerp(gg,95,body.evapLevel*0.52); bb=lerp(bb,98,body.evapLevel*0.52); } } }
      if(body.kind==='desert' && body.texture==='earth'){ rr=clamp(rr*1.12,0,255); gg=clamp(gg*0.98,0,255); bb=clamp(bb*0.82,0,255); }
      if(body.kind==='ice' && body.texture==='earth'){ rr=lerp(rr,220,0.45); gg=lerp(gg,240,0.55); bb=lerp(bb,255,0.60); }
      const ndotl=clamp(nx*sunDir[0]+ny*sunDir[1]+nz*sunDir[2],-1,1), lit=Math.max(0,ndotl), ambient=body.id==='sun'?1:0.13; let shade=body.id==='sun'?1:(ambient+lit*0.87); rr*=shade; gg*=shade; bb*=shade;
      if(body.id==='sun'){ const pulse=0.9+0.1*Math.sin(state.day*0.7+lon*8+lat*4); rr=clamp(rr*pulse+20,0,255); gg=clamp(gg*(0.92+pulse*0.08)+8,0,255); bb=clamp(bb*(0.82+pulse*0.04),0,255); }
      if(body.id==='earth' && state.showNightLights && ndotl<0.32){
        // Use the same longitude/latitude for the day and actual night maps.
        // Soft twilight boundary; the night texture itself already contains faint ocean/land detail.
        const n=sampleTexture(night,u,vv), nr=n[0], ng=n[1], nb=n[2];
        const mixN=1-smoothstep(-0.18,0.32,ndotl), lum=Math.max(nr,ng,nb)/255;
        rr=lerp(rr,Math.max(nr*.93,rr*.17),mixN);
        gg=lerp(gg,Math.max(ng*.93,gg*.17),mixN);
        bb=lerp(bb,Math.max(nb,bb*.19),mixN);
        if(lum>0.11){rr+=nr*.26*mixN;gg+=ng*.22*mixN;bb+=nb*.14*mixN;}
      }
      if(state.showTemperature && body.id!=='sun'){ const temp=lerp(body.nightK,body.dayK,clamp(lit,0,1))*(1-Math.abs(lat)/Math.PI*0.28); const c=tempToColor(temp); rr=lerp(rr,c[0],0.34); gg=lerp(gg,c[1],0.34); bb=lerp(bb,c[2],0.34); }
      if(state.showCutaway){ const ang=Math.atan2(py,px), cut=px>0.10 && ang>-1.08 && ang<0.88; if(cut){ const radial=Math.sqrt(d2); const shells=INTERNAL_PROFILES[body.id]||INTERNAL_PROFILES[body.kind==='gas'?'jupiter':body.kind==='icegiant'?'neptune':'earth'];for(const shell of shells){if(radial<=shell[0]){const col=rgbArr(shell[1]);rr=col[0];gg=col[1];bb=col[2];break;}} if(state.showAtmosphereSlice && radial>0.94 && body.atmosphere>0){ rr=lerp(rr,170,.55); gg=lerp(gg,220,.55); bb=lerp(bb,255,.70); } } }
      const rim=Math.pow(1-Math.max(0,nz),2.1); rr+=35*rim; gg+=55*rim; bb+=80*rim; data[idx]=clamp(rr,0,255); data[idx+1]=clamp(gg,0,255); data[idx+2]=clamp(bb,0,255); data[idx+3]=255;
    }
  }
  octx.putImageData(img,0,0); return off;
}
function drawAtmosphereGlow(body,cx,cy,r){ const atm=clamp((body.atmosphere||0)/80,0,1); if(atm<=0 && body.kind!=='star') return; const grad=ctx.createRadialGradient(cx,cy,r*0.95,cx,cy,r*(body.kind==='star'?1.7:1.22+atm*0.18)); if(body.kind==='star'){ grad.addColorStop(0,'rgba(255,190,95,0)'); grad.addColorStop(.6,'rgba(255,168,70,.18)'); grad.addColorStop(1,'rgba(255,110,50,0)'); } else { grad.addColorStop(0,'rgba(120,190,255,0)'); grad.addColorStop(.7,'rgba(120,190,255,'+(0.05+atm*0.18)+')'); grad.addColorStop(1,'rgba(120,190,255,0)'); } ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(cx,cy,r*(body.kind==='star'?1.7:1.26+atm*0.12),0,Math.PI*2); ctx.fill(); }
function drawMagnetosphereShape(body,cx,cy,rw,rh,alpha=1){ const mag=body.magnetosphere; if(!mag) return; ctx.save(); ctx.translate(cx,cy); ctx.lineWidth=2; const lines=mag.type==='heliosphere'?7:mag.type==='giant'?5:4; for(let i=0;i<lines;i++){ const t=i/(lines-1||1), scale=0.42+t*0.58; ctx.strokeStyle = mag.type==='heliosphere' ? 'rgba(255,150,90,'+((0.10+(1-t)*0.24)*alpha)+')' : 'rgba('+(mag.type==='earth'?'110,196,255':mag.type==='tilted'?'140,224,255':'150,185,255')+','+((0.10+(1-t)*0.24)*alpha)+')'; ctx.beginPath(); if(mag.type==='heliosphere'){ const front=rw*(0.55+scale*0.48), tail=rw*(1.6+scale*1.6), h=rh*(0.48+scale*0.72); ctx.moveTo(-front,0); ctx.bezierCurveTo(-front*0.6,-h,tail*0.18,-h,tail,0); ctx.bezierCurveTo(tail*0.18,h,-front*0.6,h,-front,0); } else { const front=rw*(0.42+scale*0.40), tail=rw*(1.15+scale*(mag.type==='giant'?1.25:0.95)), h=rh*(0.36+scale*0.54); ctx.moveTo(-front,0); ctx.bezierCurveTo(-front*0.55,-h,tail*0.25,-h,tail,0); ctx.bezierCurveTo(tail*0.25,h,-front*0.55,h,-front,0); } ctx.stroke(); } ctx.restore(); }
function renderFocus(viewW,viewH){ drawBackground(viewW,viewH); const body=currentBody(), sphere=renderSphere(body,380), cx=viewW*0.46, cy=viewH*0.54, r=170; if(state.showMagnetosphere) drawMagnetosphereShape(body,cx,cy,r*1.25,r*0.95,0.95); drawAtmosphereGlow(body,cx,cy,r); ctx.drawImage(sphere,cx-r,cy-r,r*2,r*2); if(body.id==='saturn'){ ctx.save(); ctx.translate(cx,cy); ctx.rotate(-0.45); const ringGrad=ctx.createLinearGradient(-r*1.5,0,r*1.5,0); ringGrad.addColorStop(0,'rgba(220,200,170,.12)'); ringGrad.addColorStop(.5,'rgba(245,225,185,.55)'); ringGrad.addColorStop(1,'rgba(220,200,170,.12)'); ctx.strokeStyle=ringGrad; ctx.lineWidth=20; ctx.beginPath(); ctx.ellipse(0,0,r*1.55,r*0.48,0,0,Math.PI*2); ctx.stroke(); ctx.lineWidth=8; ctx.strokeStyle='rgba(255,246,220,.55)'; ctx.beginPath(); ctx.ellipse(0,0,r*1.28,r*0.38,0,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
  if(state.showMoons && body.moons && body.moons.length){ const time=state.day; body.moons.forEach((moon,i)=>{ const angle=time/Math.max(0.15,Math.abs(moon.orbitalDays||4))*Math.PI*2*(moon.orbitalDays<0?-1:1)+i*0.8, orbit=r*0.9+moon.distanceRadii*3.4, mx=cx+Math.cos(angle)*(orbit*0.95), my=cy+Math.sin(angle)*orbit*0.30; ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(cx,cy,orbit*0.95,orbit*0.30,0,0,Math.PI*2); ctx.stroke(); const mr=Math.max(4,Math.min(18,moon.radiusKm/420)), tex=textureImages[moon.texture||'moon']; ctx.save(); ctx.beginPath(); ctx.arc(mx,my,mr,0,Math.PI*2); ctx.clip(); if(tex) ctx.drawImage(tex,mx-mr,my-mr,mr*2,mr*2); else { ctx.fillStyle=moon.color||'#ddd'; ctx.fillRect(mx-mr,my-mr,mr*2,mr*2); } ctx.restore(); ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(mx,my,mr,0,Math.PI*2); ctx.stroke(); if(state.showLabels){ ctx.fillStyle='#dfefff'; ctx.font='12px Inter'; ctx.textAlign='center'; ctx.fillText(moon.name,mx,my+mr+12); } }); }
  ctx.textAlign='left';ctx.fillStyle='rgba(8,14,24,.74)'; ctx.strokeStyle='rgba(122,175,245,.22)'; ctx.lineWidth=1; ctx.beginPath(); roundRect(ctx,viewW*0.06,viewH*0.08,210,64,14); ctx.fill(); ctx.stroke(); ctx.fillStyle='#ecf4ff'; ctx.font='700 14px Inter'; ctx.fillText('Aproximação · '+translatedName(body),viewW*0.06+12,viewH*0.08+22); ctx.font='12px Inter'; ctx.fillStyle='#b3c4de'; ctx.fillText('Dia '+temperatureC(body.dayK)+' · Noite '+temperatureC(body.nightK),viewW*0.06+12,viewH*0.08+42); ctx.fillText('Água: '+translatedWater(body.waterState),viewW*0.06+12,viewH*0.08+58);
}
function roundRect(ctx,x,y,w,h,r){ ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); }
function render(){ const viewW=canvas.clientWidth, viewH=canvas.clientHeight; ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,canvas.width,canvas.height); ctx.scale(devicePixelRatio,devicePixelRatio); if(state.mode==='overview') renderOverview(viewW,viewH); else renderFocus(viewW,viewH); document.getElementById('overlayLeft').textContent=state.mode==='overview'?'Sistema completo · arraste para girar, role para dar zoom e clique em um planeta.':'Aproximação · arraste para girar o planeta e role para ampliar.'; document.getElementById('overlayRight').textContent='Dia '+fmt(state.day,1)+' · '+translatedName(currentBody()); }
function onCanvasClick(e){if(state.mode!=='overview'||state.dragDistance>5)return;const rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;let hit=null,best=1e9;state.bodies.forEach(b=>{if(!b._screen)return;const d=Math.hypot(x-b._screen.x,y-b._screen.y);if(d<b._screen.r+8&&d<best){best=d;hit=b;}});if(hit){state.selectedId=hit.id;document.getElementById('objectSelect').value=hit.id;syncEditorsFromSelection();updateInfoPanel();setMode('focus');}}
function updateInfoPanel(){
  const b=currentBody(); if(!b) return; document.getElementById('infoName').textContent=b.name; document.getElementById('infoSubtitle').textContent=(KIND_INFO[b.kind]||{label:b.kind}).label+' · '+(b.id==='sun'?'System barycenter':fmt(b.distanceAU,2)+' AU from the Sun'); const status=b.kind==='star'?'Star / heliosphere':b.habitable?'Habitable candidate':(b.distanceAU<0.95?'Inner hot zone':b.distanceAU>1.67?'Outer cold zone':'Temperate but not ideal'); const statusEl=document.getElementById('infoStatus'); statusEl.textContent=status; statusEl.style.borderColor=b.habitable?'#3e8760':b.id==='sun'?'#8a6a30':'#2b4366';
  const stats=[['Mass',b.id==='sun'?fmt(b.massEarth/333000,2)+' M☉':fmt(b.massEarth,2)+' M⊕'],['Radius',fmt(b.radiusKm,0)+' km'],['Gravity',fmt(b.gravity,2)+' m/s²'],['Density',fmt(b.density,2)+' g/cm³'],['Orbital period',b.id==='sun'?'—':fmt(b.orbitalDays,1)+' d'],['Rotation',fmtSigned(b.rotationHours,1)+' h'],['Eq. temperature',b.id==='sun'?'5,778 K':fmt(b.equilibriumK,0)+' K'],['Day / night',b.id==='sun'?'—':fmt(b.dayK,0)+' / '+fmt(b.nightK,0)+' K'],['Water state',b.waterState],['Magnetosphere',b.id==='sun'?'Heliosphere':fmt(b.magnetosphere.strength,2)+' × Earth']];
  document.getElementById('statsGrid').innerHTML=stats.map(s=>'<div class="stat"><div class="k">'+s[0]+'</div><div class="v">'+s[1]+'</div></div>').join('');
  const bars=document.getElementById('compositionBars'); bars.innerHTML=''; b.composition.forEach(item=>{ const label=item[0], val=item[1]; const row=document.createElement('div'); row.className='bar'; row.innerHTML='<span>'+label+'</span><div class="track"><div class="fill" style="width:'+clamp(val,0,100)+'%"></div></div><strong>'+val+'%</strong>'; bars.appendChild(row); });
  document.getElementById('moonList').innerHTML=b.moons&&b.moons.length?b.moons.map(m=>m.name+' · orbit '+m.orbitalDays+' d · radius '+m.radiusKm+' km').join('<br>'):'No major moons in this view.'; const facts=document.getElementById('factList'); facts.innerHTML=''; [...b.facts,'Average temperature: '+Math.round(b.avgK)+' K.',b.kind==='star'?'Approximate radius: '+fmt(b.radiusKm,0)+' km. Habitable-zone logic uses the Sun-like reference bands.':'Water state in the current setup: '+b.waterState+'.'].forEach(t=>{ const li=document.createElement('li'); li.textContent=t; facts.appendChild(li); }); drawTempChart(b); drawCutawayChart(b);
}
function drawTempChart(body){ tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height); const w=tempCanvas.width,h=tempCanvas.height; tempCtx.fillStyle='#07101b'; tempCtx.fillRect(0,0,w,h); tempCtx.strokeStyle='rgba(255,255,255,.1)'; tempCtx.lineWidth=1; for(let i=0;i<4;i++){ const y=18+i*30; tempCtx.beginPath(); tempCtx.moveTo(40,y); tempCtx.lineTo(w-10,y); tempCtx.stroke(); } tempCtx.fillStyle='#92a5c2'; tempCtx.font='11px Inter'; for(let i=0;i<=6;i++){ const x=40+(w-60)*(i/6); tempCtx.fillText(String(i*4),x-4,h-8); } tempCtx.fillText('h',w-20,h-8); if(body.id==='sun'){ tempCtx.fillStyle='#ffda7d'; tempCtx.fillText('Temperature graph is not shown for the star focus view.',18,74); return; } const pts=[]; let min=1e9,max=-1e9; for(let i=0;i<=48;i++){ const t=i/48, daylight=Math.max(0,Math.cos(t*Math.PI*2-Math.PI)), temp=lerp(body.nightK,body.dayK,daylight)*0.92; pts.push(temp); min=Math.min(min,temp); max=Math.max(max,temp); } min=Math.floor((min-10)/10)*10; max=Math.ceil((max+10)/10)*10; tempCtx.strokeStyle='rgba(79,196,255,.95)'; tempCtx.lineWidth=2; tempCtx.beginPath(); pts.forEach((temp,i)=>{ const x=40+(w-60)*(i/(pts.length-1)), y=15+(h-40)*(1-(temp-min)/(max-min||1)); if(i===0) tempCtx.moveTo(x,y); else tempCtx.lineTo(x,y); }); tempCtx.stroke(); pts.forEach((temp,i)=>{ if(i%12===0){ const x=40+(w-60)*(i/(pts.length-1)), y=15+(h-40)*(1-(temp-min)/(max-min||1)), c=tempToColor(temp); tempCtx.fillStyle='rgb('+c[0]+','+c[1]+','+c[2]+')'; tempCtx.beginPath(); tempCtx.arc(x,y,3,0,Math.PI*2); tempCtx.fill(); } }); tempCtx.fillStyle='#dfefff'; tempCtx.fillText(Math.round(body.dayK)+' K day',14,16); tempCtx.fillText(Math.round(body.nightK)+' K night',104,16); tempCtx.fillText(Math.round(body.avgK)+' K avg',210,16); }
function drawCutawayChart(body){ cutCtx.clearRect(0,0,cutCanvas.width,cutCanvas.height); const w=cutCanvas.width,h=cutCanvas.height,cx=86,cy=80,R=56; cutCtx.fillStyle='#07101b'; cutCtx.fillRect(0,0,w,h); cutCtx.save(); cutCtx.translate(cx,cy); body.layers.forEach(layer=>{ const rgb=rgbArr(layer.color); cutCtx.fillStyle='rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')'; cutCtx.beginPath(); cutCtx.moveTo(0,0); cutCtx.arc(0,0,R*layer.fraction,-Math.PI*0.85,Math.PI*0.22); cutCtx.closePath(); cutCtx.fill(); cutCtx.beginPath(); cutCtx.arc(0,0,R*layer.fraction,0,Math.PI*2); cutCtx.fill(); }); if(body.atmosphere>0){ cutCtx.strokeStyle='rgba(150,220,255,.45)'; cutCtx.lineWidth=6; cutCtx.beginPath(); cutCtx.arc(0,0,R*1.05,0,Math.PI*2); cutCtx.stroke(); } cutCtx.strokeStyle='rgba(255,255,255,.18)'; cutCtx.lineWidth=1; cutCtx.beginPath(); cutCtx.arc(0,0,R,0,Math.PI*2); cutCtx.stroke(); cutCtx.restore(); cutCtx.fillStyle='#dfefff'; cutCtx.font='12px Inter'; cutCtx.fillText(body.name+' cutaway',18,18); body.layers.forEach((layer,i)=>{ const y=36+i*24, rgb=rgbArr(layer.color); cutCtx.fillStyle='rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')'; cutCtx.fillRect(170,y-10,16,16); cutCtx.fillStyle='#dbe7ff'; cutCtx.fillText(layer.name+' · '+Math.round(layer.fraction*100)+'% radius',194,y+2); }); cutCtx.fillStyle='#8fa6c7'; cutCtx.fillText(body.kind==='star'?'Corona / outer plasma glow shown in focus view.':body.atmosphere>0?'Atmosphere slice enabled when cutaway is on.':'This body has almost no atmosphere in the current setup.',18,140); }

// ─── Second-pass core improvements: orbit scale, climate, language and star catalogs ──
const PT_NAMES={sun:'Sol',mercury:'Mercúrio',venus:'Vênus',earth:'Terra',mars:'Marte',jupiter:'Júpiter',saturn:'Saturno',uranus:'Urano',neptune:'Netuno'};
const PT_KIND={star:'Estrela',rocky:'Planeta rochoso',ocean:'Mundo oceânico',desert:'Mundo desértico',ice:'Mundo gelado',gas:'Gigante gasoso',icegiant:'Gigante de gelo'};
const PT_TERMS={Frozen:'Congelada',Liquid:'Líquida',Evaporated:'Vaporizada',Plasma:'Plasma',Uncertain:'Indefinida',Indefinido:'Indefinida'};
const PT_FACTS={
 sun:['O Sol contém cerca de 99,8% da massa do Sistema Solar.','A luz solar e a refletividade dos planetas influenciam suas temperaturas.','A coroa solar se estende muito além da fotosfera visível.'],
 mercury:['Mercúrio possui um núcleo metálico proporcionalmente muito grande.','Seu dia solar dura cerca de 176 dias terrestres.','Embora fraco, tem um campo magnético global intrínseco.'],
 venus:['Vênus tem uma atmosfera muito densa, rica em dióxido de carbono.','Gira no sentido retrógrado e completa uma volta muito lentamente.','Seu forte efeito estufa o torna mais quente do que Mercúrio.'],
 earth:['A Terra é o único planeta conhecido com oceanos superficiais duradouros e vida.','Sua magnetosfera ajuda a proteger a atmosfera do vento solar.','O lado noturno usa uma textura ilustrativa integrada com geografia e luzes urbanas.'],
 mars:['Marte abriga o Monte Olimpo, um dos maiores vulcões do Sistema Solar.','Há gelo de água nos polos e no subsolo.','Seu antigo campo magnético global não existe mais; restam campos na crosta.'],
 jupiter:['Júpiter tem o campo magnético planetário mais intenso do Sistema Solar.','A Grande Mancha Vermelha é uma tempestade de longa duração.','O hidrogênio no interior pode comportar-se como metal líquido.'],
 saturn:['Saturno é menos denso que a água, considerando sua densidade média.','Seus anéis são compostos principalmente de partículas de gelo.','Titã, uma de suas luas, possui uma atmosfera densa.'],
 uranus:['Urano gira quase deitado, com inclinação axial de aproximadamente 98°.','Seu campo magnético é bastante inclinado e deslocado.','A composição profunda inclui fluidos ricos em água, amônia e metano.'],
 neptune:['Netuno apresenta ventos extremamente rápidos e tempestades atmosféricas.','É classificado como gigante de gelo, assim como Urano.','Sua maior lua, Tritão, tem órbita retrógrada.']
};
const PT_COMPOSITION={
 sun:['Hidrogênio','Hélio','Elementos pesados'],mercury:['Núcleo de ferro','Rocha silicática','Voláteis'],venus:['Atmosfera de CO₂','Nitrogênio','Rochas e metais'],earth:['Água superficial','Rochas silicáticas','Núcleo metálico'],
 mars:['Rocha basáltica','Óxidos de ferro','Gelo e voláteis'],jupiter:['Hidrogênio','Hélio','Outros compostos'],saturn:['Hidrogênio','Hélio','Outros compostos'],
 uranus:['Hidrogênio e hélio','Água, amônia e metano','Núcleo rochoso'],neptune:['Hidrogênio e hélio','Água, metano e amônia','Núcleo rochoso']
};
const PT_LAYERS={
 sun:['Núcleo','Zona radiativa','Zona convectiva','Fotosfera e coroa'],mercury:['Núcleo metálico','Manto','Crosta'],venus:['Núcleo metálico','Manto','Crosta'],
 earth:['Núcleo interno','Núcleo externo','Manto inferior','Manto superior','Crosta'],mars:['Núcleo','Manto','Crosta'],
 jupiter:['Núcleo diluído','Hidrogênio metálico','Hidrogênio molecular','Nuvens superiores'],saturn:['Núcleo','Interior metálico','Hidrogênio molecular','Topo das nuvens'],
 uranus:['Núcleo rochoso','Manto rico em voláteis','Atmosfera de H/He'],neptune:['Núcleo','Manto rico em gelos','Atmosfera superior']
};
const INTERNAL_PROFILES={
 sun:[[.26,'#fff0a6'],[.72,'#ffcb69'],[.985,'#ff903e'],[1,'#ffdf9a']],
 mercury:[[.82,'#d3a35f'],[.965,'#99745d'],[1,'#b7ada2']],
 venus:[[.52,'#d7a05c'],[.978,'#95634a'],[1,'#c5a47c']],
 earth:[[.19,'#ffe3a0'],[.55,'#e99e4b'],[.86,'#a46d50'],[.993,'#995c40'],[1,'#70b5df']],
 mars:[[.49,'#d49b62'],[.94,'#a56c4e'],[1,'#c18b67']],
 jupiter:[[.18,'#e8b879'],[.62,'#9e99ac'],[.94,'#c6ad87'],[1,'#e8d1ad']],
 saturn:[[.20,'#edbf86'],[.56,'#a9a6af'],[.92,'#d5c196'],[1,'#f1dfb6']],
 uranus:[[.22,'#d8aa79'],[.79,'#74c5db'],[1,'#a9e3ee']],
 neptune:[[.24,'#cda17b'],[.78,'#568ac6'],[1,'#97baf2']]
};
const EXO_PRESETS={
 trappist:{host:'TRAPPIST-1',massSolar:.0898,radiusSolar:.1192,luminosity:.00055,teff:2566,name:'TRAPPIST-1 e',massEarth:.692,radiusEarth:.92,au:.02925,periodDays:6.1,rotationHours:146.4,albedo:.29,atmosphere:1.0,kind:'rocky',texture:'mars',facts:['Exoplaneta rochoso conhecido em órbita da anã vermelha TRAPPIST-1.','Distância orbital de aproximadamente 0,02925 UA e período de 6,1 dias.','Sua atmosfera e sua rotação exata não estão determinadas neste simulador: os valores adotados são hipotéticos.']},
 proxima:{host:'Próxima Centauri',massSolar:.122,radiusSolar:.154,luminosity:.0017,teff:3040,name:'Próxima Centauri b',massEarth:1.055,radiusEarth:1.02,au:.04848,periodDays:11.2,rotationHours:268.8,albedo:.29,atmosphere:1.0,kind:'rocky',texture:'earth',facts:['Próxima Centauri b orbita a estrela mais próxima do Sol.','Seu período orbital é de aproximadamente 11,2 dias.','A presença de atmosfera, água e rotação sincrônica é representada apenas como hipótese educativa.']},
 'trappist-f':{host:'TRAPPIST-1',massSolar:.0898,radiusSolar:.1192,luminosity:.00055,teff:2566,name:'TRAPPIST-1 f',massEarth:1.039,radiusEarth:1.045,au:.03849,periodDays:9.21,rotationHours:221.0,albedo:.3,atmosphere:.7,kind:'rocky',texture:'venus',facts:['TRAPPIST-1 f é um dos planetas do sistema de sete mundos em trânsito.','Seu período orbital é de aproximadamente 9,2 dias.','Atmosfera e composição superficiais não são conhecidas em detalhe; o visual e o clima são hipóteses.']}
};
function primaryStar(){return state.bodies.find(b=>b.id==='sun')||state.bodies.find(b=>b.kind==='star');}
function hostLuminosity(){return Math.max(.00001,primaryStar()?.luminosity||1);}
function hostMassSolar(){return Math.max(.005,(primaryStar()?.massEarth||333000)/333000);}
function hzLimits(){const scale=Math.sqrt(hostLuminosity());return {hot:.54*scale,inner:.95*scale,outer:1.67*scale,cold:2.55*scale};}
function translatedName(b){const original=DEFAULT_BODIES.find(x=>x.id===b.id);return original&&b.name===original.name?(PT_NAMES[b.id]||b.name):b.name;}
function translatedWater(w){return PT_TERMS[w]||w;}
function initBodiesPT(){
 state.bodies=[];deepCopy(DEFAULT_BODIES).forEach((b,i)=>{b.angle=i===0?0:seededRandom(i*7.77)*Math.PI*2;state.bodies.push(b);computeDerivedNew(b);});
}
function physicalTemperatureModel(b){
 const star=primaryStar()||{luminosity:1,massEarth:333000}, lum=Math.max(.000001,star.luminosity||1);
 const albedo=clamp(b.albedo??.3,0,.95);
 // 278.3 K represents zero-albedo global equilibrium at 1 AU from one solar luminosity.
  const teq=278.3*Math.pow(lum*(1-albedo),.25)/Math.sqrt(Math.max(.0001,b.distanceAU));
 const gas=['gas','icegiant'].includes(b.kind);
 const atm=clamp(b.atmosphere??0,0,120), green=b.greenhouse??0;
  // Venus's old 465 value was a surface temperature in Celsius, not greenhouse warming.
  // NASA NSSDCA gives 737 K and near-zero diurnal range for its 92-bar atmosphere.
  const venusSurface=b.id==='venus'&&b.kind==='rocky',venusRef=DEFAULT_BODIES.find(body=>body.id==='venus');
  const venusReferenceEq=278.3*Math.pow(1-venusRef.albedo,.25)/Math.sqrt(venusRef.distanceAU);
  const greenhouse=venusSurface?(737-venusReferenceEq)*Math.sqrt(atm/92):gas?Math.min(45,Math.max(0,green)*.08+atm*.02):Math.max(0,green)*Math.min(1.8,Math.sqrt(atm+.01));
 const base=teq+greenhouse;
  const rotation=b.rotationHours===0?1000:Math.max(1,Math.abs(b.rotationHours??24));
 // Schematic thermal inertia: greater atmospheric density and surface water reduce the day/night range.
 const inertia=Math.max(0.2,1+atm*.11+(b.water||0)*1.6);
  const range=(gas?7:23)*Math.sqrt(Math.min(1000,rotation)/24)/Math.sqrt(inertia)/(venusSurface?(1+atm*.11)**2:1);
 b.equilibriumK=teq;
 b.avgK=Math.max(25,base);
 b.dayK=Math.max(25,base+range);
 b.nightK=Math.max(25,base-range);
 const surfaceWater=(b.water||0)>.003 && !gas;
 b.waterState=!surfaceWater?'Indefinido':atm<.08?'Indefinido':base<273.15?'Congelada':base>373.15?'Vaporizada':'Líquida';
 b.iceLevel=surfaceWater?clamp((273.15-base)/65,0,1):0;
 b.evapLevel=surfaceWater?clamp((base-345)/90,0,1):0;
 const hz=hzLimits();
 b.habitable=surfaceWater && b.waterState==='Líquida' && b.distanceAU>=hz.inner && b.distanceAU<=hz.outer;
 b.solarFlux=lum/Math.max(.0001,b.distanceAU*b.distanceAU);
 return b;
}
function computeDerivedNew(b){
 const isStar=b.id==='sun';
 const preset=KIND_INFO[b.kind]||KIND_INFO.rocky;
 b.texture=b.texture||preset.texture;
 if(b.recomputeRadius||b.custom){if(!isStar)b.radiusKm=preset.radiusRule(b.massEarth);else b.radiusKm=696340*Math.pow(Math.max(.02,b.massEarth/333000),.85);}
  b.recomputeRadius=false;
  const reference=b.default||DEFAULT_BODIES.find(x=>x.id===b.id);b._modelEdited=!!reference&&['kind','massEarth','distanceAU','rotationHours','atmosphere','water'].some(key=>typeof b[key]==='number'?Math.abs(b[key]-(reference[key]??0))>1e-8:b[key]!==reference[key]);
  b.composition=b.composition||compositionFromKind(b.kind,b.water||0);
 b.layers=b.layers||layersFromKind(b.kind);
 b.facts=b.facts||factsFromKind(b.kind);
 b.moons=b.moons||[];
 if(isStar){
   b.gravity=274*(b.massEarth/333000)/Math.pow(b.radiusKm/696340,2);
   b.density=1.41*(b.massEarth/333000)/Math.pow(b.radiusKm/696340,3);
   b.orbitalDays=0;b.equilibriumK=b.teff||5778;b.avgK=b.dayK=b.nightK=b.equilibriumK;
   b.waterState='Plasma';b.habitable=false;b.iceLevel=0;b.evapLevel=0;
   b.magnetosphere={type:'heliosphere',strength:1,color:'rgba(255,170,100,.55)'};
 } else {
   b.gravity=9.80665*b.massEarth/Math.pow(b.radiusKm/6371,2);
   b.density=5.51*b.massEarth/Math.pow(b.radiusKm/6371,3);
   b.orbitalDays=365.256*Math.sqrt(Math.pow(Math.max(.0001,b.distanceAU),3)/hostMassSolar());
   b.orbitalSpeedKmS=29.78*Math.sqrt(hostMassSolar()/Math.max(.0001,b.distanceAU));
   b.escapeKmS=11.186*Math.sqrt(b.massEarth/(b.radiusKm/6371));
   physicalTemperatureModel(b);
   if(b.custom)b.magnetosphere=classifyMagnetosphere(b);
   else b.magnetosphere=ORIGINAL_FIELDS[b.id]?.magnetosphere||classifyMagnetosphere(b);
 }
 return b;
}
const ORIGINAL_FIELDS={earth:{magnetosphere:{type:'earth',strength:1}},mercury:{magnetosphere:{type:'small',strength:.03}},venus:{magnetosphere:{type:'induced',strength:0}},mars:{magnetosphere:{type:'induced',strength:.02}},jupiter:{magnetosphere:{type:'giant',strength:7.5}},saturn:{magnetosphere:{type:'giant',strength:4}},uranus:{magnetosphere:{type:'tilted',strength:2}},neptune:{magnetosphere:{type:'tilted',strength:2.3}}};
function loadSystemPreset(key){
  state.systemMode=key;state.day=0;state.paused=false;state.earthLocalHour=8;showEarthTime();document.getElementById('playPauseBtn').textContent='Pausar';
 state.zoom=84;document.getElementById('zoomRange').value=84;
 if(!EXO_PRESETS[key]){
   state.selectedId='earth';initBodiesPT();
   document.getElementById('systemHint').textContent='Sistema Solar: Sol, oito planetas e luas principais.';
 } else {
   const o=EXO_PRESETS[key];
   const star=deepCopy(DEFAULT_BODIES[0]);star.name=o.host;star.massEarth=o.massSolar*333000;star.radiusKm=o.radiusSolar*696340;star.luminosity=o.luminosity;star.teff=o.teff;star.texture='sun';star.color='#eaa387';star.angle=0;star.facts=['Anã vermelha usada como estrela central neste cenário.','Massa: '+fmt(o.massSolar,3)+' massas solares; luminosidade: '+fmt(o.luminosity,6)+' luminosidades solares.','As faixas de habitabilidade são aproximações pela raiz quadrada da luminosidade.'];
   const planet={id:'exo-'+key,name:o.name,custom:false,kind:o.kind,texture:o.texture,massEarth:o.massEarth,radiusKm:o.radiusEarth*6371,distanceAU:o.au,rotationHours:o.rotationHours,albedo:o.albedo,greenhouse:18,atmosphere:o.atmosphere,water:.30,color:'#dba88a',axialTilt:12,angle:1.6,moons:[],facts:o.facts,composition:compositionFromKind(o.kind,.30),layers:layersFromKind(o.kind)};
    state.bodies=[star,planet];state.bodies.forEach(b=>b.default=deepCopy(b));
   state.bodies.forEach(computeDerivedNew);
   state.selectedId=planet.id;
   document.getElementById('systemHint').textContent='Exoplaneta confirmado; clima, rotação e textura representam hipóteses de estudo.';
 }
 populateObjectSelect();syncEditorsFromSelection();updateInfoPanel();setMode('overview');
}
function populateObjectSelectPT(){
 const select=document.getElementById('objectSelect');select.innerHTML='';
 state.bodies.forEach(b=>{const opt=document.createElement('option');opt.value=b.id;opt.textContent=translatedName(b)+(b.custom?' (criado)':'');select.appendChild(opt);});select.value=state.selectedId;
}
function getDisplayScale(W,H){
 const values=state.bodies.filter(b=>b.id!=='sun').map(b=>distanceScale(b.distanceAU));
  const outer=Math.max(...values,.01)*1.18;
 return Math.min(W*.44,H*.43)/outer * (state.zoom/84);
}
function project3DNew(x,y,z,W,H){
 const a=state.yaw,ca=Math.cos(a),sa=Math.sin(a), t=state.tilt*Math.PI/180;
 const xx=x*ca-z*sa,zz=x*sa+z*ca;
 const yy=y*Math.cos(t)-zz*Math.sin(t);
 const sc=state._viewScale||getDisplayScale(W,H);
 return {x:W*.5+xx*sc,y:H*.525+yy*sc,z:zz,scale:sc};
}
function drawHabitableZoneNew(W,H){
 const lim=hzLimits();const cx=W*.5,cy=H*.525,stretch=Math.max(.10,Math.abs(Math.sin(state.tilt*Math.PI/180)));
 const sc=state._viewScale||getDisplayScale(W,H);
 const rings=[
  {a:lim.hot,b:lim.inner,r:248,g:66,bv:54,alpha:.24},
  {a:lim.inner,b:lim.outer,r:58,g:213,bv:123,alpha:.26},
  {a:lim.outer,b:lim.cold,r:42,g:130,bv:240,alpha:.22}
 ];
 ctx.save();ctx.translate(cx,cy);
 for(const ring of rings){
  const steps=24;
  for(let j=0;j<steps;j++){
   const t=(j+.5)/steps,inner=Math.max(.01,distanceScale(lerp(ring.a,ring.b,j/steps))*sc),outer=Math.max(.02,distanceScale(lerp(ring.a,ring.b,(j+1)/steps))*sc);
   const alpha=ring.alpha*(.22+.78*Math.sin(Math.PI*t));
   ctx.fillStyle='rgba('+ring.r+','+ring.g+','+ring.bv+','+alpha.toFixed(3)+')';
   ctx.beginPath();ctx.ellipse(0,0,outer,Math.max(.05,outer*stretch),0,0,Math.PI*2);
   ctx.ellipse(0,0,inner,Math.max(.05,inner*stretch),0,0,Math.PI*2,true);ctx.fill('evenodd');
  }
  for(const rad of [ring.a,ring.b]){
   const r=Math.max(.1,distanceScale(rad)*sc);ctx.strokeStyle='rgba('+ring.r+','+ring.g+','+ring.bv+',.40)';ctx.lineWidth=.9;ctx.beginPath();ctx.ellipse(0,0,r,Math.max(.05,r*stretch),0,0,Math.PI*2);ctx.stroke();
  }
 }
 ctx.restore();
}
const ASTEROIDS=Array.from({length:540},(_,i)=>({a:2.12+seededRandom(i*6.27)*1.25,angle:seededRandom(i*35.1)*Math.PI*2,h:(seededRandom(i*9.13)-.5)*.32,size:.5+seededRandom(i*31.17)*1.0}));
function drawAsteroids(W,H){
 if(state.systemMode!=='solar'||!state.showAsteroids)return;
 ctx.save();
  for(const ast of ASTEROIDS){const radius=distanceScale(ast.a),speed=state.day/(365.256*Math.sqrt(ast.a**3))*2*Math.PI,angle=ast.angle+speed,p=project3DNew(radius*Math.cos(angle),ast.h,radius*Math.sin(angle),W,H);
 if(p.x<0||p.y<0||p.x>W||p.y>H)continue;ctx.fillStyle='rgba(197,181,158,.42)';ctx.fillRect(p.x,p.y,Math.max(.7,ast.size),Math.max(.7,ast.size));}
 ctx.restore();
}
function drawBodyDiscNew(b,pos){
 // Bodies are deliberately exaggerated for legibility; orbital distances are separately scaled.
 const W=canvas.clientWidth,H=canvas.clientHeight;
 const sun=b.id==='sun';let r=sun?clamp(9*(b.radiusKm/696340)**.3,5,15):clamp(2.9*Math.pow(b.radiusKm/6371,.36),2.4,7.8);
 r=Math.max(2,r*(state.zoom/84)**.18);
 ctx.save();ctx.translate(pos.x,pos.y);
 const col=rgbArr(b.color||'#bdd9ee');const g=ctx.createRadialGradient(0,0,1,0,0,sun?r*3:r*2);g.addColorStop(0,'rgba('+col.join(',')+','+(sun?.30:.15)+')');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,sun?r*3:r*2,0,Math.PI*2);ctx.fill();
 const img=textureImages[b.texture];if(img){ctx.save();ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();ctx.drawImage(img,-r,-r,r*2,r*2);ctx.restore();}else {ctx.fillStyle=b.color||'#cbd7ea';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();}
 ctx.strokeStyle=b.id===state.selectedId?'#b8eaff':'rgba(255,255,255,.27)';ctx.lineWidth=b.id===state.selectedId?1.5:.6;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();
 if(state.showLabels){const text=translatedName(b);ctx.textAlign='center';ctx.font='600 11px system-ui';ctx.strokeStyle='#020813';ctx.lineWidth=2.8;ctx.strokeText(text,0,-r-8);ctx.fillStyle='#e6f3ff';ctx.fillText(text,0,-r-8);}
 b._screen={x:pos.x,y:pos.y,r:Math.max(9,r)};ctx.restore();
}
function renderOverviewNew(W,H){
 if(window.PJMagnetosphere){PJMagnetosphere.beginFrame(currentBody(),state.showMagnetosphere,'overview');W=canvas.clientWidth;H=canvas.clientHeight;}
 state._viewScale=getDisplayScale(W,H);
 drawBackground(W,H);if(state.showHabitable)drawHabitableZoneNew(W,H);
 if(state.showOrbits)state.bodies.filter(b=>b.id!=='sun').forEach(b=>drawOrbit(b,W,H));
 drawAsteroids(W,H);
 const items=state.bodies.map(body=>{const dist=body.id==='sun'?0:distanceScale(body.distanceAU),x=Math.cos(body.angle||0)*dist,z=Math.sin(body.angle||0)*dist;return {body,pos:project3DNew(x,0,z,W,H)};}).sort((a,b)=>a.pos.z-b.pos.z);
 const selected=currentBody(),selectedItem=items.find(item=>item.body===selected);
 if(state.showMagnetosphere&&selectedItem&&window.PJMagnetosphere)PJMagnetosphere.overview(selected,selectedItem.pos.x,selectedItem.pos.y,9,W,H,.65);
 items.forEach(item=>drawBodyDiscNew(item.body,item.pos));
}
function drawCutawayChartNew(b){
 const c=cutCtx,w=cutCanvas.width,h=cutCanvas.height,cx=76,cy=81,R=56;
 c.clearRect(0,0,w,h);c.fillStyle='#07101b';c.fillRect(0,0,w,h);
 const shells=INTERNAL_PROFILES[b.id]||INTERNAL_PROFILES[b.kind==='gas'?'jupiter':b.kind==='icegiant'?'neptune':'earth'];
 for(let i=shells.length-1;i>=0;i--){const [rad,color]=shells[i];c.fillStyle=color;c.beginPath();c.arc(cx,cy,R*rad,0,Math.PI*2);c.fill();}
 if(b.atmosphere>.03){c.strokeStyle='rgba(132,210,255,.56)';c.lineWidth=4;c.beginPath();c.arc(cx,cy,R+3,0,Math.PI*2);c.stroke();}
 c.strokeStyle='rgba(225,238,255,.3)';c.lineWidth=1;c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.stroke();
 c.font='11px system-ui';const names=PT_LAYERS[b.id]||(['Núcleo','Manto','Camada externa','Atmosfera']);
 shells.forEach((shell,i)=>{const y=24+i*27;c.fillStyle=shell[1];c.fillRect(154,y-8,10,10);c.fillStyle='#d9e9fc';c.fillText(names[i]||'Camada '+(i+1),170,y);});
}
function temperatureC(k){return fmt(Number(k)-273.15,0)+' °C';}
function temperatureBoth(k){return temperatureC(k)+' ('+fmt(k,0)+' K)';}
function temperatureDayNight(b){return 'Dia '+temperatureC(b.dayK)+' / noite '+temperatureC(b.nightK)+' · '+fmt(b.dayK,0)+' / '+fmt(b.nightK,0)+' K';}
function updateInfoPanelPT(){
 const b=currentBody();if(!b)return;
 const name=translatedName(b),star=b.id==='sun';const lim=hzLimits();
 document.getElementById('infoName').textContent=name;
 document.getElementById('infoSubtitle').textContent=(PT_KIND[b.kind]||b.kind)+' · '+(star?'Estrela central':fmt(b.distanceAU,4)+' UA da estrela');
 const status=star?'Heliosfera':b.habitable?'Faixa de água líquida (modelo)':b.distanceAU<lim.inner?'Região interna quente':b.distanceAU>lim.outer?'Região externa fria':'Faixa temperada — condições incertas';
 const pill=document.getElementById('infoStatus');pill.textContent=status;pill.style.borderColor=b.habitable?'#3e8760':star?'#8a6a30':'#2b4366';
 const stats=[
 ['Massa',star?fmt(b.massEarth/333000,3)+' M☉':fmt(b.massEarth,3)+' M⊕'],['Raio',fmt(b.radiusKm,0)+' km'],
 ['Gravidade',fmt(b.gravity,2)+' m/s²'],['Densidade',fmt(b.density,2)+' g/cm³'],
 ['Período orbital',star?'—':fmt(b.orbitalDays,2)+' dias'],['Rotação',fmt(b.rotationHours,1)+' h'],
 ['Temp. de equilíbrio',temperatureBoth(b.equilibriumK)],['Dia / noite',star?'—':temperatureDayNight(b)],['Temperatura média',star?'—':temperatureBoth(b.avgK)],
 ['Fluxo estelar',star?'—':fmt(b.solarFlux,3)+' × Terra'],['Água superficial',star?'—':(['gas','icegiant'].includes(b.kind)?'Não se aplica':translatedWater(b.waterState))],
 ['Vel. orbital',star?'—':fmt(b.orbitalSpeedKmS,2)+' km/s'],['Vel. de escape',star?'—':fmt(b.escapeKmS,2)+' km/s'],
 ['Magnetismo',star?'Heliosfera':b.magnetosphere?.type==='induced'?'Campo induzido':'Campo ilustrativo']
 ];
 document.getElementById('statsGrid').innerHTML='';const grid=document.getElementById('statsGrid');stats.forEach(([key,val])=>{const el=document.createElement('div');el.className='stat';const small=document.createElement('div');small.className='k';small.textContent=key;const big=document.createElement('div');big.className='v';big.textContent=val;el.append(small,big);grid.appendChild(el);});
 const bars=document.getElementById('compositionBars');bars.replaceChildren();const names=PT_COMPOSITION[b.id];
 (b.composition||[]).forEach(([key,val],i)=>{const row=document.createElement('div');row.className='bar';const label=document.createElement('span');label.textContent=names?.[i]||key;const bar=document.createElement('div');bar.className='track';const fill=document.createElement('div');fill.className='fill';fill.style.width=clamp(val,0,100)+'%';bar.appendChild(fill);const value=document.createElement('strong');value.textContent=val+'%';row.append(label,bar,value);bars.appendChild(row);});
 document.getElementById('moonList').innerHTML=(b.moons?.length?b.moons.map(m=>m.name+' · raio '+fmt(m.radiusKm,0)+' km · órbita '+fmt(Math.abs(m.orbitalDays),2)+' dias').join('<br>'):'Nenhuma lua principal registrada.');
 const facts=document.getElementById('factList');facts.replaceChildren();const localized=PT_FACTS[b.id]||b.facts||[];
 [...localized,star?'A temperatura da superfície estelar depende das propriedades da estrela.':'Temperatura média estimada: '+temperatureBoth(b.avgK)+'; estado da água: '+translatedWater(b.waterState)+'.', 'Temperaturas, água e magnetismo são simplificações e não previsões científicas.'].forEach(t=>{const li=document.createElement('li');li.textContent=t;facts.appendChild(li);});
 drawTempChartPT(b);drawCutawayChartNew(b);
}
function drawTempChartPT(b){drawTempChart(b);const c=tempCtx;if(b.id==='sun'){c.fillStyle='#d8ebff';c.fillText('Estrela: sem ciclo diurno superficial.',18,82);return;}c.fillStyle='#07101b';c.fillRect(0,0,317,21);c.fillStyle='#d9efff';c.font='10px system-ui';c.fillText('Dia '+temperatureC(b.dayK),9,14);c.fillText('Noite '+temperatureC(b.nightK),108,14);c.fillText('Média '+temperatureC(b.avgK),218,14);}
const nativeLoop=loop;
loop=function(ts){
 if(loop.frameTime&&ts-loop.frameTime<40){requestAnimationFrame(loop);return;}
 loop.frameTime=ts;
 nativeLoop(ts);
};
const ORIGINAL_START=start;
start=function(){
 ORIGINAL_START();
 state.systemMode='solar';state.showAsteroids=true;
 document.getElementById('systemPreset').addEventListener('change',e=>loadSystemPreset(e.target.value));
 document.getElementById('toggleAsteroids').addEventListener('change',e=>state.showAsteroids=e.target.checked);
 document.getElementById('resetBtn').onclick=()=>loadSystemPreset(document.getElementById('systemPreset').value);
 document.getElementById('playPauseBtn').onclick=()=>{state.paused=!state.paused;document.getElementById('playPauseBtn').textContent=state.paused?'Continuar':'Pausar';};
 document.getElementById('timeSpeedValue').textContent='40 dias/s';
 document.getElementById('timeSpeed').oninput=e=>{state.timeSpeed=+e.target.value;document.getElementById('timeSpeedValue').textContent=state.timeSpeed+' dias/s';};
 document.getElementById('objectSelect').onchange=e=>{state.selectedId=e.target.value;syncEditorsFromSelection();updateInfoPanelPT();};
 document.getElementById('applyEditBtn').onclick=applyEditPT;
 document.getElementById('restoreEditBtn').onclick=restoreEditPT;
 document.getElementById('addPlanetBtn').onclick=()=>{addCustomPlanet();document.getElementById('objectSelect').value=state.selectedId;updateInfoPanelPT();};
 document.getElementById('removePlanetBtn').onclick=()=>{removeCustomPlanet();updateInfoPanelPT();};
 populateObjectSelectPT();syncEditorsFromSelection();updateInfoPanelPT();
};
const oldSyncEditors=syncEditorsFromSelection;
syncEditorsFromSelection=function(){
  const b=currentBody(),inp=document.getElementById('editMass');
  if(b?.id==='sun'){inp.min=10000;inp.max=600000;inp.step=.1;}else{inp.min=.001;inp.max=500;inp.step=.0001;}
  const distance=document.getElementById('editDistance');distance.min=b?.id==='sun'?0:.0001;distance.max=40;distance.step=.00001;distance.disabled=b?.id==='sun';
  const rotation=document.getElementById('editRotation');rotation.min=-10000;rotation.max=10000;rotation.step=.01;
  const atmosphere=document.getElementById('editAtmosphere');atmosphere.min=0;atmosphere.max=120;atmosphere.step=.001;
  document.getElementById('editKind').disabled=b?.id==='sun';
 oldSyncEditors();
  if(b?.id==='sun'){distance.value=0;document.getElementById('editMassValue').textContent=fmt(b.massEarth/333000,3)+' M☉';}
  document.getElementById('editDistanceValue').textContent=fmt(b?.distanceAU||0,5)+' UA';
};
const ORIGINAL_INIT_BODIES=initBodies;initBodies=initBodiesPT;
const ORIGINAL_COMPUTE_DERIVED=computeDerived;computeDerived=computeDerivedNew;
const ORIGINAL_POPULATE=populateObjectSelect;populateObjectSelect=populateObjectSelectPT;
const ORIGINAL_PROJECT=project3D;project3D=project3DNew;
const ORIGINAL_OVERVIEW=renderOverview;renderOverview=renderOverviewNew;
const ORIGINAL_HABITABLE=drawHabitableZone;drawHabitableZone=drawHabitableZoneNew;
const ORIGINAL_UPDATE_INFO=updateInfoPanel;updateInfoPanel=updateInfoPanelPT;
const ORIGINAL_DRAW_CUT=drawCutawayChart;drawCutawayChart=drawCutawayChartNew;
const ORIGINAL_MAKE_CUSTOM=makeCustomPlanet;
makeCustomPlanet=function(name){const b=ORIGINAL_MAKE_CUSTOM(name);b.facts=['Planeta fictício criado no laboratório.','Altere as propriedades e observe as previsões simplificadas.'];b.recomputeRadius=true;computeDerivedNew(b);b.default=deepCopy(b);return b;};
function applyEditPT(){
  const b=currentBody();if(!b)return;const beforeMass=b.massEarth,beforeKind=b.kind;const kind=b.id==='sun'?'star':document.getElementById('editKind').value,p=KIND_INFO[kind]||KIND_INFO.rocky;
 b.name=document.getElementById('editName').value.trim()||b.name;b.kind=kind;b.texture=document.getElementById('editTexture').value;
 b.massEarth=+document.getElementById('editMass').value;b.distanceAU=b.id==='sun'?0:+document.getElementById('editDistance').value;
 b.rotationHours=+document.getElementById('editRotation').value;b.atmosphere=+document.getElementById('editAtmosphere').value;b.water=+document.getElementById('editWater').value/100;
  const massChanged=Math.abs(b.massEarth-beforeMass)>Math.max(1e-8,Math.abs(beforeMass)*1e-10);
  if(b.id==='sun'&&massChanged){
    const ratio=b.massEarth/beforeMass;b.luminosity=Math.max(.000001,(b.luminosity||1)*ratio**3.5);b.radiusKm*=ratio**.8;b.teff=(b.teff||5778)*ratio**.475;
  }else if(b.id!=='sun'){b.recomputeRadius=massChanged||kind!==beforeKind;}
  if(kind!==beforeKind){b.albedo=p.albedo;b.greenhouse=p.greenhouse;b.layers=layersFromKind(kind);b.composition=compositionFromKind(kind,b.water);}
  else if(b.custom)b.composition=compositionFromKind(kind,b.water);
 computeDerivedNew(b);if(b.id==='sun')state.bodies.filter(x=>x.id!=='sun').forEach(computeDerivedNew);
  populateObjectSelectPT();document.getElementById('objectSelect').value=b.id;syncEditorsFromSelection();focusCache.key='';updateInfoPanelPT();
}
function restoreEditPT(){const b=currentBody();if(!b)return;const original=b.default||DEFAULT_BODIES.find(x=>x.id===b.id);if(!original)return;const restored=Object.assign(deepCopy(original),{angle:b.angle||0});if(b.default)restored.default=deepCopy(b.default);state.bodies[state.bodies.indexOf(b)]=restored;computeDerivedNew(restored);if(restored.id==='sun')state.bodies.filter(x=>x.id!=='sun').forEach(computeDerivedNew);populateObjectSelectPT();syncEditorsFromSelection();focusCache.key='';updateInfoPanelPT();}
const originalDrawTempChart=drawTempChart;
const ORIGINAL_RENDER_FOCUS=renderFocus;
const focusCache={key:'',canvas:null};
const originalRenderSphere=renderSphere;
renderSphere=function(b,size=340){
  const spin=rotationTurns(b);
  const key=[b.id,b.kind,b.texture,Math.round(spin*360),state.focusYaw.toFixed(3),state.focusPitch.toFixed(3),state.showTemperature,state.showCutaway,state.showNightLights,state.showAtmosphereSlice,b.axialTilt,b.dayK,b.nightK,b.atmosphere,b.iceLevel,b.evapLevel,Math.min(300,size)].join('|');
 if(focusCache.key===key&&focusCache.canvas)return focusCache.canvas;
 focusCache.canvas=originalRenderSphere(b,Math.min(300,size));focusCache.key=key;return focusCache.canvas;
};


const NEW_MOONS={
 jupiter:[['Amalteia',84,2.55,.498],['Himalia',85,160,250.6]],
 saturn:[['Mimas',198,3.2,.94],['Tétis',531,5.05,1.888],['Dione',561,6.47,2.74],['Reia',764,8.74,4.518],['Jápeto',734,61.7,79.3]],
 uranus:[['Ariel',579,7.55,2.52],['Umbriel',585,10.5,4.14],['Oberon',761,22.8,13.46]],
 neptune:[['Proteu',210,4.8,1.12],['Nereida',170,223.0,360.0]]
};
DEFAULT_BODIES.forEach(b=>{const more=NEW_MOONS[b.id];if(more)more.forEach(m=>b.moons.push({name:m[0],radiusKm:m[1],distanceRadii:m[2],orbitalDays:m[3],texture:'moon',color:'#c1bfba'}));});
const baseDrawMag=drawMagnetosphereShape;
drawMagnetosphereShape=function(b,x,y,rw,rh,alpha=1){
 // Tail shapes retain planet-specific width / orientation; this is an illustrative diagram.
 const tilt=(b.id==='uranus'?1.0:b.id==='neptune'?.65:b.id==='mercury'?.12:0);
 const factor=b.id==='jupiter'?1.38:b.id==='saturn'?1.24:b.id==='mercury'?.68:b.id==='venus'?.88:b.id==='mars'?.76:1;
 ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.translate(-x,-y);
 baseDrawMag(b,x,y,rw*factor,rh*(b.id==='jupiter'?1.2:1),alpha);
 ctx.restore();
};


// --- Online planetary materials, embedded fallback, and a clearly timed Earth day/night cycle ---
const ONLINE_MAPS = {
 sun:'https://cloud.solarsystemscope.com/textures/download/2k_sun.jpg',
 mercury:'https://cloud.solarsystemscope.com/textures/download/2k_mercury.jpg',
 venus:'https://cloud.solarsystemscope.com/textures/download/2k_venus_atmosphere.jpg',
 earth:'https://cloud.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
 earthNight:'https://cloud.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg',
 mars:'https://cloud.solarsystemscope.com/textures/download/2k_mars.jpg',
 jupiter:'https://cloud.solarsystemscope.com/textures/download/2k_jupiter.jpg',
 saturn:'https://cloud.solarsystemscope.com/textures/download/2k_saturn.jpg',
 uranus:'https://cloud.solarsystemscope.com/textures/download/2k_uranus.jpg',
 neptune:'https://cloud.solarsystemscope.com/textures/download/2k_neptune.jpg',
 moon:'https://cloud.solarsystemscope.com/textures/download/2k_moon.jpg'
};
const BACKUP_ONLINE_ROOT='https://raw.githubusercontent.com/sudoaanish/COSMOS/master/assets/textures/';
const textureMapState={online:new Set(),pending:new Set(),failed:new Set(),generation:0};
const onlineStatus=document.getElementById('onlineTextureStatus');
const onlineCount=document.getElementById('onlineTextureCount');
function updateOnlineStatus(){
 onlineCount.textContent=textureMapState.online.size+'/11';
 const count=textureMapState.online.size, pending=textureMapState.pending.size;
 if(count===11) onlineStatus.textContent='11 mapas online ativos, incluindo Terra de dia e à noite.';
 else if(pending) onlineStatus.textContent='Mapas integrados visíveis. '+count+' mapa(s) online ativo(s); '+pending+' a carregar…';
 else if(count) onlineStatus.textContent=count+' mapa(s) online ativo(s). Os restantes usam mapas integrados sem internet.';
 else onlineStatus.textContent='Mapas integrados ativos. As fontes online não responderam ou foram bloqueadas (CORS/rede).';
}
function mapSecondaryURL(key){
 if(key==='earthNight')return null;
 const names={sun:'sun',mercury:'mercury',venus:'venus',earth:'earth',mars:'mars',jupiter:'jupiter',saturn:'saturn',uranus:'uranus',neptune:'neptune',moon:'moon'};
 return names[key]?BACKUP_ONLINE_ROOT+names[key]+'-2k.jpg':null;
}
function onlineTextureLoad(key,url,generation,retryFallback){
 const img=new Image(); img.crossOrigin='anonymous'; img.decoding='async';
 const timeout=setTimeout(()=>{img.onload=null;img.onerror=null; failed();},14500);
 function failed(){clearTimeout(timeout);if(generation!==textureMapState.generation)return;
   if(!retryFallback){const backup=mapSecondaryURL(key);if(backup){onlineTextureLoad(key,backup,generation,true);return;}}
   textureMapState.pending.delete(key);textureMapState.failed.add(key);updateOnlineStatus();
 }
 img.onerror=failed;
 img.onload=()=>{
  clearTimeout(timeout);
  if(generation!==textureMapState.generation)return;
  try{
   // Drawing to a canvas and reading pixels is the CORS test. A successful <img> isn't enough.
   const off=document.createElement('canvas');
   const mobile=innerWidth<740;
   const w=Math.min(img.naturalWidth,mobile?1024:2048);
   off.width=w;off.height=Math.max(1,Math.round(w*img.naturalHeight/img.naturalWidth));
   const c=off.getContext('2d',{willReadFrequently:true}); c.drawImage(img,0,0,off.width,off.height);
   const data=c.getImageData(0,0,off.width,off.height);
   texturePixels[key]={w:off.width,h:off.height,data:data.data};
   textureImages[key]=off;
   textureMapState.online.add(key);textureMapState.failed.delete(key);textureMapState.pending.delete(key);
   if(typeof focusCache!=='undefined'){focusCache.key='';focusCache.canvas=null;}
   updateOnlineStatus();
  }catch(err){failed();}
 };
 img.src=url;
}
function loadRemotePlanetTextures(){
 const generation=++textureMapState.generation;
 textureMapState.pending=new Set(Object.keys(ONLINE_MAPS));textureMapState.failed.clear();
 updateOnlineStatus();
 // Prioritize selected world, its night layer, and all planets in the overview.
 const keys=['earth','earthNight','sun','moon','mars','jupiter','saturn','mercury','venus','uranus','neptune'];
 keys.forEach(key=>onlineTextureLoad(key,ONLINE_MAPS[key],generation,false));
}
state.earthLocalHour=8;state.earthCycleEnabled=true;
function showEarthTime(){
  const h=((state.earthLocalHour%24)+24)%24,totalMinutes=Math.round(h*60)%1440;
  const hours=String(Math.floor(totalMinutes/60)).padStart(2,'0'),minutes=String(totalMinutes%60).padStart(2,'0');
 document.getElementById('earthHourText').textContent=hours+':'+minutes;
 const slider=document.getElementById('earthHourRange');if(document.activeElement!==slider)slider.value=h;
}
const earthOriginalUpdate=updateSimulation;
updateSimulation=function(dt){
 earthOriginalUpdate(dt);
  if(state.earthCycleEnabled&&state.timeSpeed>0){state.earthLocalHour=(state.earthLocalHour+dt*.6)%24;showEarthTime();}
};
const earthOriginalStart=start;
start=function(){
 earthOriginalStart();
 document.getElementById('toggleEarthCycle').addEventListener('change',e=>{state.earthCycleEnabled=e.target.checked;});
 document.getElementById('earthHourRange').addEventListener('input',e=>{state.earthLocalHour=+e.target.value;showEarthTime();focusCache.key='';});
 document.getElementById('retryOnlineTextures').addEventListener('click',loadRemotePlanetTextures);
 showEarthTime();loadRemotePlanetTextures();
 setInterval(()=>{if(state.selectedId==='earth'&&document.visibilityState!=='hidden')drawTempChartPT(currentBody());},700);
};
// The extra chart marker shows where the current Earth cycle sits in the graph.
const baseDrawTempPT=drawTempChartPT;
drawTempChartPT=function(b){
 baseDrawTempPT(b);
 if(b.id!=='earth')return;
 const hour=state.earthLocalHour;
 const x=40+(tempCanvas.width-60)*(hour/24);
 tempCtx.strokeStyle='rgba(255,225,134,.95)';tempCtx.lineWidth=1.4;
 tempCtx.beginPath();tempCtx.moveTo(x,24);tempCtx.lineTo(x,128);tempCtx.stroke();
 tempCtx.fillStyle='#fbe29d';tempCtx.font='bold 10px system-ui';tempCtx.fillText('Hora '+document.getElementById('earthHourText').textContent,165,145);
};

loadTextures();
