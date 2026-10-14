
/* Exploração 360° — Street View em nova aba; mapa OpenStreetMap via OpenFreeMap. */
(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const stage = byId('earth-stage');
  if (!stage) return;
  const regionsContainer = byId('earth-regions');
  const startBtn = byId('earth-start');
  const nextBtn = byId('earth-next');
  const restartBtn = byId('earth-restart');
  const submitBtn = byId('earth-submit');
  const clearBtn = byId('earth-clear-guess');
  const toggleBtn = byId('earth-map-toggle');
  const statusEl = byId('earth-status');
  const resultBox = byId('earth-result');
  const finalBox = byId('earth-final');
  const viewLink = byId('earth-open-view');
  const viewTitle = byId('earth-view-title');
  const viewInstructions = byId('earth-view-instructions');
  const durationField = byId('earth-duration');
  const roundsField = byId('earth-round-count');
  const timeLabel = byId('earth-timer');
  const scoreLabel = byId('earth-total');
  const roundLabel = byId('earth-round-label');
  const timeFill = byId('earth-timer-progress');
  const timeTrack = byId('earth-time-track');
  const maxRoundScore = 5000;

  const rawSeeds = `
  europe|51.5074|-0.1278|Londres
  europe|53.4808|-2.2426|Manchester
  europe|55.9533|-3.1883|Edimburgo
  europe|53.3498|-6.2603|Dublin
  europe|48.8566|2.3522|Paris
  europe|45.7640|4.8357|Lyon
  europe|43.2965|5.3698|Marselha
  europe|52.5200|13.4050|Berlim
  europe|48.1351|11.5820|Munique
  europe|53.5511|9.9937|Hamburgo
  europe|50.1109|8.6821|Frankfurt
  europe|41.9028|12.4964|Roma
  europe|45.4642|9.1900|Milão
  europe|40.8518|14.2681|Nápoles
  europe|43.7696|11.2558|Florença
  europe|40.4168|-3.7038|Madri
  europe|41.3874|2.1686|Barcelona
  europe|37.3891|-5.9845|Sevilha
  europe|39.4699|-0.3763|Valência
  europe|38.7223|-9.1393|Lisboa
  europe|41.1579|-8.6291|Porto
  europe|52.3676|4.9041|Amsterdã
  europe|51.9244|4.4777|Roterdã
  europe|50.8503|4.3517|Bruxelas
  europe|51.2194|4.4025|Antuérpia
  europe|46.2044|6.1432|Genebra
  europe|47.3769|8.5417|Zurique
  europe|48.2082|16.3738|Viena
  europe|47.0707|15.4395|Graz
  europe|50.0755|14.4378|Praga
  europe|49.1951|16.6068|Brno
  europe|52.2297|21.0122|Varsóvia
  europe|50.0647|19.9450|Cracóvia
  europe|47.4979|19.0402|Budapeste
  europe|44.4268|26.1025|Bucareste
  europe|46.7712|23.6236|Cluj-Napoca
  europe|42.6977|23.3219|Sofia
  europe|41.9981|21.4254|Escópia
  europe|44.7866|20.4489|Belgrado
  europe|45.8150|15.9819|Zagreb
  europe|46.0569|14.5058|Liubliana
  europe|43.8563|18.4131|Sarajevo
  europe|42.4304|19.2594|Podgorica
  europe|41.3275|19.8187|Tirana
  europe|37.9838|23.7275|Atenas
  europe|40.6401|22.9444|Salônica
  europe|35.1856|33.3823|Nicósia
  europe|59.3293|18.0686|Estocolmo
  europe|57.7089|11.9746|Gotemburgo
  europe|59.9139|10.7522|Oslo
  europe|60.3913|5.3221|Bergen
  europe|55.6761|12.5683|Copenhague
  europe|60.1699|24.9384|Helsinque
  europe|59.4370|24.7536|Tallinn
  europe|56.9496|24.1052|Riga
  europe|54.6872|25.2797|Vilnius
  europe|64.1466|-21.9426|Reykjavík
  europe|35.8992|14.5141|Valeta
  europe|42.5063|1.5218|Andorra la Vella
  europe|43.7384|7.4246|Mônaco
  europe|43.9424|12.4578|San Marino
  europe|46.1000|14.3500|Campo da Eslovênia

  north-america|40.7128|-74.0060|Nova York
  north-america|34.0522|-118.2437|Los Angeles
  north-america|41.8781|-87.6298|Chicago
  north-america|37.7749|-122.4194|São Francisco
  north-america|47.6062|-122.3321|Seattle
  north-america|38.9072|-77.0369|Washington
  north-america|42.3601|-71.0589|Boston
  north-america|25.7617|-80.1918|Miami
  north-america|29.7604|-95.3698|Houston
  north-america|32.7767|-96.7970|Dallas
  north-america|39.7392|-104.9903|Denver
  north-america|36.1699|-115.1398|Las Vegas
  north-america|33.4484|-112.0740|Phoenix
  north-america|35.2271|-80.8431|Charlotte
  north-america|39.9526|-75.1652|Filadélfia
  north-america|32.7157|-117.1611|San Diego
  north-america|43.6532|-79.3832|Toronto
  north-america|45.5017|-73.5673|Montreal
  north-america|49.2827|-123.1207|Vancouver
  north-america|51.0447|-114.0719|Calgary
  north-america|53.5461|-113.4938|Edmonton
  north-america|45.4215|-75.6972|Ottawa
  north-america|19.4326|-99.1332|Cidade do México
  north-america|20.6597|-103.3496|Guadalajara
  north-america|25.6866|-100.3161|Monterrey
  north-america|21.1619|-86.8515|Cancún
  north-america|32.5149|-117.0382|Tijuana
  north-america|19.0414|-98.2063|Puebla

  central-america|17.4995|-88.1976|Cidade de Belize
  central-america|17.2520|-88.7737|Belmopan
  central-america|14.6349|-90.5069|Cidade da Guatemala
  central-america|14.5595|-90.7344|Antígua Guatemala
  central-america|14.0723|-87.1921|Tegucigalpa
  central-america|15.5042|-88.0250|San Pedro Sula
  central-america|13.6929|-89.2182|San Salvador
  central-america|13.9946|-89.5597|Santa Ana
  central-america|12.1149|-86.2362|Manágua
  central-america|12.4356|-86.8794|León
  central-america|9.9281|-84.0907|San José
  central-america|10.0024|-84.1165|Heredia
  central-america|8.9824|-79.5199|Cidade do Panamá
  central-america|8.4273|-82.4309|David

  south-america|-23.5505|-46.6333|São Paulo
  south-america|-22.9068|-43.1729|Rio de Janeiro
  south-america|-15.7939|-47.8828|Brasília
  south-america|-12.9777|-38.5016|Salvador
  south-america|-3.7319|-38.5267|Fortaleza
  south-america|-30.0346|-51.2177|Porto Alegre
  south-america|-34.6037|-58.3816|Buenos Aires
  south-america|-31.4201|-64.1888|Córdoba
  south-america|-32.8895|-68.8458|Mendoza
  south-america|-33.4489|-70.6693|Santiago
  south-america|-33.0472|-71.6127|Valparaíso
  south-america|-12.0464|-77.0428|Lima
  south-america|-13.5319|-71.9675|Cusco
  south-america|4.7110|-74.0721|Bogotá
  south-america|6.2442|-75.5812|Medellín
  south-america|3.4516|-76.5320|Cali
  south-america|-0.1807|-78.4678|Quito
  south-america|-2.1709|-79.9224|Guayaquil
  south-america|-16.4897|-68.1193|La Paz
  south-america|-17.7833|-63.1821|Santa Cruz
  south-america|-25.2637|-57.5759|Assunção
  south-america|-34.9011|-56.1645|Montevidéu
  south-america|10.4806|-66.9036|Caracas
  south-america|10.6667|-61.5189|Port of Spain

  caribbean|18.4861|-69.9312|Santo Domingo
  caribbean|19.4517|-70.6970|Santiago de los Caballeros
  caribbean|18.0179|-76.8099|Kingston
  caribbean|18.1096|-77.2975|Mandeville
  caribbean|25.0443|-77.3504|Nassau
  caribbean|23.1136|-82.3666|Havana
  caribbean|20.0247|-75.8219|Santiago de Cuba
  caribbean|18.4655|-66.1057|San Juan
  caribbean|13.1000|-59.6167|Bridgetown
  caribbean|12.0561|-61.7488|Saint George's

  africa|-33.9249|18.4241|Cidade do Cabo
  africa|-26.2041|28.0473|Joanesburgo
  africa|-29.8587|31.0218|Durban
  africa|-25.7479|28.2293|Pretória
  africa|-33.9608|25.6022|Gqeberha
  africa|-22.5609|17.0658|Windhoek
  africa|-24.6282|25.9231|Gaborone
  africa|-17.8252|31.0335|Harare
  africa|-15.3875|28.3228|Lusaka
  africa|-1.2921|36.8219|Nairóbi
  africa|-4.0435|39.6682|Mombasa
  africa|-6.7924|39.2083|Dar es Salaam
  africa|-0.3476|32.5825|Kampala
  africa|-1.9441|30.0619|Kigali
  africa|5.6037|-0.1870|Acra
  africa|6.5244|3.3792|Lagos
  africa|9.0765|7.3986|Abuja
  africa|14.7167|-17.4677|Dacar
  africa|33.5731|-7.5898|Casablanca
  africa|34.0209|-6.8416|Rabat
  africa|31.6295|-7.9811|Marrakech
  africa|36.8065|10.1815|Túnis
  africa|36.7538|3.0588|Argel
  africa|30.0444|31.2357|Cairo
  africa|31.2001|29.9187|Alexandria
  africa|-20.1609|57.5012|Port Louis

  middle-east|25.2048|55.2708|Dubai
  middle-east|24.4539|54.3773|Abu Dhabi
  middle-east|25.2854|51.5310|Doha
  middle-east|26.2235|50.5876|Manama
  middle-east|24.7136|46.6753|Riad
  middle-east|21.4858|39.1925|Jidá
  middle-east|23.5880|58.3829|Mascate
  middle-east|29.3759|47.9774|Cidade do Kuwait
  middle-east|31.9539|35.9106|Amã
  middle-east|32.0853|34.7818|Tel Aviv
  middle-east|31.7683|35.2137|Jerusalém
  middle-east|41.0082|28.9784|Istambul
  middle-east|39.9334|32.8597|Ancara
  middle-east|38.4237|27.1428|Esmirna

  asia|35.6762|139.6503|Tóquio
  asia|34.6937|135.5023|Osaka
  asia|35.1815|136.9066|Nagoya
  asia|43.0618|141.3545|Sapporo
  asia|37.5665|126.9780|Seul
  asia|35.1796|129.0756|Busan
  asia|25.0330|121.5654|Taipé
  asia|22.6273|120.3014|Kaohsiung
  asia|22.3193|114.1694|Hong Kong
  asia|1.3521|103.8198|Singapura
  asia|3.1390|101.6869|Kuala Lumpur
  asia|5.4164|100.3327|George Town
  asia|13.7563|100.5018|Bangcoc
  asia|18.7883|98.9853|Chiang Mai
  asia|10.8231|106.6297|Cidade de Ho Chi Minh
  asia|21.0278|105.8342|Hanói
  asia|11.5564|104.9282|Phnom Penh
  asia|17.9757|102.6331|Vientiane
  asia|14.5995|120.9842|Manila
  asia|10.3157|123.8854|Cebu
  asia|-6.2088|106.8456|Jacarta
  asia|-7.2575|112.7521|Surabaya
  asia|-8.6705|115.2126|Denpasar
  asia|28.6139|77.2090|Nova Délhi
  asia|19.0760|72.8777|Mumbai
  asia|12.9716|77.5946|Bengaluru
  asia|22.5726|88.3639|Calcutá
  asia|27.7172|85.3240|Catmandu
  asia|23.8103|90.4125|Daca
  asia|6.9271|79.8612|Colombo
  asia|33.6844|73.0479|Islamabad
  asia|31.5204|74.3587|Lahore
  asia|24.8607|67.0011|Carachi
  asia|47.9184|106.9177|Ulan Bator
  asia|43.2389|76.8897|Almaty
  asia|41.2995|69.2401|Tashkent

  oceania|-33.8688|151.2093|Sydney
  oceania|-37.8136|144.9631|Melbourne
  oceania|-27.4698|153.0251|Brisbane
  oceania|-31.9505|115.8605|Perth
  oceania|-34.9285|138.6007|Adelaide
  oceania|-35.2809|149.1300|Canberra
  oceania|-42.8821|147.3272|Hobart
  oceania|-12.4634|130.8456|Darwin
  oceania|-36.8509|174.7645|Auckland
  oceania|-41.2866|174.7756|Wellington
  oceania|-43.5321|172.6362|Christchurch
  oceania|-45.8788|170.5028|Dunedin
  oceania|-17.7765|177.4356|Nadi
  oceania|-18.1416|178.4419|Suva
  oceania|-9.4438|147.1803|Port Moresby
  `;
  const seeds = rawSeeds.trim().split('\n').map(s => {
    const [region, lat, lng, name] = s.trim().split('|');
    return {region, lat:Number(lat), lng:Number(lng), name};
  }).filter(s => Number.isFinite(s.lat) && Number.isFinite(s.lng));



  let selectedRegions = new Set(), mode = 'setup';
  let map = null; // MapLibre rendering of OpenStreetMap data, hosted by OpenFreeMap.
  let guessMarker=null, actualMarker=null;
  let guess = null, actual = null, currentSeed = null;
  let roundsTotal = 5, round = 0, total = 0, duration = 180;
  let deadline = 0, timer = null, usedSeeds = new Set(), history = [], mapHidden = false;

  function status(message, error=false) {
    statusEl.textContent = message;
    statusEl.style.color = error ? '#fda4af' : '#fecdd3';
  }
  function setRegionsEnabled(enabled) {
    regionsContainer.querySelectorAll('button').forEach(button => button.disabled = !enabled);
    durationField.disabled = !enabled;
    roundsField.disabled = !enabled;
  }
  function paintRegions() {
    regionsContainer.querySelectorAll('button').forEach(button => {
      const region = button.dataset.region;
      button.setAttribute('aria-pressed', String(region === 'all' ? !selectedRegions.size : selectedRegions.has(region)));
    });
  }
  function getSeedPool() {
    return selectedRegions.size ? seeds.filter(seed => selectedRegions.has(seed.region)) : seeds;
  }
  function clearTimer() {
    if (timer !== null) { window.clearInterval(timer); timer = null; }
  }
  function formatTime(seconds) {
    const s = Math.max(0, Math.ceil(seconds || 0));
    return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }
  function updateTime(seconds) {
    if (!duration) {
      timeLabel.textContent = '∞';
      timeFill.style.width = '100%';
      timeTrack.setAttribute('aria-valuenow', '100');
      return;
    }
    const remaining = Math.max(0, seconds);
    timeLabel.textContent = formatTime(remaining);
    const pct = Math.max(0, Math.min(100, remaining / duration * 100));
    timeFill.style.width = `${pct}%`;
    timeTrack.setAttribute('aria-valuenow', String(Math.round(pct)));
  }
  function haversine(a,b) {
    const rad = Math.PI/180;
    const lat = (b.lat-a.lat)*rad, lng=(b.lng-a.lng)*rad;
    const h=Math.sin(lat/2)**2 + Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(lng/2)**2;
    return 6371.0088 * 2 * Math.asin(Math.min(1,Math.sqrt(h)));
  }
  function scoreDistance(km) {
    const scale = selectedRegions.size === 0 ? 1900 :
      selectedRegions.size === 1 && selectedRegions.has('central-america') ? 380 :
      selectedRegions.size === 1 && selectedRegions.has('caribbean') ? 490 :
      selectedRegions.size === 1 && selectedRegions.has('europe') ? 850 :
      selectedRegions.size === 1 && selectedRegions.has('middle-east') ? 700 :
      selectedRegions.size === 1 && selectedRegions.has('north-america') ? 1200 :
      selectedRegions.size === 1 && selectedRegions.has('south-america') ? 1050 :
      selectedRegions.size === 1 && selectedRegions.has('africa') ? 1400 :
      selectedRegions.size === 1 && selectedRegions.has('oceania') ? 1350 :
      selectedRegions.size === 1 && selectedRegions.has('asia') ? 1550 : 1800;
    return Math.max(0, Math.min(maxRoundScore, Math.round(maxRoundScore*Math.exp(-km/scale))));
  }
  const regionBounds = {
    europe:[-27,30,60,74], 'north-america':[-170,7,-50,76],
    'central-america':[-94,5,-75,24], 'south-america':[-85,-58,-33,14],
    caribbean:[-88,7,-54,29], africa:[-20,-37,55,39],
    'middle-east':[23,11,64,44], asia:[25,-12,180,80],
    oceania:[100,-49,179,10]
  };
  function clearAnswerLine() {
    if(!map || !map.isStyleLoaded())return;
    if(map.getLayer('earth-answer-line'))map.removeLayer('earth-answer-line');
    if(map.getSource('earth-answer-line'))map.removeSource('earth-answer-line');
  }
  function markerElement(actualMarker=false) {
    const element=document.createElement('div');
    element.className=actualMarker?'earth-map-pin actual':'earth-map-pin';
    element.title=actualMarker?'Local de referência':'Seu palpite (arraste para ajustar)';
    return element;
  }
  function removeMapMarkers() {
    if(guessMarker){guessMarker.remove();guessMarker=null;}
    if(actualMarker){actualMarker.remove();actualMarker=null;}
    clearAnswerLine();
  }
  function viewRegion() {
    if(!map)return;
    if(selectedRegions.size===1){
      const bounds=regionBounds[[...selectedRegions][0]];
      if(bounds){
        map.fitBounds([[bounds[0],bounds[1]],[bounds[2],bounds[3]]], {padding:22,duration:0,maxZoom:7});
        return;
      }
    }
    map.jumpTo({center:[0,15],zoom:1.1,bearing:0,pitch:0});
  }
  function resetMap() {
    guess=null;
    removeMapMarkers();
    viewRegion();
  }
  function setGuess(location) {
    if(mode!=='playing' || !location)return;
    const lng=Number(location.lng), lat=Number(location.lat);
    if(!Number.isFinite(lat)||!Number.isFinite(lng))return;
    guess={lng:((lng+180)%360+360)%360-180,lat:Math.min(85,Math.max(-85,lat))};
    if(!guessMarker){
      guessMarker=new maplibregl.Marker({element:markerElement(false),draggable:true})
        .setLngLat([guess.lng,guess.lat]).addTo(map);
      guessMarker.on('dragend',()=>setGuess(guessMarker.getLngLat()));
    }else guessMarker.setLngLat([guess.lng,guess.lat]);
    submitBtn.disabled=false;clearBtn.disabled=false;
  }
  function setMapHidden(hidden) {
    mapHidden=Boolean(hidden);
    stage.classList.toggle('earth-map-hidden',mapHidden);
    toggleBtn.querySelector('span').textContent=mapHidden?'Mostrar mapa':'Ocultar mapa';
    if(!mapHidden&&map)window.setTimeout(()=>map.resize(),80);
  }
  function showActualOnMap() {
    if(!actual||!map)return;
    if(actualMarker){actualMarker.remove();actualMarker=null;}
    actualMarker=new maplibregl.Marker({element:markerElement(true)})
      .setLngLat([actual.lng,actual.lat]).addTo(map);
    if(guess){
      // Render shortest crossing of the antimeridian when necessary.
      let aLng=guess.lng,bLng=actual.lng;
      if(Math.abs(aLng-bLng)>180) {
        if(aLng<bLng)aLng+=360;
        else bLng+=360;
      }
      const coords=[[aLng,guess.lat],[bLng,actual.lat]];
      const lineData={type:'Feature',properties:{},geometry:{type:'LineString',coordinates:coords}};
      const drawLine=()=>{
        clearAnswerLine();
        map.addSource('earth-answer-line',{type:'geojson',data:lineData});
        map.addLayer({id:'earth-answer-line',type:'line',source:'earth-answer-line',
          paint:{'line-color':'#fda4af','line-width':3,'line-dasharray':[2,1.5]}});
      };
      if(map.isStyleLoaded())drawLine();else map.once('load',drawLine);
      map.fitBounds([[Math.min(aLng,bLng),Math.min(guess.lat,actual.lat)],
                     [Math.max(aLng,bLng),Math.max(guess.lat,actual.lat)]],
                    {padding:42,duration:400,maxZoom:12});
    }else map.easeTo({center:[actual.lng,actual.lat],zoom:7,duration:400});
  }
  function reveal(expired=false) {
    if(mode!=='playing') return;
    clearTimer();
    mode='revealed';
    submitBtn.disabled=true;
    clearBtn.disabled=true;
    setMapHidden(false);
    const distance=(!expired && guess) ? haversine(guess,actual) : null;
    const points=distance==null ? 0 : scoreDistance(distance);
    total+=points;
    scoreLabel.textContent=total.toLocaleString('pt-BR');
    history.push({seed:currentSeed.name,distance,points,expired});
    showActualOnMap();
    byId('earth-result-heading').textContent=expired ? 'Tempo esgotado! Este era o local aproximado.' : 'Palpite confirmado!';
    byId('earth-distance').textContent=distance==null?'—':
      distance<1?`${Math.round(distance*1000)} m`:`${Math.round(distance).toLocaleString('pt-BR')} km`;
    byId('earth-points').textContent=`${points.toLocaleString('pt-BR')} / 5.000`;
    nextBtn.textContent=round>=roundsTotal?'Ver resultado final':'Próxima rodada';
    resultBox.classList.remove('hidden');
    status(expired ? 'Tempo esgotado. O ponto de referência está em verde.' :
      'Rosa: seu palpite. Verde: ponto de referência do panorama inicial. A distância é aproximada.');
    updateTime(expired?0:Math.max(0,(deadline-Date.now())/1000));
  }
  function startClock() {
    clearTimer();
    if(!duration){updateTime(0);return;}
    deadline=Date.now()+duration*1000;
    updateTime(duration);
    timer=window.setInterval(()=>{
      if(mode!=='playing')return;
      const remaining=(deadline-Date.now())/1000;
      updateTime(remaining);
      if(remaining<=0)reveal(true);
    },250);
  }
  function nextSeed() {
    const pool=getSeedPool();
    const options=pool.filter(seed=>!usedSeeds.has(seed));
    if(!options.length){usedSeeds.clear();return nextSeed();}
    const seed=options[Math.floor(Math.random()*options.length)];
    usedSeeds.add(seed);
    return seed;
  }
  function streetViewUrl(location) {
    // This is the public Google Maps URLs scheme: no key or JS API required.
    const coords=`${location.lat.toFixed(6)},${location.lng.toFixed(6)}`;
    const heading=Math.floor(Math.random()*360);
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${encodeURIComponent(coords)}&heading=${heading}&pitch=0&fov=85`;
  }
  function newRound() {
    mode='playing';
    round++;
    roundLabel.textContent=`${round} / ${roundsTotal}`;
    resultBox.classList.add('hidden');
    finalBox.classList.add('hidden');
    resetMap();
    submitBtn.disabled=true;
    clearBtn.disabled=true;
    toggleBtn.disabled=false;
    setMapHidden(false);
    currentSeed=nextSeed();
    // Stay near urban seed points to increase the chance of Street View coverage.
    const latitude=currentSeed.lat+(Math.random()-.5)*.003;
    const longitude=currentSeed.lng+(Math.random()-.5)*.003/Math.max(.4,Math.cos(currentSeed.lat*Math.PI/180));
    actual={lat:latitude,lng:longitude};
    viewLink.href=streetViewUrl(actual);
    viewLink.classList.remove('hidden');
    viewTitle.textContent=`Rodada ${round} de ${roundsTotal}`;
    viewInstructions.textContent='Clique no botão para explorar o lugar no Google Street View. Volte aqui para marcar onde você acha que ele fica.';
    status('Abra o Street View na outra aba e marque seu palpite aqui. O cronômetro está contando.');
    startClock();
    // Starting / advancing a round is a user click, so open the panorama directly.
    // A visible link remains available if the browser blocks new tabs.
    try { window.open(viewLink.href,'_blank','noopener,noreferrer'); } catch(_err) {}
  }
  function finalResults() {
    mode='finished';
    resultBox.classList.add('hidden');
    finalBox.classList.remove('hidden');
    viewLink.classList.add('hidden');
    viewTitle.textContent='Partida concluída';
    viewInstructions.textContent='Confira sua pontuação e inicie outra partida.';
    byId('earth-final-score').textContent=`${total.toLocaleString('pt-BR')} de ${(roundsTotal*maxRoundScore).toLocaleString('pt-BR')} pontos possíveis.`;
    const distances=history.filter(item=>item.distance!==null).map(item=>item.distance);
    const mean=distances.length ? `${Math.round(distances.reduce((a,b)=>a+b,0)/distances.length).toLocaleString('pt-BR')} km` : '—';
    byId('earth-final-detail').textContent=`${history.length} rodadas · ${distances.length} palpites enviados · distância média: ${mean}.`;
    status('Partida concluída! Comece uma nova partida para tentar novamente.');
    submitBtn.disabled=true;
    clearBtn.disabled=true;
    toggleBtn.disabled=true;
  }
  function initMap() {
    if(map){map.resize();return;}
    if(typeof maplibregl==='undefined'){
      throw new Error('A biblioteca do mapa não carregou. Conecte-se à internet, desative bloqueadores para o OpenFreeMap se necessário e recarregue a página.');
    }
    map=new maplibregl.Map({
      container:'earth-guess-map',
      style:'https://tiles.openfreemap.org/styles/liberty',
      center:[0,15],zoom:1.1,minZoom:1,maxZoom:17,
      attributionControl:true,renderWorldCopies:true
    });
    map.on('click',event=>setGuess(event.lngLat));
    map.on('error', event=>{
      const message=String(event.error?.message || '');
      if(/failed to fetch|fetch|network|403|404|CORS|style\.json|webgl/i.test(message)){
        status('Falha ao carregar dados do mapa OpenStreetMap. Verifique internet/bloqueadores e tente recarregar.',true);
      }
    });
    byId('earth-zoom-in').addEventListener('click',()=>map.zoomIn());
    byId('earth-zoom-out').addEventListener('click',()=>map.zoomOut());
    byId('earth-zoom-home').addEventListener('click',()=>viewRegion());
    byId('earth-zoom-in').disabled=false;
    byId('earth-zoom-out').disabled=false;
    byId('earth-zoom-home').disabled=false;
    map.on('load',()=>map.resize());
    viewRegion();
  }
  function begin() {
    if(!['setup','error','finished'].includes(mode))return;
    try {
      initMap();
      roundsTotal=Number(roundsField.value);
      duration=Number(durationField.value);
      round=0; total=0; history=[];
      usedSeeds.clear();
      scoreLabel.textContent='0';
      setRegionsEnabled(false);
      restartBtn.disabled=false;
      startBtn.disabled=true;
      newRound();
    } catch(error) {
      mode='error';
      status(error.message||'Erro ao inicializar o mapa.',true);
      restartBtn.disabled=false;
      startBtn.disabled=false;
      setRegionsEnabled(true);
    }
  }
  function reset() {
    clearTimer();
    resetMap();
    mode='setup';round=0;total=0;history=[];actual=null;currentSeed=null;
    resultBox.classList.add('hidden');
    finalBox.classList.add('hidden');
    viewLink.classList.add('hidden');
    viewLink.removeAttribute('href');
    viewTitle.textContent='Sua próxima localização é um mistério';
    viewInstructions.textContent='Comece a partida para receber um lugar aleatório.';
    roundLabel.textContent=`0 / ${roundsField.value}`;
    scoreLabel.textContent='0';
    duration=Number(durationField.value);
    updateTime(duration);
    setMapHidden(false);
    setRegionsEnabled(true);
    submitBtn.disabled=true;clearBtn.disabled=true;toggleBtn.disabled=true;
    restartBtn.disabled=true;startBtn.disabled=false;
    status('Selecione regiões, tempo e número de rodadas para jogar. Não é necessária chave de API.');
  }

  regionsContainer.addEventListener('click',event=>{
    if(!['setup','error','finished'].includes(mode))return;
    const button=event.target.closest('button[data-region]');
    if(!button || button.disabled)return;
    const region=button.dataset.region;
    if(region==='all')selectedRegions.clear();
    else if(selectedRegions.has(region))selectedRegions.delete(region);
    else selectedRegions.add(region);
    paintRegions();
  });
  roundsField.addEventListener('change',()=>{if(mode==='setup')roundLabel.textContent=`0 / ${roundsField.value}`;});
  durationField.addEventListener('change',()=>{if(mode==='setup'){duration=Number(durationField.value);updateTime(duration);}});
  toggleBtn.addEventListener('click',()=>setMapHidden(!mapHidden));
  clearBtn.addEventListener('click',()=>{
    if(mode!=='playing')return;
    guess=null;
    if(guessMarker){guessMarker.remove();guessMarker=null;}
    clearBtn.disabled=true;submitBtn.disabled=true;
  });
  submitBtn.addEventListener('click',()=>{if(mode==='playing' && guess)reveal(false);});
  nextBtn.addEventListener('click',()=>{if(mode!=='revealed')return;if(round>=roundsTotal)finalResults();else newRound();});
  restartBtn.addEventListener('click',reset);
  startBtn.addEventListener('click',begin);
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden && mode==='playing' && duration && Date.now()>=deadline)reveal(true);
  });
  paintRegions();
  updateTime(duration);
})();
