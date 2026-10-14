
/* Astronomy / solar system quiz - self-contained multilingual game. */
(() => {
'use strict';
const root=document.getElementById('astronomy-quiz-section');
if(!root)return;
const $=id=>document.getElementById('aq-'+id);
const langNames=['pt','it','es','en','de','fr','nl','sv','no'];
const columns=(s)=>s.split('|').map(x=>x.trim());
const pack={
  eyebrow:'CIÊNCIA & EXPLORAÇÃO|SCIENZA E ESPLORAZIONE|CIENCIA Y EXPLORACIÓN|SCIENCE & EXPLORATION|WISSENSCHAFT & ENTDECKUNG|SCIENCE ET EXPLORATION|WETENSCHAP & ONTDEKKING|VETENSKAP & UPPTÄCKT|VITENSKAP OG UTFORSKNING',
  title:'Quiz de Astronomia|Quiz di astronomia|Cuestionario de astronomía|Astronomy Quiz|Astronomie-Quiz|Quiz d’astronomie|Astronomiequiz|Astronomiquiz|Astronomi-quiz',
  intro:'Teste seus conhecimentos sobre o espaço, os planetas e o Universo.|Metti alla prova le tue conoscenze sullo spazio, i pianeti e l’Universo.|Pon a prueba tus conocimientos sobre el espacio, los planetas y el universo.|Test your knowledge of space, the planets and the universe.|Teste dein Wissen über den Weltraum, Planeten und das Universum.|Testez vos connaissances sur l’espace, les planètes et l’Univers.|Test je kennis van de ruimte, de planeten en het heelal.|Testa dina kunskaper om rymden, planeterna och universum.|Test kunnskapen din om verdensrommet, planetene og universet.',
  language:'Idioma|Lingua|Idioma|Language|Sprache|Langue|Taal|Språk|Språk',
  topic:'Tema|Argomento|Tema|Topic|Thema|Thème|Onderwerp|Ämne|Tema',
  allTopics:'Todos os temas|Tutti gli argomenti|Todos los temas|All topics|Alle Themen|Tous les thèmes|Alle onderwerpen|Alla ämnen|Alle temaer',
  solar:'Sistema Solar|Sistema solare|Sistema solar|Solar System|Sonnensystem|Système solaire|Zonnestelsel|Solsystemet|Solsystemet',
  space:'Espaço|Spazio|Espacio|Space|Weltraum|Espace|Ruimtevaart en ruimte|Rymden|Verdensrommet',
  astronomy:'Astronomia|Astronomia|Astronomía|Astronomy|Astronomie|Astronomie|Astronomie|Astronomi|Astronomi',
  difficulty:'Dificuldade|Difficoltà|Dificultad|Difficulty|Schwierigkeit|Difficulté|Moeilijkheid|Svårighet|Vanskelighetsgrad',
  allLevels:'Todas|Tutte|Todas|All levels|Alle Stufen|Tous niveaux|Alle niveaus|Alla nivåer|Alle nivåer',
  easy:'Fácil|Facile|Fácil|Easy|Leicht|Facile|Makkelijk|Lätt|Lett',
  medium:'Médio|Medio|Medio|Medium|Mittel|Moyen|Gemiddeld|Medel|Middels',
  hard:'Difícil|Difficile|Difícil|Hard|Schwer|Difficile|Moeilijk|Svårt|Vanskelig',
  length:'Questões|Domande|Preguntas|Questions|Fragen|Questions|Vragen|Frågor|Spørsmål',
  start:'Começar quiz|Inizia il quiz|Empezar cuestionario|Start quiz|Quiz starten|Commencer le quiz|Start quiz|Starta quizet|Start quizen',
  replay:'Jogar novamente|Gioca di nuovo|Jugar otra vez|Play again|Erneut spielen|Rejouer|Opnieuw spelen|Spela igen|Spill igjen',
  next:'Próxima questão|Prossima domanda|Siguiente pregunta|Next question|Nächste Frage|Question suivante|Volgende vraag|Nästa fråga|Neste spørsmål',
  results:'Ver resultado|Mostra risultato|Ver resultado|View results|Ergebnis anzeigen|Voir les résultats|Resultaat bekijken|Visa resultat|Vis resultat',
  skip:'Pular questão|Salta domanda|Saltar pregunta|Skip question|Frage überspringen|Passer la question|Vraag overslaan|Hoppa över frågan|Hopp over spørsmålet',
  score:'Pontos|Punti|Puntos|Score|Punkte|Points|Punten|Poäng|Poeng',
  correct:'Acertos|Risposte giuste|Aciertos|Correct|Richtig|Bonnes réponses|Goed|Rätt|Riktige',
  streak:'Sequência|Serie|Racha|Streak|Serie|Série|Reeks|Svit|Rekke',
  best:'Recorde|Record|Récord|Best|Rekord|Record|Record|Rekord|Rekord',
  readyTitle:'Pronto para explorar o Universo?|Pronto a esplorare l’Universo?|¿Listo para explorar el universo?|Ready to explore the universe?|Bereit, das Universum zu erkunden?|Prêt à explorer l’Univers ?|Klaar om het heelal te verkennen?|Redo att utforska universum?|Klar til å utforske universet?',
  ready:'Selecione um tema, uma dificuldade e comece. Cada partida usa questões aleatórias.|Scegli argomento e difficoltà, poi inizia. Ogni partita usa domande casuali.|Elige un tema y una dificultad. Cada partida incluye preguntas aleatorias.|Choose a topic and difficulty, then start. Each game uses shuffled questions.|Wähle Thema und Schwierigkeit. In jeder Runde erscheinen zufällige Fragen.|Choisissez un thème et une difficulté. Chaque partie propose des questions aléatoires.|Kies een onderwerp en niveau. Elke ronde bevat willekeurige vragen.|Välj ämne och svårighetsgrad. Varje omgång har slumpade frågor.|Velg tema og vanskelighetsgrad. Hver runde har tilfeldige spørsmål.',
  question:'Questão|Domanda|Pregunta|Question|Frage|Question|Vraag|Fråga|Spørsmål',
  of:'de|di|de|of|von|sur|van|av|av',
  choose:'Selecione uma resposta|Scegli una risposta|Elige una respuesta|Choose one answer|Wähle eine Antwort|Choisissez une réponse|Kies een antwoord|Välj ett svar|Velg ett svar',
  right:'Resposta correta!|Risposta corretta!|¡Respuesta correcta!|Correct answer!|Richtige Antwort!|Bonne réponse !|Goed antwoord!|Rätt svar!|Riktig svar!',
  wrong:'Não foi dessa vez.|Non è la risposta giusta.|No es la respuesta correcta.|Not quite.|Leider falsch.|Pas tout à fait.|Helaas niet.|Inte riktigt.|Ikke helt riktig.',
  skipped:'Questão pulada.|Domanda saltata.|Pregunta omitida.|Question skipped.|Frage übersprungen.|Question passée.|Vraag overgeslagen.|Frågan hoppades över.|Spørsmålet ble hoppet over.',
  answer:'Resposta certa:|Risposta giusta:|Respuesta correcta:|Correct answer:|Richtige Antwort:|Bonne réponse :|Juiste antwoord:|Rätt svar:|Riktig svar:',
  finishTitle:'Viagem concluída!|Viaggio completato!|¡Viaje completado!|Journey complete!|Reise beendet!|Voyage terminé !|Reis voltooid!|Resan är klar!|Reisen er fullført!',
  finish:'Você acertou {got} de {total} questões ({pct}%).|Hai risposto bene a {got} domande su {total} ({pct}%).|Acertaste {got} de {total} preguntas ({pct}%).|You answered {got} of {total} correctly ({pct}%).|Du hast {got} von {total} Fragen richtig beantwortet ({pct}%).|Vous avez {got} bonnes réponses sur {total} ({pct} %).|Je had {got} van de {total} vragen goed ({pct}%).|Du svarade rätt på {got} av {total} frågor ({pct} %).|Du svarte riktig på {got} av {total} spørsmål ({pct} %).',
  points:'pontos|punti|puntos|points|Punkte|points|punten|poäng|poeng',
  source:'Fatos científicos: NASA|Fatti scientifici: NASA|Datos científicos: NASA|Science facts: NASA|Wissenschaftliche Fakten: NASA|Faits scientifiques : NASA|Wetenschappelijke feiten: NASA|Vetenskapliga fakta: NASA|Vitenskapelige fakta: NASA',
  controls:'Atalhos: 1–4 para responder e Enter para continuar.|Scorciatoie: 1–4 per rispondere e Invio per continuare.|Atajos: 1–4 para responder y Enter para continuar.|Shortcuts: 1–4 to answer, Enter to continue.|Tasten: 1–4 für Antworten, Eingabe zum Fortfahren.|Raccourcis : 1–4 pour répondre, Entrée pour continuer.|Sneltoetsen: 1–4 om te antwoorden, Enter om door te gaan.|Genvägar: 1–4 för svar, Enter för att fortsätta.|Snarveier: 1–4 for å svare, Enter for å gå videre.'
};
const T={
  mercury:'Mercúrio|Mercurio|Mercurio|Mercury|Merkur|Mercure|Mercurius|Merkurius|Merkur',
  venus:'Vênus|Venere|Venus|Venus|Venus|Vénus|Venus|Venus|Venus',
  earth:'Terra|Terra|Tierra|Earth|Erde|Terre|Aarde|Jorden|Jorden',
  mars:'Marte|Marte|Marte|Mars|Mars|Mars|Mars|Mars|Mars',
  jupiter:'Júpiter|Giove|Júpiter|Jupiter|Jupiter|Jupiter|Jupiter|Jupiter|Jupiter',
  saturn:'Saturno|Saturno|Saturno|Saturn|Saturn|Saturne|Saturnus|Saturnus|Saturn',
  uranus:'Urano|Urano|Urano|Uranus|Uranus|Uranus|Uranus|Uranus|Uranus',
  neptune:'Netuno|Nettuno|Neptuno|Neptune|Neptun|Neptune|Neptunus|Neptunus|Neptun',
  sun:'Sol|Sole|Sol|Sun|Sonne|Soleil|Zon|Solen|Solen',
  moon:'Lua|Luna|Luna|Moon|Mond|Lune|Maan|Månen|Månen',
  pluto:'Plutão|Plutone|Plutón|Pluto|Pluto|Pluton|Pluto|Pluto|Pluto',
  ceres:'Ceres|Cerere|Ceres|Ceres|Ceres|Cérès|Ceres|Ceres|Ceres',
  eris:'Éris|Eris|Eris|Eris|Eris|Éris|Eris|Eris|Eris',
  haumea:'Haumea|Haumea|Haumea|Haumea|Haumea|Hauméa|Haumea|Haumea|Haumea',
  seven:'7|7|7|7|7|7|7|7|7',eight:'8|8|8|8|8|8|8|8|8',nine:'9|9|9|9|9|9|9|9|9',ten:'10|10|10|10|10|10|10|10|10',
  belt1:'Mercúrio e Vênus|Mercurio e Venere|Mercurio y Venus|Mercury and Venus|Merkur und Venus|Mercure et Vénus|Mercurius en Venus|Merkurius och Venus|Merkur og Venus',
  belt2:'Terra e Marte|Terra e Marte|Tierra y Marte|Earth and Mars|Erde und Mars|Terre et Mars|Aarde en Mars|Jorden och Mars|Jorden og Mars',
  belt3:'Marte e Júpiter|Marte e Giove|Marte y Júpiter|Mars and Jupiter|Mars und Jupiter|Mars et Jupiter|Mars en Jupiter|Mars och Jupiter|Mars og Jupiter',
  belt4:'Saturno e Urano|Saturno e Urano|Saturno y Urano|Saturn and Uranus|Saturn und Uranus|Saturne et Uranus|Saturnus en Uranus|Saturnus och Uranus|Saturn og Uranus',
  gagarin:'Yuri Gagarin|Jurij Gagarin|Yuri Gagarin|Yuri Gagarin|Juri Gagarin|Youri Gagarine|Joeri Gagarin|Jurij Gagarin|Jurij Gagarin',
  armstrong:'Neil Armstrong|Neil Armstrong|Neil Armstrong|Neil Armstrong|Neil Armstrong|Neil Armstrong|Neil Armstrong|Neil Armstrong|Neil Armstrong',
  aldrin:'Buzz Aldrin|Buzz Aldrin|Buzz Aldrin|Buzz Aldrin|Buzz Aldrin|Buzz Aldrin|Buzz Aldrin|Buzz Aldrin|Buzz Aldrin',
  glenn:'John Glenn|John Glenn|John Glenn|John Glenn|John Glenn|John Glenn|John Glenn|John Glenn|John Glenn',
  shepard:'Alan Shepard|Alan Shepard|Alan Shepard|Alan Shepard|Alan Shepard|Alan Shepard|Alan Shepard|Alan Shepard|Alan Shepard',
  y1965:'1965|1965|1965|1965|1965|1965|1965|1965|1965',y1969:'1969|1969|1969|1969|1969|1969|1969|1969|1969',y1972:'1972|1972|1972|1972|1972|1972|1972|1972|1972',y1981:'1981|1981|1981|1981|1981|1981|1981|1981|1981',
  fusion:'Fusão nuclear|Fusione nucleare|Fusión nuclear|Nuclear fusion|Kernfusion|Fusion nucléaire|Kernfusie|Kärnfusion|Kjernefusjon',
  fission:'Fissão nuclear|Fissione nucleare|Fisión nuclear|Nuclear fission|Kernspaltung|Fission nucléaire|Kernsplijting|Kärnklyvning|Kjernefisjon',
  combustion:'Combustão química|Combustione chimica|Combustión química|Chemical combustion|Chemische Verbrennung|Combustion chimique|Chemische verbranding|Kemisk förbränning|Kjemisk forbrenning',
  friction:'Atrito|Attrito|Fricción|Friction|Reibung|Frottement|Wrijving|Friktion|Friksjon',
  vacuum:'Vácuo|Vuoto|Vacío|Vacuum|Vakuum|Vide|Vacuüm|Vakuum|Vakuum',
  air:'Ar|Aria|Aire|Air|Luft|Air|Lucht|Luft|Luft',
  water:'Água|Acqua|Agua|Water|Wasser|Eau|Water|Vatten|Vann',
  steel:'Aço|Acciaio|Acero|Steel|Stahl|Acier|Staal|Stål|Stål',
  distSunEarth:'Distância média Sol–Terra|Distanza media Sole–Terra|Distancia media Sol–Tierra|Average Sun–Earth distance|Mittlere Entfernung Sonne–Erde|Distance moyenne Soleil–Terre|Gemiddelde afstand zon–aarde|Medelavståndet solen–jorden|Middelavstanden mellom solen og jorden',
  distEarthMoon:'Distância Terra–Lua|Distanza Terra–Luna|Distancia Tierra–Luna|Earth–Moon distance|Entfernung Erde–Mond|Distance Terre–Lune|Afstand aarde–maan|Avståndet jorden–månen|Avstanden mellom jorden og månen',
  distEarthMars:'Distância média Terra–Marte|Distanza media Terra–Marte|Distancia media Tierra–Marte|Average Earth–Mars distance|Mittlere Entfernung Erde–Mars|Distance moyenne Terre–Mars|Gemiddelde afstand aarde–Mars|Medelavståndet jorden–Mars|Middelavstanden mellom jorden og Mars',
  galaxyDiameter:'Diâmetro da Via Láctea|Diametro della Via Lattea|Diámetro de la Vía Láctea|Diameter of the Milky Way|Durchmesser der Milchstraße|Diamètre de la Voie lactée|Diameter van de Melkweg|Vintergatans diameter|Melkeveiens diameter',
  freefall:'Queda livre contínua em órbita|Caduta libera continua in orbita|Caída libre continua en órbita|Continuous free fall in orbit|Ständiger freier Fall im Orbit|Chute libre permanente en orbite|Voortdurende vrije val in een baan|Kontinuerligt fritt fall i bana|Kontinuerlig fritt fall i bane',
  noGravity:'Ausência total de gravidade|Assenza totale di gravità|Ausencia total de gravedad|Complete absence of gravity|Völliges Fehlen der Schwerkraft|Absence totale de gravité|Volledig ontbreken van zwaartekracht|Total avsaknad av gravitation|Fullstendig fravær av tyngdekraft',
  farEarth:'Estar longe demais da Terra|Essere troppo lontani dalla Terra|Estar demasiado lejos de la Tierra|Being too far from Earth|Zu weit von der Erde entfernt sein|Être trop loin de la Terre|Te ver van de aarde zijn|Att vara för långt från jorden|Å være for langt fra jorden',
  moonGravity:'A gravidade da Lua|La gravità della Luna|La gravedad de la Luna|The Moon’s gravity|Die Schwerkraft des Mondes|La gravité de la Lune|De zwaartekracht van de maan|Månens gravitation|Månens tyngdekraft',
  infrared:'Infravermelho|Infrarosso|Infrarrojo|Infrared|Infrarot|Infrarouge|Infrarood|Infrarött|Infrarødt',
  ultraviolet:'Ultravioleta|Ultravioletto|Ultravioleta|Ultraviolet|Ultraviolett|Ultraviolet|Ultraviolet|Ultraviolett|Ultrafiolett',
  radio:'Ondas de rádio|Onde radio|Ondas de radio|Radio waves|Radiowellen|Ondes radio|Radiogolven|Radiovågor|Radiobølger',
  gamma:'Raios gama|Raggi gamma|Rayos gamma|Gamma rays|Gammastrahlen|Rayons gamma|Gammastralen|Gammastrålning|Gammastråler',
  exhaust:'Expelir gases para trás|Espellere gas all’indietro|Expulsar gases hacia atrás|Expelling gas backward|Gas nach hinten ausstoßen|Éjecter des gaz vers l’arrière|Gas naar achteren uitstoten|Skjuta ut gas bakåt|Skyve gass bakover',
  airPush:'Empurrar o ar ao redor|Spingere l’aria circostante|Empujar el aire circundante|Pushing against nearby air|Gegen die Umgebungsluft drücken|Pousser contre l’air ambiant|Tegen omringende lucht duwen|Trycka mot omgivande luft|Skyve mot luften rundt',
  magnetic:'Usar o magnetismo terrestre|Usare il magnetismo terrestre|Usar el magnetismo terrestre|Using Earth’s magnetism|Das Erdmagnetfeld nutzen|Utiliser le magnétisme terrestre|Het aardmagnetisch veld gebruiken|Använda jordens magnetfält|Bruke jordens magnetfelt',
  sunlight:'Usar apenas a luz solar|Usare soltanto la luce solare|Usar solo la luz solar|Using only sunlight|Nur Sonnenlicht nutzen|Utiliser uniquement la lumière solaire|Alleen zonlicht gebruiken|Bara använda solljus|Bare bruke sollys',
  hubble:'Hubble|Hubble|Hubble|Hubble|Hubble|Hubble|Hubble|Hubble|Hubble',
  webb:'James Webb|James Webb|James Webb|James Webb|James Webb|James Webb|James Webb|James Webb|James Webb',
  kepler:'Kepler|Kepler|Kepler|Kepler|Kepler|Kepler|Kepler|Kepler|Kepler',
  chandra:'Chandra|Chandra|Chandra|Chandra|Chandra|Chandra|Chandra|Chandra|Chandra',
  milkyway:'Via Láctea|Via Lattea|Vía Láctea|Milky Way|Milchstraße|Voie lactée|Melkweg|Vintergatan|Melkeveien',
  andromeda:'Andrômeda|Andromeda|Andrómeda|Andromeda|Andromeda|Andromède|Andromeda|Andromeda|Andromeda',
  triangulum:'Triângulo|Triangolo|Triángulo|Triangulum|Dreiecksgalaxie|Triangle|Driehoekstelsel|Triangelgalaxen|Triangelgalaksen',
  whirlpool:'Redemoinho|Vortice|Remolino|Whirlpool|Strudelgalaxie|Tourbillon|Draaikolk|Virvelgalaxen|Virvelgalaksen',
  sirius:'Sírius|Sirio|Sirio|Sirius|Sirius|Sirius|Sirius|Sirius|Sirius',
  proxima:'Próxima Centauri|Proxima Centauri|Próxima Centauri|Proxima Centauri|Proxima Centauri|Proxima du Centaure|Proxima Centauri|Proxima Centauri|Proxima Centauri',
  alpha:'Alfa Centauri A|Alfa Centauri A|Alfa Centauri A|Alpha Centauri A|Alpha Centauri A|Alpha Centauri A|Alpha Centauri A|Alfa Centauri A|Alfa Centauri A',
  duration:'Tempo|Tempo|Tiempo|Time|Zeit|Temps|Tijd|Tid|Tid',
  distance:'Distância|Distanza|Distancia|Distance|Entfernung|Distance|Afstand|Avstånd|Avstand',
  temperature:'Temperatura|Temperatura|Temperatura|Temperature|Temperatur|Température|Temperatuur|Temperatur|Temperatur',
  brightness:'Brilho|Luminosità|Brillo|Brightness|Helligkeit|Luminosité|Helderheid|Ljusstyrka|Lysstyrke',
  solarEclipse:'Eclipse solar|Eclissi solare|Eclipse solar|Solar eclipse|Sonnenfinsternis|Éclipse solaire|Zonsverduistering|Solförmörkelse|Solformørkelse',
  lunarEclipse:'Eclipse lunar|Eclissi lunare|Eclipse lunar|Lunar eclipse|Mondfinsternis|Éclipse lunaire|Maansverduistering|Månförmörkelse|Måneformørkelse',
  newMoon:'Lua nova|Luna nuova|Luna nueva|New moon|Neumond|Nouvelle lune|Nieuwe maan|Nymåne|Nymåne',
  meteorShower:'Chuva de meteoros|Pioggia di meteore|Lluvia de meteoros|Meteor shower|Meteorschauer|Pluie de météores|Meteorenregen|Meteorregn|Meteorsverm',
  red:'Vermelho|Rosso|Rojo|Red|Rot|Rouge|Rood|Röd|Rød',
  blue:'Azul|Blu|Azul|Blue|Blau|Bleu|Blauw|Blå|Blå',
  yellow:'Amarelo|Giallo|Amarillo|Yellow|Gelb|Jaune|Geel|Gul|Gul',
  orange:'Laranja|Arancione|Naranja|Orange|Orange|Orange|Oranje|Orange|Oransje',
  dustCloud:'Nuvem de gás e poeira|Nube di gas e polvere|Nube de gas y polvo|Cloud of gas and dust|Gas- und Staubwolke|Nuage de gaz et de poussière|Wolk van gas en stof|Moln av gas och stoft|Sky av gass og støv',
  galaxy:'Galáxia|Galassia|Galaxia|Galaxy|Galaxie|Galaxie|Sterrenstelsel|Galax|Galakse',
  asteroid:'Asteroide|Asteroide|Asteroide|Asteroid|Asteroid|Astéroïde|Asteroïde|Asteroid|Asteroide',
  comet:'Cometa|Cometa|Cometa|Comet|Komet|Comète|Komeet|Komet|Komet',
  exoplanet:'Exoplaneta|Esopianeta|Exoplaneta|Exoplanet|Exoplanet|Exoplanète|Exoplaneet|Exoplanet|Eksoplanet',
  dwarfPlanet:'Planeta anão|Pianeta nano|Planeta enano|Dwarf planet|Zwergplanet|Planète naine|Dwergplaneet|Dvärgplanet|Dvergplanet',
  moonObj:'Lua natural|Luna naturale|Luna natural|Natural moon|Natürlicher Mond|Lune naturelle|Natuurlijke maan|Naturlig måne|Naturlig måne',
  seasonsTilt:'Inclinação do eixo da Terra|Inclinazione dell’asse terrestre|Inclinación del eje terrestre|Tilt of Earth’s axis|Neigung der Erdachse|Inclinaison de l’axe terrestre|Kanteling van de aardas|Jordaxelns lutning|Jordaksens helning',
  seasonsDist:'Variação da distância ao Sol|Variazione della distanza dal Sole|Variación de la distancia al Sol|Changing distance from the Sun|Änderung des Abstands zur Sonne|Variation de distance au Soleil|Verandering van de afstand tot de zon|Ändrat avstånd till solen|Endret avstand til solen',
  phases:'Fases da Lua|Fasi lunari|Fases lunares|Moon phases|Mondphasen|Phases lunaires|Maanfasen|Månens faser|Månefasene',
  stellarExplosion:'Explosão de uma estrela|Esplosione di una stella|Explosión de una estrella|Explosion of a star|Explosion eines Sterns|Explosion d’une étoile|Explosie van een ster|Explosion av en stjärna|Eksplosjon av en stjerne',
  galaxyBirth:'Nascimento de uma galáxia|Nascita di una galassia|Nacimiento de una galaxia|Birth of a galaxy|Entstehung einer Galaxie|Naissance d’une galaxie|Ontstaan van een sterrenstelsel|Födelsen av en galax|Fødselen til en galakse',
  planetSpin:'Rotação de um planeta|Rotazione di un pianeta|Rotación de un planeta|Rotation of a planet|Rotation eines Planeten|Rotation d’une planète|Rotatie van een planeet|En planets rotation|Rotasjonen til en planet',
  noEscape:'Limite além do qual nem a luz escapa|Confine oltre il quale nemmeno la luce sfugge|Límite más allá del cual ni la luz escapa|Boundary beyond which even light cannot escape|Grenze, hinter der selbst Licht nicht entkommt|Limite au-delà de laquelle même la lumière ne peut s’échapper|Grens waarachter zelfs licht niet kan ontsnappen|Gräns bortom vilken inte ens ljus kan fly|Grense der selv ikke lys kan slippe ut',
  earthAtmos:'Limite da atmosfera terrestre|Confine dell’atmosfera terrestre|Límite de la atmósfera terrestre|Boundary of Earth’s atmosphere|Grenze der Erdatmosphäre|Limite de l’atmosphère terrestre|Grens van de aardatmosfeer|Gränsen för jordens atmosfär|Grensen til jordens atmosfære',
  sunSurface:'Camada visível do Sol|Strato visibile del Sole|Capa visible del Sol|Visible layer of the Sun|Sichtbare Schicht der Sonne|Couche visible du Soleil|Zichtbare laag van de zon|Solens synliga lager|Solens synlige lag',
  planetRing:'Anel ao redor de um planeta|Anello intorno a un pianeta|Anillo alrededor de un planeta|Ring around a planet|Ring um einen Planeten|Anneau autour d’une planète|Ring om een planeet|Ring runt en planet|Ring rundt en planet',
  starPattern:'Padrão aparente de estrelas no céu|Schema apparente di stelle nel cielo|Patrón aparente de estrellas en el cielo|Apparent pattern of stars in the sky|Scheinbares Sternmuster am Himmel|Figure apparente d’étoiles dans le ciel|Schijnbaar patroon van sterren aan de hemel|Skenbart mönster av stjärnor på himlen|Tilsynelatende mønster av stjerner på himmelen',
  starGroup:'Grupo de estrelas próximas entre si|Gruppo di stelle fisicamente vicine|Grupo de estrellas físicamente cercanas|Group of physically nearby stars|Gruppe räumlich benachbarter Sterne|Groupe d’étoiles physiquement proches|Groep sterren die dicht bij elkaar staan|Grupp av stjärnor som ligger nära varandra|Gruppe stjerner som ligger nær hverandre',
  miniGalaxy:'Pequena galáxia|Piccola galassia|Galaxia pequeña|Small galaxy|Kleine Galaxie|Petite galaxie|Klein sterrenstelsel|Liten galax|Liten galakse',
  planetGroup:'Grupo de planetas|Gruppo di pianeti|Grupo de planetas|Group of planets|Gruppe von Planeten|Groupe de planètes|Groep planeten|Grupp av planeter|Gruppe planeter'
};
const BANK=[];
// Each question has one verifiable answer, and four separately localized alternatives.
function q(id,topic,diff,correct,options,raw){
 const prompts=columns(raw);
 if(prompts.length!==9)throw Error('Untranslated question: '+id);
 BANK.push({id,topic,diff,correct,options,prompts});
}
q('s01','solar','easy','mercury',['mercury','venus','earth','mars'], 'Qual é o planeta mais próximo do Sol?|Qual è il pianeta più vicino al Sole?|¿Qué planeta está más cerca del Sol?|Which planet is closest to the Sun?|Welcher Planet ist der Sonne am nächsten?|Quelle planète est la plus proche du Soleil ?|Welke planeet staat het dichtst bij de zon?|Vilken planet ligger närmast solen?|Hvilken planet er nærmest solen?');
q('s02','solar','easy','jupiter',['saturn','jupiter','neptune','uranus'], 'Qual é o maior planeta do Sistema Solar?|Qual è il pianeta più grande del Sistema solare?|¿Cuál es el planeta más grande del Sistema Solar?|Which is the largest planet in the Solar System?|Welcher ist der größte Planet im Sonnensystem?|Quelle est la plus grande planète du Système solaire ?|Wat is de grootste planeet van het zonnestelsel?|Vilken är solsystemets största planet?|Hvilken planet er størst i solsystemet?');
q('s03','solar','medium','venus',['venus','mercury','mars','jupiter'], 'Qual planeta tem a superfície mais quente?|Quale pianeta ha la superficie più calda?|¿Qué planeta tiene la superficie más caliente?|Which planet has the hottest surface?|Welcher Planet hat die heißeste Oberfläche?|Quelle planète a la surface la plus chaude ?|Welke planeet heeft het heetste oppervlak?|Vilken planet har hetast yta?|Hvilken planet har varmest overflate?');
q('s04','solar','easy','mars',['earth','neptune','mars','venus'], 'Qual planeta é chamado de Planeta Vermelho?|Quale pianeta è chiamato Pianeta Rosso?|¿Qué planeta se conoce como el Planeta Rojo?|Which planet is known as the Red Planet?|Welcher Planet wird Roter Planet genannt?|Quelle planète est appelée la planète rouge ?|Welke planeet heet de rode planeet?|Vilken planet kallas den röda planeten?|Hvilken planet kalles den røde planeten?');
q('s05','solar','easy','neptune',['neptune','saturn','uranus','jupiter'], 'Qual é o planeta mais distante do Sol?|Qual è il pianeta più lontano dal Sole?|¿Cuál es el planeta más lejano al Sol?|Which planet is farthest from the Sun?|Welcher Planet ist am weitesten von der Sonne entfernt?|Quelle planète est la plus éloignée du Soleil ?|Welke planeet staat het verst van de zon?|Vilken planet ligger längst från solen?|Hvilken planet er lengst fra solen?');
q('s06','solar','easy','saturn',['jupiter','uranus','saturn','mars'], 'Qual planeta é famoso pelos seus anéis visíveis?|Quale pianeta è famoso per i suoi anelli ben visibili?|¿Qué planeta es famoso por sus anillos visibles?|Which planet is famous for its prominent rings?|Welcher Planet ist für seine auffälligen Ringe bekannt?|Quelle planète est célèbre pour ses anneaux très visibles ?|Welke planeet staat bekend om zijn opvallende ringen?|Vilken planet är känd för sina tydliga ringar?|Hvilken planet er kjent for sine tydelige ringer?');
q('s07','solar','easy','eight',['seven','eight','nine','ten'], 'Quantos planetas reconhecidos existem no Sistema Solar?|Quanti pianeti riconosciuti ci sono nel Sistema solare?|¿Cuántos planetas reconocidos hay en el Sistema Solar?|How many recognized planets are in the Solar System?|Wie viele anerkannte Planeten gibt es im Sonnensystem?|Combien y a-t-il de planètes reconnues dans le Système solaire ?|Hoeveel erkende planeten zijn er in het zonnestelsel?|Hur många erkända planeter finns i solsystemet?|Hvor mange anerkjente planeter finnes i solsystemet?');
q('s08','solar','medium','jupiter',['jupiter','saturn','earth','neptune'], 'Em qual planeta fica a Grande Mancha Vermelha?|Su quale pianeta si trova la Grande Macchia Rossa?|¿En qué planeta está la Gran Mancha Roja?|Which planet has the Great Red Spot?|Auf welchem Planeten befindet sich der Große Rote Fleck?|Sur quelle planète se trouve la Grande Tache rouge ?|Op welke planeet bevindt zich de Grote Rode Vlek?|På vilken planet finns den stora röda fläcken?|På hvilken planet finnes den store røde flekken?');
q('s09','solar','medium','belt3',['belt1','belt2','belt3','belt4'], 'Entre quais planetas fica o cinturão principal de asteroides?|Tra quali pianeti si trova la fascia principale degli asteroidi?|¿Entre qué planetas está el cinturón principal de asteroides?|Between which planets is the main asteroid belt?|Zwischen welchen Planeten liegt der Hauptasteroidengürtel?|Entre quelles planètes se trouve la ceinture principale d’astéroïdes ?|Tussen welke planeten ligt de belangrijkste planetoïdengordel?|Mellan vilka planeter ligger det huvudsakliga asteroidbältet?|Mellom hvilke planeter ligger hovedasteroidebeltet?');
q('s10','solar','hard','uranus',['uranus','venus','neptune','saturn'], 'Qual planeta gira com o eixo quase deitado em relação à sua órbita?|Quale pianeta ruota con l’asse quasi sdraiato rispetto alla sua orbita?|¿Qué planeta gira con su eje casi acostado respecto a su órbita?|Which planet rotates with its axis tipped almost sideways relative to its orbit?|Welcher Planet rotiert mit einer fast seitlich geneigten Achse?|Quelle planète tourne avec un axe presque couché par rapport à son orbite ?|Welke planeet draait met een as die bijna op zijn kant ligt?|Vilken planet har en rotationsaxel som nästan ligger ner?|Hvilken planet har en rotasjonsakse som nesten ligger på siden?');
q('s11','solar','medium','saturn',['mars','jupiter','saturn','neptune'], 'Titã é uma lua grande de qual planeta?|Titano è una grande luna di quale pianeta?|¿De qué planeta es luna Titán?|Titan is a large moon of which planet?|Zu welchem Planeten gehört der große Mond Titan?|Titan est une grande lune de quelle planète ?|Van welke planeet is Titan een grote maan?|Vilken planet har den stora månen Titan?|Hvilken planet har den store månen Titan?');
q('s12','solar','medium','pluto',['pluto','ceres','eris','haumea'], 'Qual planeta anão já foi classificado como o nono planeta?|Quale pianeta nano era in passato classificato come nono pianeta?|¿Qué planeta enano se clasificaba antes como el noveno planeta?|Which dwarf planet was formerly classified as the ninth planet?|Welcher Zwergplanet galt früher als neunter Planet?|Quelle planète naine était autrefois classée neuvième planète ?|Welke dwergplaneet werd vroeger de negende planeet genoemd?|Vilken dvärgplanet räknades tidigare som den nionde planeten?|Hvilken dvergplanet ble tidligere regnet som den niende planeten?');
q('p01','space','medium','gagarin',['armstrong','gagarin','glenn','shepard'], 'Quem foi a primeira pessoa a viajar para o espaço?|Chi è stata la prima persona a viaggiare nello spazio?|¿Quién fue la primera persona en viajar al espacio?|Who was the first person to travel into space?|Wer war der erste Mensch im Weltraum?|Qui fut la première personne à voyager dans l’espace ?|Wie was de eerste mens in de ruimte?|Vem var den första människan i rymden?|Hvem var det første mennesket i verdensrommet?');
q('p02','space','easy','armstrong',['aldrin','armstrong','gagarin','glenn'], 'Quem foi a primeira pessoa a pisar na Lua?|Chi fu la prima persona a camminare sulla Luna?|¿Quién fue la primera persona en pisar la Luna?|Who was the first person to walk on the Moon?|Wer betrat als erster Mensch den Mond?|Qui fut la première personne à marcher sur la Lune ?|Wie was de eerste mens op de maan?|Vem var den första människan på månen?|Hvem var det første mennesket på månen?');
q('p03','space','easy','y1969',['y1965','y1969','y1972','y1981'], 'Em que ano humanos pousaram na Lua pela primeira vez?|In quale anno gli esseri umani sbarcarono per la prima volta sulla Luna?|¿En qué año llegaron los humanos a la Luna por primera vez?|In what year did humans first land on the Moon?|In welchem Jahr landeten erstmals Menschen auf dem Mond?|En quelle année les humains ont-ils marché pour la première fois sur la Lune ?|In welk jaar landden mensen voor het eerst op de maan?|Vilket år landade människor på månen för första gången?|Hvilket år landet mennesker på månen for første gang?');
q('p04','space','medium','fusion',['fusion','fission','combustion','friction'], 'Qual processo fornece a maior parte da energia do Sol?|Quale processo produce gran parte dell’energia del Sole?|¿Qué proceso produce la mayor parte de la energía del Sol?|What process produces most of the Sun’s energy?|Welcher Prozess erzeugt den Großteil der Sonnenenergie?|Quel processus produit l’essentiel de l’énergie du Soleil ?|Welk proces produceert het grootste deel van de energie van de zon?|Vilken process ger solen det mesta av dess energi?|Hvilken prosess produserer mesteparten av solens energi?');
q('p05','space','easy','vacuum',['vacuum','water','air','steel'], 'Em qual destes meios o som não pode se propagar?|In quale di questi mezzi il suono non può propagarsi?|¿En cuál de estos medios no puede propagarse el sonido?|In which of these environments can sound not propagate?|In welchem dieser Medien kann sich Schall nicht ausbreiten?|Dans lequel de ces milieux le son ne peut-il pas se propager ?|In welk van deze media kan geluid zich niet voortplanten?|I vilket av dessa medier kan ljud inte färdas?|I hvilket av disse mediene kan lyd ikke forplante seg?');
q('p06','space','medium','distSunEarth',['distEarthMoon','distSunEarth','distEarthMars','galaxyDiameter'], 'O que uma unidade astronômica (UA) representa aproximadamente?|Che cosa rappresenta approssimativamente un’unità astronomica (UA)?|¿Qué representa aproximadamente una unidad astronómica (UA)?|What does one astronomical unit (AU) approximately represent?|Was entspricht ungefähr einer Astronomischen Einheit (AE)?|À quoi correspond approximativement une unité astronomique (UA) ?|Wat vertegenwoordigt één astronomische eenheid (AE) ongeveer?|Vad motsvarar en astronomisk enhet (AE) ungefär?|Hva tilsvarer én astronomisk enhet (AE) omtrent?');
q('p07','space','hard','freefall',['noGravity','freefall','farEarth','moonGravity'], 'Por que astronautas em órbita parecem não ter peso?|Perché gli astronauti in orbita sembrano senza peso?|¿Por qué los astronautas en órbita parecen no tener peso?|Why do astronauts in orbit appear weightless?|Warum erscheinen Astronauten im Orbit schwerelos?|Pourquoi les astronautes en orbite semblent-ils en apesanteur ?|Waarom lijken astronauten in een baan om de aarde gewichtloos?|Varför verkar astronauter i omloppsbana tyngdlösa?|Hvorfor virker astronauter i bane vektløse?');
q('p08','space','hard','infrared',['infrared','radio','gamma','ultraviolet'], 'Que tipo de luz o telescópio James Webb observa principalmente?|Che tipo di luce osserva principalmente il telescopio James Webb?|¿Qué tipo de luz observa principalmente el telescopio James Webb?|Which type of light does the James Webb telescope primarily observe?|Welche Art von Licht beobachtet das James-Webb-Teleskop hauptsächlich?|Quel type de lumière le télescope James-Webb observe-t-il principalement ?|Welk soort licht neemt de James Webb-telescoop vooral waar?|Vilken typ av ljus observerar James Webb-teleskopet främst?|Hvilken type lys observerer James Webb-teleskopet hovedsakelig?');
q('p09','space','medium','exhaust',['exhaust','airPush','magnetic','sunlight'], 'Como um foguete consegue acelerar no vácuo?|Come fa un razzo ad accelerare nel vuoto?|¿Cómo consigue acelerar un cohete en el vacío?|How can a rocket accelerate in a vacuum?|Wie kann eine Rakete im Vakuum beschleunigen?|Comment une fusée peut-elle accélérer dans le vide ?|Hoe kan een raket versnellen in een vacuüm?|Hur kan en raket accelerera i vakuum?|Hvordan kan en rakett akselerere i vakuum?');
q('p10','space','medium','hubble',['webb','hubble','kepler','chandra'], 'Qual telescópio espacial foi lançado em 1990 e orbita a Terra?|Quale telescopio spaziale fu lanciato nel 1990 e orbita la Terra?|¿Qué telescopio espacial fue lanzado en 1990 y orbita la Tierra?|Which space telescope was launched in 1990 and orbits Earth?|Welches Weltraumteleskop wurde 1990 gestartet und umkreist die Erde?|Quel télescope spatial lancé en 1990 tourne autour de la Terre ?|Welke ruimtetelescoop werd in 1990 gelanceerd en draait om de aarde?|Vilket rymdteleskop sköts upp 1990 och kretsar kring jorden?|Hvilket romteleskop ble skutt opp i 1990 og går i bane rundt jorden?');
q('a01','astronomy','easy','milkyway',['andromeda','milkyway','triangulum','whirlpool'], 'Como se chama a galáxia que contém o Sistema Solar?|Come si chiama la galassia che contiene il Sistema solare?|¿Cómo se llama la galaxia que contiene el Sistema Solar?|What is the galaxy containing the Solar System called?|Wie heißt die Galaxie, in der sich unser Sonnensystem befindet?|Comment s’appelle la galaxie qui contient le Système solaire ?|Hoe heet het sterrenstelsel waarin ons zonnestelsel ligt?|Vad heter galaxen där solsystemet finns?|Hva heter galaksen som inneholder solsystemet?');
q('a02','astronomy','easy','sun',['sirius','proxima','sun','alpha'], 'Qual é a estrela mais próxima da Terra?|Qual è la stella più vicina alla Terra?|¿Cuál es la estrella más cercana a la Tierra?|Which star is closest to Earth?|Welcher Stern ist der Erde am nächsten?|Quelle étoile est la plus proche de la Terre ?|Welke ster staat het dichtst bij de aarde?|Vilken stjärna ligger närmast jorden?|Hvilken stjerne er nærmest jorden?');
q('a03','astronomy','medium','distance',['duration','distance','brightness','temperature'], 'O que mede um ano-luz?|Che cosa misura un anno luce?|¿Qué mide un año luz?|What does a light-year measure?|Was misst ein Lichtjahr?|Que mesure une année-lumière ?|Wat meet een lichtjaar?|Vad mäter ett ljusår?|Hva måler et lysår?');
q('a04','astronomy','easy','solarEclipse',['solarEclipse','lunarEclipse','newMoon','meteorShower'], 'Como se chama o fenômeno em que a Lua bloqueia a luz do Sol vista da Terra?|Come si chiama il fenomeno in cui la Luna copre il Sole visto dalla Terra?|¿Cómo se llama el fenómeno en el que la Luna tapa el Sol visto desde la Tierra?|What is it called when the Moon blocks the Sun as seen from Earth?|Wie heißt es, wenn der Mond von der Erde aus die Sonne verdeckt?|Comment appelle-t-on le phénomène où la Lune masque le Soleil vu de la Terre ?|Hoe heet het als de maan vanaf de aarde gezien de zon bedekt?|Vad kallas det när månen skymmer solen sedd från jorden?|Hva kalles det når månen dekker solen sett fra jorden?');
q('a05','astronomy','medium','lunarEclipse',['solarEclipse','lunarEclipse','newMoon','meteorShower'], 'Qual fenômeno ocorre quando a Terra projeta sua sombra na Lua?|Quale fenomeno avviene quando la Terra proietta la sua ombra sulla Luna?|¿Qué fenómeno ocurre cuando la Tierra proyecta su sombra sobre la Luna?|What occurs when Earth casts its shadow on the Moon?|Was geschieht, wenn die Erde ihren Schatten auf den Mond wirft?|Quel phénomène se produit lorsque la Terre projette son ombre sur la Lune ?|Wat gebeurt er als de aarde haar schaduw op de maan werpt?|Vad händer när jorden kastar sin skugga på månen?|Hva skjer når jorden kaster skyggen sin på månen?');
q('a06','astronomy','hard','blue',['red','blue','yellow','orange'], 'Qual destas cores costuma indicar as estrelas de superfície mais quente?|Quale di questi colori indica in genere le stelle con superficie più calda?|¿Cuál de estos colores suele indicar las estrellas con superficie más caliente?|Which color typically indicates the hottest stellar surfaces among these choices?|Welche dieser Farben steht meist für die heißesten Sternoberflächen?|Laquelle de ces couleurs indique généralement les surfaces stellaires les plus chaudes ?|Welke kleur duidt meestal op de heetste steroppervlakken?|Vilken av dessa färger visar vanligtvis de hetaste stjärnytorna?|Hvilken av disse fargene tyder vanligvis på de varmeste stjerneoverflatene?');
q('a07','astronomy','medium','dustCloud',['dustCloud','galaxy','asteroid','comet'], 'O que é uma nebulosa na astronomia?|Che cos’è una nebulosa in astronomia?|¿Qué es una nebulosa en astronomía?|What is a nebula in astronomy?|Was ist ein Nebel in der Astronomie?|Qu’est-ce qu’une nébuleuse en astronomie ?|Wat is een nevel in de astronomie?|Vad är en nebulosa inom astronomin?|Hva er en stjernetåke i astronomi?');
q('a08','astronomy','medium','exoplanet',['exoplanet','dwarfPlanet','asteroid','moonObj'], 'Como se chama um planeta fora do nosso Sistema Solar?|Come si chiama un pianeta al di fuori del Sistema solare?|¿Cómo se llama un planeta fuera de nuestro Sistema Solar?|What is a planet outside our Solar System called?|Wie nennt man einen Planeten außerhalb unseres Sonnensystems?|Comment appelle-t-on une planète située hors du Système solaire ?|Hoe heet een planeet buiten ons zonnestelsel?|Vad kallas en planet utanför vårt solsystem?|Hva kalles en planet utenfor solsystemet vårt?');
q('a09','astronomy','medium','seasonsTilt',['seasonsTilt','seasonsDist','phases','solarEclipse'], 'Qual é a causa principal das estações do ano na Terra?|Qual è la causa principale delle stagioni sulla Terra?|¿Cuál es la causa principal de las estaciones en la Tierra?|What is the primary cause of Earth’s seasons?|Was ist die Hauptursache für die Jahreszeiten auf der Erde?|Quelle est la cause principale des saisons sur Terre ?|Wat is de belangrijkste oorzaak van de seizoenen op aarde?|Vad är huvudorsaken till årstiderna på jorden?|Hva er hovedårsaken til årstidene på jorden?');
q('a10','astronomy','hard','stellarExplosion',['galaxyBirth','stellarExplosion','lunarEclipse','planetSpin'], 'O que é uma supernova?|Che cos’è una supernova?|¿Qué es una supernova?|What is a supernova?|Was ist eine Supernova?|Qu’est-ce qu’une supernova ?|Wat is een supernova?|Vad är en supernova?|Hva er en supernova?');
q('a11','astronomy','hard','noEscape',['noEscape','earthAtmos','sunSurface','planetRing'], 'O que define o horizonte de eventos de um buraco negro?|Che cosa definisce l’orizzonte degli eventi di un buco nero?|¿Qué define el horizonte de sucesos de un agujero negro?|What defines a black hole’s event horizon?|Was definiert den Ereignishorizont eines Schwarzen Lochs?|Qu’est-ce qui définit l’horizon des événements d’un trou noir ?|Wat is de waarnemingshorizon van een zwart gat?|Vad definierar händelsehorisonten hos ett svart hål?|Hva definerer hendelseshorisonten til et svart hull?');
q('a12','astronomy','medium','starPattern',['starGroup','starPattern','miniGalaxy','planetGroup'], 'O que é uma constelação no céu noturno?|Che cos’è una costellazione nel cielo notturno?|¿Qué es una constelación en el cielo nocturno?|What is a constellation in the night sky?|Was ist ein Sternbild am Nachthimmel?|Qu’est-ce qu’une constellation dans le ciel nocturne ?|Wat is een sterrenbeeld aan de nachtelijke hemel?|Vad är en stjärnbild på natthimlen?|Hva er et stjernebilde på nattehimmelen?');
// Localized interface and automatic shuffled rounds.
let lang='pt',selected=[],index=0,answers=[],chosen=null,score=0,streak=0,correctCount=0,finished=false,started=false,order=[],best=0;
try{best=Number(localStorage.getItem('astronomyQuizBestV1'))||0;}catch(e){}
const i=()=>Math.max(0,langNames.indexOf(lang));
const text=(key)=>{const s=pack[key];return s?columns(s)[i()]:key;};
const term=(key)=>{const s=T[key];return s?columns(s)[i()]:key;};
const fmt=(template,items)=>template.replace(/\{(\w+)\}/g,(_,k)=>items[k]??'');
const shuffle=(arr)=>{const copy=arr.slice();for(let j=copy.length-1;j>0;j--){const r=Math.floor(Math.random()*(j+1));[copy[j],copy[r]]=[copy[r],copy[j]];}return copy;};
function translate(){root.querySelectorAll('[data-aq-i18n]').forEach(el=>{el.textContent=text(el.dataset.aqI18n);});$('start').textContent=text(started?'replay':'start');$('replay').textContent=text('replay');$('best').textContent=best; if(finished)renderFinish(); else if(started)render();}
function stats(){ $('score').textContent=score; $('correct').textContent=correctCount; $('streak').textContent=streak; $('best').textContent=best; }
function setVisible(){ $('welcome').hidden=started; $('play').hidden=!started||finished; $('finish').hidden=!finished; $('start').textContent=text(started?'replay':'start');}
function start(){
 const topic=$('topic').value,diff=$('difficulty').value;
 const eligible=BANK.filter(item=>(topic==='all'||item.topic===topic)&&(diff==='all'||item.diff===diff));
 selected=shuffle(eligible).slice(0,Math.min(Number($('length').value)||10,eligible.length));
 index=0;score=0;streak=0;correctCount=0;chosen=null;answers=[];finished=false;started=true;
 order=shuffle(selected[0]?.options||[]);
 setVisible();stats();render();
}
function render(){
 setVisible();stats();
 if(!started||finished)return;
 const question=selected[index];if(!question)return finish();
 $('number').textContent=`${text('question')} ${index+1} ${text('of')} ${selected.length}`;
 $('category').textContent=text(question.topic)+' · '+text(question.diff);
 $('question').textContent=question.prompts[i()];
 $('progress').style.width=(100*(index+(chosen!==null?1:0))/selected.length)+'%';
 $('progress').setAttribute('aria-valuenow',String(Math.round(100*(index+(chosen!==null?1:0))/selected.length)));
 const options=$('options');options.replaceChildren();
 for(let n=0;n<order.length;n++){
  const key=order[n];const b=document.createElement('button');b.type='button';b.className='aq-answer';b.dataset.key=key;b.disabled=chosen!==null;
  const letter=document.createElement('span');letter.className='aq-letter';letter.textContent=String(n+1);
  const caption=document.createElement('span');caption.textContent=term(key);
  b.append(letter,caption);
  if(chosen!==null){if(key===question.correct)b.classList.add('aq-correct');else if(key===chosen)b.classList.add('aq-wrong');}
  b.addEventListener('click',()=>answer(key));options.appendChild(b);
 }
 $('feedback').hidden=chosen===null;
 if(chosen!==null){
  const kind=chosen==='skip'?'skipped':chosen===question.correct?'right':'wrong';
  $('feedback').className='aq-feedback '+(kind==='right'?'good':'miss');
  $('feedback-title').textContent=text(kind);
  $('feedback-answer').textContent=text('answer')+' '+term(question.correct);
 }
 $('next').hidden=chosen===null;
 $('next').textContent=text(index===selected.length-1?'results':'next');
 $('skip').hidden=chosen!==null;
}
function answer(key){
 if(!started||finished||chosen!==null)return;
 const question=selected[index];if(!question)return;
 chosen=key;
 if(key===question.correct){correctCount++;streak++;score+=100+(streak-1)*20;}
 else streak=0;
 stats();render();
}
function next(){if(chosen===null)return;if(index===selected.length-1){finish();return;}index++;chosen=null;order=shuffle(selected[index].options);render();}
function renderFinish(){$('final-score').textContent=score+' '+text('points');$('final-text').textContent=fmt(text('finish'),{got:correctCount,total:selected.length,pct:selected.length?Math.round(correctCount/selected.length*100):0});}
function finish(){finished=true;setVisible();renderFinish();$('progress').style.width='100%';$('progress').setAttribute('aria-valuenow','100');if(score>best){best=score;try{localStorage.setItem('astronomyQuizBestV1',String(best));}catch(e){}}stats();}
$('start').addEventListener('click',start);
$('replay').addEventListener('click',start);
$('next').addEventListener('click',next);
$('skip').addEventListener('click',()=>answer('skip'));
$('language').addEventListener('change',e=>{lang=e.target.value;translate();});
// Only act on game shortcuts when the quiz is visible; do not intercept other games.
window.addEventListener('keydown',e=>{
 if(root.hidden||!started||finished||e.altKey||e.metaKey||e.ctrlKey||e.repeat)return;
 const target=e.target;if(target&&(target.matches('input,textarea,select')||target.isContentEditable))return;
 if(chosen===null&&/^[1-4]$/.test(e.key)){const key=order[Number(e.key)-1];if(key){answer(key);e.preventDefault();}}
 else if(chosen!==null&&e.key==='Enter'){next();e.preventDefault();}
});
// Diagnostics for internal integration tests.
root.dataset.questionCount=String(BANK.length);
const defaultLang=document.getElementById('ss-language')?.value||'pt';lang=langNames.includes(defaultLang)?defaultLang:'pt';$('language').value=lang;
translate();stats();setVisible();
})();

