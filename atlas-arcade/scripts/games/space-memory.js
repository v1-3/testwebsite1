
/* Space Memory — standalone SVG illustrations, no network or image dependencies. */
(() => {
  'use strict';
  const root = document.getElementById('space-memory-section');
  if (!root) return;
  const $ = (id) => root.querySelector('#sm-' + id);
  const menu = document.getElementById('game-menu-select');
  const langs = ['pt','it','es','en','de','fr','nl','sv','no'];
  const columns = (s) => s.split('|');
  const messages = {
    eyebrow:'OBSERVATÓRIO · MEMÓRIA|OSSERVATORIO · MEMORIA|OBSERVATORIO · MEMORIA|OBSERVATORY · MEMORY|STERNWARTE · MEMORY|OBSERVATOIRE · MÉMOIRE|STERRENWACHT · MEMORY|OBSERVATORIUM · MINNE|OBSERVATORIUM · HUKOMMELSE',
    title:'Memória Espacial|Memoria Spaziale|Memoria Espacial|Space Memory|Weltraum-Memory|Mémoire Spatiale|Ruimte-Memory|Rymdminne|Rom-hukommelse',
    intro:'Encontre os pares de ilustrações do universo. Vire duas cartas por vez.|Trova le coppie delle immagini dello spazio. Gira due carte alla volta.|Encuentra las parejas de ilustraciones espaciales. Voltea dos cartas cada vez.|Match pairs of illustrated space objects. Flip two cards at a time.|Finde die Paare der Weltraumbilder. Decke jeweils zwei Karten auf.|Retrouvez les paires d’illustrations spatiales. Retournez deux cartes à la fois.|Zoek de paren van ruimteplaatjes. Draai twee kaarten tegelijk om.|Matcha paren av rymdbilder. Vänd två kort åt gången.|Finn parene med rombilder. Snu to kort om gangen.',
    language:'Idioma|Lingua|Idioma|Language|Sprache|Langue|Taal|Språk|Språk',
    difficulty:'Dificuldade|Difficoltà|Dificultad|Difficulty|Schwierigkeit|Difficulté|Moeilijkheid|Svårighetsgrad|Vanskelighetsgrad',
    easy:'Fácil · 6 pares|Facile · 6 coppie|Fácil · 6 parejas|Easy · 6 pairs|Leicht · 6 Paare|Facile · 6 paires|Makkelijk · 6 paren|Lätt · 6 par|Lett · 6 par',
    medium:'Médio · 10 pares|Medio · 10 coppie|Medio · 10 parejas|Medium · 10 pairs|Mittel · 10 Paare|Moyen · 10 paires|Gemiddeld · 10 paren|Medel · 10 par|Middels · 10 par',
    hard:'Difícil · 15 pares|Difficile · 15 coppie|Difícil · 15 parejas|Hard · 15 pairs|Schwer · 15 Paare|Difficile · 15 paires|Moeilijk · 15 paren|Svårt · 15 par|Vanskelig · 15 par',
    new:'Novo jogo|Nuova partita|Nuevo juego|New game|Neues Spiel|Nouvelle partie|Nieuw spel|Nytt spel|Nytt spill',
    moves:'Tentativas|Tentativi|Intentos|Moves|Züge|Essais|Pogingen|Försök|Forsøk',
    matched:'Pares|Coppie|Parejas|Pairs|Paare|Paires|Paren|Par|Par',
    time:'Tempo|Tempo|Tiempo|Time|Zeit|Temps|Tijd|Tid|Tid',
    best:'Recorde|Record|Récord|Best|Rekord|Record|Record|Rekord|Rekord',
    ready:'Vire duas cartas para encontrar um par.|Gira due carte per trovare una coppia.|Voltea dos cartas para encontrar una pareja.|Flip two cards to find a match.|Decke zwei Karten auf, um ein Paar zu finden.|Retournez deux cartes pour trouver une paire.|Draai twee kaarten om om een paar te vinden.|Vänd två kort för att hitta ett par.|Snu to kort for å finne et par.',
    one:'Escolha outra carta.|Scegli un’altra carta.|Elige otra carta.|Choose another card.|Wähle eine zweite Karte.|Choisissez une autre carte.|Kies nog een kaart.|Välj ett till kort.|Velg et kort til.',
    missed:'Não combinam. Tente outro par!|Non corrispondono. Riprova!|No coinciden. ¡Inténtalo de nuevo!|Not a match. Try another pair!|Kein Paar. Versuch es erneut!|Pas de paire. Réessayez !|Geen paar. Probeer opnieuw!|Inget par. Försök igen!|Ikke et par. Prøv igjen!',
    found:'Par encontrado!|Coppia trovata!|¡Pareja encontrada!|Pair found!|Paar gefunden!|Paire trouvée !|Paar gevonden!|Par hittat!|Par funnet!',
    winTitle:'Missão concluída!|Missione compiuta!|¡Misión cumplida!|Mission complete!|Mission erfüllt!|Mission accomplie !|Missie voltooid!|Uppdrag slutfört!|Oppdrag fullført!',
    winText:'Você encontrou {pairs} pares em {moves} tentativas e {time}.|Hai trovato {pairs} coppie in {moves} tentativi e {time}.|Encontraste {pairs} parejas en {moves} intentos y {time}.|You matched {pairs} pairs in {moves} moves and {time}.|Du hast {pairs} Paare in {moves} Zügen und {time} gefunden.|Vous avez trouvé {pairs} paires en {moves} essais et {time}.|Je vond {pairs} paren in {moves} pogingen en {time}.|Du hittade {pairs} par på {moves} försök och {time}.|Du fant {pairs} par på {moves} forsøk og {time}.',
    playAgain:'Jogar novamente|Gioca ancora|Jugar otra vez|Play again|Noch einmal|Rejouer|Opnieuw spelen|Spela igen|Spill igjen',
    tip:'Toque ou clique nas cartas. Cada ilustração aparece duas vezes.|Tocca o clicca le carte. Ogni illustrazione appare due volte.|Toca o haz clic en las cartas. Cada imagen aparece dos veces.|Tap or click cards. Each illustration appears twice.|Tippe oder klicke auf die Karten. Jedes Bild kommt zweimal vor.|Touchez ou cliquez sur les cartes. Chaque illustration apparaît deux fois.|Tik of klik op kaarten. Elke afbeelding komt twee keer voor.|Tryck eller klicka på korten. Varje bild finns två gånger.|Trykk eller klikk på kortene. Hvert bilde finnes to ganger.',
    hidden:'Carta virada para baixo|Carta coperta|Carta boca abajo|Face-down card|Verdeckte Karte|Carte face cachée|Gedekte kaart|Nedvänt kort|Skjult kort',
    revealed:'Carta: {name}|Carta: {name}|Carta: {name}|Card: {name}|Karte: {name}|Carte : {name}|Kaart: {name}|Kort: {name}|Kort: {name}',
    pairMatch:'Par encontrado: {name}|Coppia trovata: {name}|Pareja encontrada: {name}|Matched: {name}|Paar gefunden: {name}|Paire trouvée : {name}|Paar gevonden: {name}|Par hittat: {name}|Par funnet: {name}',
    newRecord:'Novo recorde!|Nuovo record!|¡Nuevo récord!|New best score!|Neuer Rekord!|Nouveau record !|Nieuw record!|Nytt rekord!|Ny rekord!',
    grid:'Cartas de memória espacial|Carte di memoria spaziale|Cartas de memoria espacial|Space memory cards|Weltraum-Memory-Karten|Cartes de mémoire spatiale|Ruimte-memorykaarten|Rymdminneskort|Rom-hukommelseskort'
  };
  const names = {
    sun:'Sol|Sole|Sol|Sun|Sonne|Soleil|Zon|Sol|Sol',
    mercury:'Mercúrio|Mercurio|Mercurio|Mercury|Merkur|Mercure|Mercurius|Merkurius|Merkur',
    venus:'Vênus|Venere|Venus|Venus|Venus|Vénus|Venus|Venus|Venus',
    earth:'Terra|Terra|Tierra|Earth|Erde|Terre|Aarde|Jorden|Jorden',
    mars:'Marte|Marte|Marte|Mars|Mars|Mars|Mars|Mars|Mars',
    jupiter:'Júpiter|Giove|Júpiter|Jupiter|Jupiter|Jupiter|Jupiter|Jupiter|Jupiter',
    saturn:'Saturno|Saturno|Saturno|Saturn|Saturn|Saturne|Saturnus|Saturnus|Saturn',
    uranus:'Urano|Urano|Urano|Uranus|Uranus|Uranus|Uranus|Uranus|Uranus',
    neptune:'Netuno|Nettuno|Neptuno|Neptune|Neptun|Neptune|Neptunus|Neptunus|Neptun',
    moon:'Lua|Luna|Luna|Moon|Mond|Lune|Maan|Månen|Månen',
    star:'Estrela|Stella|Estrella|Star|Stern|Étoile|Ster|Stjärna|Stjerne',
    rocket:'Foguete|Razzo|Cohete|Rocket|Rakete|Fusée|Raket|Raket|Rakett',
    satellite:'Satélite|Satellite|Satélite|Satellite|Satellit|Satellite|Satelliet|Satellit|Satellitt',
    astronaut:'Astronauta|Astronauta|Astronauta|Astronaut|Astronaut|Astronaute|Astronaut|Astronaut|Astronaut',
    galaxy:'Galáxia|Galassia|Galaxia|Galaxy|Galaxie|Galaxie|Sterrenstelsel|Galax|Galakse',
    nebula:'Nebulosa|Nebulosa|Nebulosa|Nebula|Nebel|Nébuleuse|Nevel|Nebulosa|Stjernetåke',
    comet:'Cometa|Cometa|Cometa|Comet|Komet|Comète|Komeet|Komet|Komet',
    asteroid:'Asteroide|Asteroide|Asteroide|Asteroid|Asteroid|Astéroïde|Asteroïde|Asteroid|Asteroide',
    telescope:'Telescópio|Telescopio|Telescopio|Telescope|Teleskop|Télescope|Telescoop|Teleskop|Teleskop',
    blackhole:'Buraco negro|Buco nero|Agujero negro|Black hole|Schwarzes Loch|Trou noir|Zwart gat|Svart hål|Svart hull',
    station:'Estação espacial|Stazione spaziale|Estación espacial|Space station|Raumstation|Station spatiale|Ruimtestation|Rymdstation|Romstasjon',
    rover:'Rover|Rover|Róver|Mars rover|Mars-Rover|Rover martien|Marsrover|Marsbil|Mars-rover',
    eclipse:'Eclipse|Eclissi|Eclipse|Eclipse|Finsternis|Éclipse|Verduistering|Förmörkelse|Formørkelse',
    constellation:'Constelação|Costellazione|Constelación|Constellation|Sternbild|Constellation|Sterrenbeeld|Stjärnbild|Stjernebilde'
  };
  const ids = Object.keys(names);
  const colorOutline = 'stroke="#ffe9ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const dot = (x,y,r,fill,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const oval = (x,y,rx,ry,fill,other='') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${other}/>`;
  const planet = (base, details='', ring='') => `${ring}${dot(60,51,31,base,'stroke="#ffffff4d" stroke-width="1"')}${oval(51,35,21,14,'#fff', 'opacity=".14"')}${details}${oval(75,70,18,13,'#050a34','opacity=".13"')}`;
  const artworks = {
    sun: `<g stroke="#fbba36" stroke-width="5" stroke-linecap="round">${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path d="M ${60+39*Math.cos(a)} ${51+39*Math.sin(a)} L ${60+48*Math.cos(a)} ${51+48*Math.sin(a)}"/>`;}).join('')}</g>${dot(60,51,32,'#fa903a')}${dot(55,44,25,'#ffd153')}${dot(48,38,12,'#fff4a3','opacity=".36"')}`,
    mercury: planet('#8d8994',`${dot(49,43,8,'#706a79')}${dot(71,56,11,'#6e6a76')}${dot(54,69,5,'#bbb8bd')}`),
    venus: planet('#d9a667',`${oval(60,43,27,7,'#f9d5a0','opacity=".75"')}${oval(60,57,29,6,'#c9885b','opacity=".54"')}${oval(66,67,17,5,'#fff0cb','opacity=".65"')}`),
    earth: planet('#297dcb',`<path d="M37 31 Q48 22 57 34 L52 45 62 52 53 59 42 54 36 44Z" fill="#43c18c"/><path d="M75 33 L84 44 79 51 69 49 65 40Z M68 59 L82 61 77 75 70 79 63 70Z" fill="#8ce4aa"/><path d="M42 65 L48 71 44 77" fill="none" stroke="#ddf7ff" stroke-width="3"/>`),
    mars: planet('#c45d3f',`${dot(47,43,10,'#e78b59')}${dot(72,63,13,'#9c432f')}${dot(56,72,5,'#fca36c')}<path d="M40 29 L73 28" stroke="#f8ba8d" opacity=".6" stroke-width="4"/>`),
    jupiter: planet('#d7b58c',`<g fill="none" stroke-width="6"><path d="M33 37 Q60 43 87 38" stroke="#b87d69"/><path d="M30 51 Q60 45 91 53" stroke="#f9e0bd"/><path d="M32 65 Q60 70 88 63" stroke="#a76e52"/></g>${oval(73,57,9,5,'#b65e56')}`),
    saturn: `<ellipse cx="60" cy="51" rx="48" ry="15" fill="none" stroke="#d5bc94" stroke-width="10" transform="rotate(-21 60 51)" opacity=".85"/>${planet('#d7bf89',`<g stroke="#a98763" stroke-width="5" opacity=".75"><path d="M36 44 H84 M34 54 H86 M41 67 H79"/></g>`)}<path d="M16 66 Q61 91 104 37" fill="none" stroke="#ffe8b9" stroke-width="5" opacity=".88"/>`,
    uranus: `<ellipse cx="60" cy="51" rx="47" ry="12" fill="none" stroke="#9de7d9" stroke-width="3" transform="rotate(70 60 51)"/>${planet('#7de3db',`<path d="M30 55 Q60 43 91 53" fill="none" stroke="#48bbc6" stroke-width="5"/>`)}`,
    neptune: planet('#355bb5',`<path d="M35 41 Q60 35 86 44 M31 60 Q60 54 88 65" fill="none" stroke="#7cbdff" stroke-width="6"/>${oval(73,65,9,5,'#223c86')}`),
    moon: planet('#bcc3d4',`${dot(47,40,10,'#8f98af')}${dot(70,59,13,'#929bad')}${dot(47,70,6,'#929bad')}${dot(74,35,4,'#e0e4ed')}`),
    star: `<path d="M60 9 72 38 103 39 79 60 87 90 60 72 33 90 41 60 17 39 48 38Z" fill="#ffd35c" stroke="#ffeab0" stroke-width="3"/><path d="M60 23 L68 44 88 45" fill="none" stroke="#fff8ba" stroke-width="5" stroke-linecap="round" opacity=".75"/>`,
    rocket: `<path d="M46 66 43 85 56 73Z M74 66 77 85 64 73Z" fill="#fb7185"/><path d="M48 65 V38 Q48 20 60 12 Q72 20 72 38 V65Z" fill="#f0f3fc" stroke="#c1d2ef" stroke-width="2.5"/><path d="M49 54 H71 V66 H49Z" fill="#a84d7e"/>${dot(60,39,9,'#54b8dd','stroke="#32548e" stroke-width="3"')}<path d="M54 74 60 95 66 74Z" fill="#f5a439"/><path d="M56 74 60 86 64 74Z" fill="#fff1a1"/>`,
    satellite: `<rect x="43" y="40" width="34" height="24" rx="5" fill="#f3c86a" stroke="#ffe6a6" stroke-width="3"/><path d="M43 46H15V36H43Z M77 46H105V36H77Z M43 68H15V58H43Z M77 68H105V58H77Z" fill="#2878bd" stroke="#87c9ff" stroke-width="2"/><path d="M24 37V68 M34 37V68 M86 37V68 M96 37V68" stroke="#c3eeff" stroke-width="1.5"/><path d="M60 40V20L72 12" fill="none" stroke="#d6dcf2" stroke-width="2.5"/>${dot(72,12,4,'#f0ddba')}`,
    astronaut: `<path d="M40 68 32 91 43 95 53 77H67L77 95 88 91 80 68" fill="#dae4f8" stroke="#bbd0f1" stroke-width="3"/><rect x="43" y="61" width="34" height="22" rx="7" fill="#f5e7ff" stroke="#a2aed0" stroke-width="2"/><path d="M43 69 29 74 25 63 M77 69 91 74 95 63" fill="none" stroke="#e4e9fa" stroke-width="10" stroke-linecap="round"/>${dot(60,39,26,'#e7ebf9','stroke="#bed2f5" stroke-width="3"')}${oval(60,39,19,16,'#3164a7','stroke="#88d9f3" stroke-width="3"')}<path d="M48 32 Q58 22 72 31" fill="none" stroke="#e3feff" stroke-width="4" opacity=".85"/>`,
    galaxy: `<g fill="none" stroke-linecap="round"><ellipse cx="60" cy="51" rx="47" ry="17" stroke="#9d7feb" stroke-width="6" transform="rotate(-23 60 51)"/><ellipse cx="60" cy="51" rx="33" ry="12" stroke="#67c6fd" stroke-width="6" transform="rotate(-23 60 51)"/><ellipse cx="60" cy="51" rx="18" ry="7" stroke="#fbc0ea" stroke-width="6" transform="rotate(-23 60 51)"/></g>${dot(60,51,6,'#fff3cb')}${dot(92,14,2,'#d5ecff')}${dot(27,83,3,'#d5ecff')}`,
    nebula: `${dot(43,55,23,'#965bcb','opacity=".64"')}${dot(61,43,27,'#42b7dd','opacity=".62"')}${dot(79,60,23,'#b966b9','opacity=".72"')}${dot(55,69,22,'#604cae','opacity=".52"')}${dot(57,43,4,'#f7f3ff')}${dot(84,48,3,'#fff')}${dot(32,67,3,'#e5fff9')}`,
    comet: `<path d="M19 83 Q42 64 64 31 Q48 63 104 19 Q77 61 59 73Z" fill="#66dcff" opacity=".54"/><path d="M18 89 Q49 70 65 43" fill="none" stroke="#b3efff" stroke-width="7" stroke-linecap="round" opacity=".85"/>${dot(80,38,15,'#b9eaff')}${dot(75,34,7,'#effbff')}`,
    asteroid: `<path d="M39 20 71 13 94 31 103 58 80 86 48 85 25 67 22 39Z" fill="#87778c" stroke="#b8afbb" stroke-width="3"/>${dot(47,43,11,'#66576d')}${dot(74,59,13,'#695a73')}${dot(75,31,5,'#b4aab8')}${dot(44,71,6,'#aaa0ad')}`,
    telescope: `<path d="M55 62 38 96 M55 62 73 96 M55 62V96" stroke="#cad5f4" stroke-width="4" stroke-linecap="round"/><path d="M35 25 78 38 69 61 26 46Z" fill="#537abf" stroke="#9ed6fe" stroke-width="3"/><path d="M78 38 91 42 82 65 69 61Z" fill="#1b315e" stroke="#bcdafe" stroke-width="2"/><path d="M33 26 29 45" stroke="#f7d6ef" stroke-width="7"/><path d="M45 67 70 67" stroke="#f0cfac" stroke-width="5"/>`,
    blackhole: `<ellipse cx="60" cy="51" rx="49" ry="16" fill="none" stroke="#e55d9d" stroke-width="9" transform="rotate(-18 60 51)"/><ellipse cx="60" cy="51" rx="42" ry="12" fill="none" stroke="#f6c578" stroke-width="5" transform="rotate(-18 60 51)"/>${dot(60,51,29,'#080b21','stroke="#8650b6" stroke-width="5"')}${dot(60,51,25,'#050514')}`, 
    station: `<path d="M13 45H107 M60 18V84" stroke="#b8c4e9" stroke-width="3"/><rect x="46" y="38" width="28" height="26" rx="5" fill="#dce6f7" stroke="#a1b4da" stroke-width="2"/><rect x="11" y="30" width="30" height="41" rx="3" fill="#2469a7" stroke="#8aceff" stroke-width="2"/><rect x="79" y="30" width="30" height="41" rx="3" fill="#2469a7" stroke="#8aceff" stroke-width="2"/><path d="M21 31V70M31 31V70M89 31V70M99 31V70M11 44H41M79 44H109M11 58H41M79 58H109" stroke="#c9ebff" stroke-width="1.5"/>`,
    rover: `<path d="M33 55H85L91 73H28Z" fill="#deb88b" stroke="#ffdfb4" stroke-width="3"/><rect x="45" y="38" width="27" height="18" rx="2" fill="#dbe4f4"/><path d="M58 38V24L76 17" stroke="#c6c7d1" stroke-width="3" fill="none"/>${dot(78,16,6,'#7dcff7')}${dot(38,81,9,'#26344d','stroke="#b6b8c7" stroke-width="3"')}${dot(80,81,9,'#26344d','stroke="#b6b8c7" stroke-width="3"')}<path d="M38 72V81M80 72V81" stroke="#d4d7df" stroke-width="3"/>`,
    eclipse: `${dot(60,51,35,'#ffd36d')}${dot(60,51,39,'none','stroke="#fbbf24" stroke-width="2" stroke-dasharray="5 7"')}${dot(70,49,28,'#1a2852','stroke="#5068af" stroke-width="2"')}${oval(63,38,8,13,'#87aaff','opacity=".16"')}`,
    constellation: `<path d="M22 70 40 29 62 49 88 20 98 73 62 49 48 84Z" fill="none" stroke="#79cfff" stroke-width="2.5"/>${[[22,70],[40,29],[62,49],[88,20],[98,73],[48,84]].map(([x,y])=>`${dot(x,y,5,'#fff4bc')}${dot(x,y,10,'#94deff','opacity=".12"')}`).join('')}`
  };
  const specks = `${dot(18,17,1.3,'#e2e8ff')}${dot(104,25,2,'#b5ccff')}${dot(98,84,1.5,'#dcb8ff')}${dot(17,88,1,'#fff4c1')}`;
  function art(key) { return `<svg viewBox="0 0 120 102" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${specks}${artworks[key] || ''}</svg>`; }
  const back = `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(-32 50 50)" fill="none" stroke="#a5b4fc" stroke-width="3"/><circle cx="50" cy="50" r="22" fill="#8867be" stroke="#d4c2ff" stroke-width="2"/><path d="M50 34 54 45 66 45 57 52 60 64 50 58 40 64 43 52 34 45 46 45Z" fill="#fee7a6"/><circle cx="21" cy="25" r="2" fill="#fff"/><circle cx="77" cy="76" r="2.5" fill="#a5e6ff"/></svg>`;
  function shuffle(a) { const x=a.slice(); for(let i=x.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];} return x; }
  let lang='pt',level='medium',deck=[],revealed=[],pairs=0,moves=0,locked=false,finished=false,playing=false,elapsed=0,startedAt=null,pending=0,generation=0,record=null,newRecordWon=false;
  const languageIndex=()=>Math.max(0,langs.indexOf(lang));
  const t=(key)=> columns(messages[key]||key)[languageIndex()]||key;
  const label=(key)=>columns(names[key]||key)[languageIndex()]||key;
  const tpl=(value,attrs)=>value.replace(/\{(\w+)\}/g,(_,name)=>String(attrs[name]??''));
  function getRecord(){try {let v=JSON.parse(localStorage.getItem('space-memory-best-v2-'+level)||'null');return v&&Number.isInteger(v.moves)&&v.moves>0?v:null;} catch(e){return null;} }
  function setRecord(v){try {localStorage.setItem('space-memory-best-v2-'+level,JSON.stringify(v));} catch(e){} }
  function isVisible(){return !document.hidden&&!root.hidden&&menu?.value==='space-memory-section';}
  function synchronizeClock(){const shouldRun=playing&&!finished&&isVisible();if(shouldRun&&startedAt===null) startedAt=performance.now();if(!shouldRun&&startedAt!==null){elapsed+=performance.now()-startedAt;startedAt=null;}}
  function seconds(){return Math.floor((elapsed+(startedAt!==null?performance.now()-startedAt:0))/1000);}
  function clock(total){let mins=Math.floor(total/60),secs=total%60;return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;}
  function showStats(){synchronizeClock();$('moves').textContent=String(moves);$('matched').textContent=`${pairs}/${deck.length/2}`;$('time').textContent=clock(seconds());$('best').textContent=record?String(record.moves):'—';}
  function status(key){$('status').textContent=t(key);}
  function updateCard(index){const card=$('grid').children[index],item=deck[index];if(!card||!item)return;card.classList.toggle('is-open',item.open);card.classList.toggle('is-matched',item.matched);card.disabled=item.matched;card.setAttribute('aria-label',item.matched?tpl(t('pairMatch'),{name:label(item.key)}):item.open?tpl(t('revealed'),{name:label(item.key)}):t('hidden'));const name=card.querySelector('.sm-card-label');if(name)name.textContent=label(item.key);}
  function translate(){root.querySelectorAll('[data-sm-t]').forEach(el=>{el.textContent=t(el.dataset.smT);});$('grid').setAttribute('aria-label',t('grid'));if(!finished)status(revealed.length===1?'one':'ready');for(let j=0;j<deck.length;j++)updateCard(j);if(finished)winText();showStats();}
  function winText(){const s=tpl(t('winText'),{pairs:deck.length/2,moves,time:clock(seconds())});$('win-detail').textContent=s+(newRecordWon?' '+t('newRecord'):'');}
  function win(){finished=true;synchronizeClock();newRecordWon=!record||moves<record.moves||(moves===record.moves&&seconds()<record.seconds);if(newRecordWon){record={moves,seconds:seconds()};setRecord(record);}showStats();$('win').hidden=false;winText();status('found');}
  function clickCard(index){if(locked||finished)return;const item=deck[index];if(!item||item.matched||item.open)return;if(!playing){playing=true;synchronizeClock();}item.open=true;revealed.push(index);updateCard(index);status('one');if(revealed.length<2)return;
    moves++;const first=deck[revealed[0]],second=deck[revealed[1]];
    if(first.key===second.key){first.matched=true;second.matched=true;updateCard(revealed[0]);updateCard(revealed[1]);revealed=[];pairs++;status('found');if(pairs===deck.length/2)win();}
    else {locked=true;status('missed');const snapshot=generation;pending=window.setTimeout(()=>{if(snapshot!==generation)return;revealed.forEach(i=>{if(deck[i]){deck[i].open=false;updateCard(i);}});revealed=[];locked=false;status('ready');pending=0;},900);}
    showStats();
  }
  function newGame(){generation++;if(pending){clearTimeout(pending);pending=0;}level=$('difficulty').value;locked=false;finished=false;newRecordWon=false;playing=false;elapsed=0;startedAt=null;revealed=[];pairs=0;moves=0;record=getRecord();const count=({easy:6,medium:10,hard:15})[level]||10;const picks=shuffle(ids).slice(0,count);deck=shuffle(picks.flatMap(key=>[{key,open:false,matched:false},{key,open:false,matched:false}]));const grid=$('grid');grid.replaceChildren();grid.dataset.level=level;deck.forEach((item,j)=>{const button=document.createElement('button');button.type='button';button.className='sm-card';button.innerHTML=`<span class="sm-card-inner"><span class="sm-card-side sm-card-back">${back}</span><span class="sm-card-side sm-card-face"><span class="sm-art">${art(item.key)}</span><span class="sm-card-label"></span></span></span>`;button.addEventListener('click',()=>clickCard(j));grid.appendChild(button);});$('win').hidden=true;translate();showStats();}
  $('new').addEventListener('click',newGame);$('replay').addEventListener('click',newGame);$('difficulty').addEventListener('change',newGame);$('language').addEventListener('change',()=>{lang=$('language').value;translate();});
  menu?.addEventListener('change',()=>{synchronizeClock();showStats();});document.addEventListener('visibilitychange',()=>{synchronizeClock();showStats();});
  window.setInterval(()=>{if(isVisible())showStats();},300);
  const initial=document.getElementById('aq-language')?.value||document.getElementById('ss-language')?.value||'pt';lang=langs.includes(initial)?initial:'pt';$('language').value=lang;
  newGame();
})();
