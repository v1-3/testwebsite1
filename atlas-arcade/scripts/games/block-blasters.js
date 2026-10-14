
/* Block Blasters — standalone 8×8 block placement game. */
(() => {
  'use strict';
  const root=document.getElementById('block-blasters-section');
  if(!root) return;
  const $=id=>document.getElementById(id);
  const boardEl=$('bb-board'), offersEl=$('bb-offers'),frame=$('bb-frame');
  const messageEl=$('bb-message'), scoreEl=$('bb-score'),bestEl=$('bb-best'),linesEl=$('bb-lines'),comboEl=$('bb-combo');
  const langEl=$('bb-language'),endEl=$('bb-end');
  const COLORS=['#39b8e7','#eeae3a','#a880f0','#36c9a3','#fb7290','#648cf4','#e47bc5'];
  // Coordinates are normalized to the upper left of the shape. Pieces cannot rotate.
  const SHAPES=[
    [[0,0]],[[0,0],[0,1]],[[0,0],[1,0]],
    [[0,0],[0,1],[0,2]],[[0,0],[1,0],[2,0]],
    [[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[2,0],[3,0]],
    [[0,0],[0,1],[0,2],[0,3],[0,4]],[[0,0],[1,0],[2,0],[3,0],[4,0]],
    [[0,0],[0,1],[1,0],[1,1]],
    [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[1,1]],[[0,0],[0,1],[1,1]],[[0,0],[0,1],[1,0]],
    [[0,0],[1,0],[2,0],[2,1]],[[0,0],[0,1],[0,2],[1,1]],
    [[0,0],[1,0],[1,1],[2,1]],[[0,1],[1,0],[1,1],[2,0]],
    [[0,0],[0,1],[1,1],[1,2]],[[0,1],[0,2],[1,0],[1,1]],
    [[0,0],[0,1],[0,2],[1,0]],[[0,0],[0,1],[1,1],[2,1]],
    [[0,0],[0,1],[0,2],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1],[2,0]],
    [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]
  ];
  const words={
    pt:{eyebrow:'QUEBRA-CABEÇA DE BLOCOS',intro:'Encaixe as peças, complete linhas ou colunas e marque pontos.',language:'Idioma',score:'Pontos',best:'Recorde',lines:'Linhas',combo:'Combo',new:'Novo jogo',how:'Como jogar',help:'Arraste uma das três peças até o tabuleiro de 8×8, ou selecione a peça e toque numa posição. Preencha uma linha ou coluna inteira para eliminá-la. Depois de usar as três peças, outras aparecem. O jogo termina quando nenhuma peça disponível cabe no tabuleiro. As peças não giram.',ready:'Selecione uma peça e toque no tabuleiro ou arraste-a.',choose:'Selecione uma peça primeiro.',bad:'Esta peça não cabe nessa posição.',clear:'Linhas eliminadas',gameover:'Nenhuma peça cabe no tabuleiro.',endTitle:'Fim de jogo',again:'Jogar novamente',finished:'Pontuação final',piece:'Peça',used:'Peça usada',row:'Linha',column:'coluna',empty:'vazia',filled:'ocupada'},
    en:{eyebrow:'BLOCK PUZZLE',intro:'Fit shapes, clear full rows or columns, and score points.',language:'Language',score:'Score',best:'Best',lines:'Lines',combo:'Combo',new:'New game',how:'How to play',help:'Drag one of the three shapes onto the 8×8 board, or select a shape and tap a position. Fill a complete row or column to clear it. After using all three shapes, you get three more. The game ends when none of the available shapes fit. Shapes cannot rotate.',ready:'Select a piece and tap the board, or drag it into place.',choose:'Select a piece first.',bad:'This piece will not fit there.',clear:'Lines cleared',gameover:'No available pieces fit.',endTitle:'Game over',again:'Play again',finished:'Final score',piece:'Piece',used:'Used piece',row:'Row',column:'column',empty:'empty',filled:'occupied'},
    es:{eyebrow:'ROMPECABEZAS DE BLOQUES',intro:'Coloca piezas, completa filas o columnas y gana puntos.',language:'Idioma',score:'Puntos',best:'Récord',lines:'Líneas',combo:'Combo',new:'Nuevo juego',how:'Cómo jugar',help:'Arrastra una de las tres piezas al tablero de 8×8, o elige una pieza y toca una casilla. Completa una fila o columna para eliminarla. Después de usar las tres piezas, aparecen otras tres. El juego termina cuando ninguna pieza disponible cabe. Las piezas no giran.',ready:'Selecciona una pieza y toca el tablero o arrástrala.',choose:'Primero selecciona una pieza.',bad:'Esta pieza no cabe ahí.',clear:'Líneas eliminadas',gameover:'No cabe ninguna pieza.',endTitle:'Fin del juego',again:'Jugar de nuevo',finished:'Puntuación final',piece:'Pieza',used:'Pieza usada',row:'Fila',column:'columna',empty:'vacía',filled:'ocupada'},
    it:{eyebrow:'ROMPICAPO A BLOCCHI',intro:'Posiziona i pezzi, completa righe o colonne e fai punti.',language:'Lingua',score:'Punti',best:'Record',lines:'Linee',combo:'Combo',new:'Nuova partita',how:'Come giocare',help:'Trascina uno dei tre pezzi sulla griglia 8×8, oppure scegli un pezzo e tocca una casella. Completa una riga o colonna per eliminarla. Dopo i tre pezzi ne arrivano altri tre. La partita termina quando nessun pezzo disponibile entra nella griglia. I pezzi non ruotano.',ready:'Scegli un pezzo e tocca la griglia, oppure trascinalo.',choose:'Seleziona prima un pezzo.',bad:'Qui il pezzo non entra.',clear:'Linee eliminate',gameover:'Nessun pezzo disponibile entra.',endTitle:'Partita finita',again:'Gioca ancora',finished:'Punteggio finale',piece:'Pezzo',used:'Pezzo usato',row:'Riga',column:'colonna',empty:'vuota',filled:'occupata'},
    fr:{eyebrow:'CASSE-TÊTE DE BLOCS',intro:'Placez les pièces, remplissez des lignes ou colonnes et marquez des points.',language:'Langue',score:'Score',best:'Record',lines:'Lignes',combo:'Combo',new:'Nouvelle partie',how:'Comment jouer',help:'Faites glisser une des trois pièces sur la grille 8×8, ou sélectionnez une pièce et touchez une case. Remplissez une ligne ou colonne pour l’effacer. Trois nouvelles pièces apparaissent après les avoir toutes utilisées. La partie se termine quand aucune pièce restante ne peut être placée. Pas de rotation.',ready:'Choisissez une pièce et touchez la grille, ou faites-la glisser.',choose:'Choisissez d’abord une pièce.',bad:'Cette pièce ne rentre pas ici.',clear:'Lignes effacées',gameover:'Aucune pièce ne peut être placée.',endTitle:'Partie terminée',again:'Rejouer',finished:'Score final',piece:'Pièce',used:'Pièce utilisée',row:'Ligne',column:'colonne',empty:'vide',filled:'occupée'},
    de:{eyebrow:'BLOCKRÄTSEL',intro:'Lege Formen ab, vervollständige Reihen oder Spalten und sammle Punkte.',language:'Sprache',score:'Punkte',best:'Rekord',lines:'Linien',combo:'Combo',new:'Neues Spiel',how:'Spielanleitung',help:'Ziehe einen der drei Steine auf das 8×8-Feld oder wähle einen Stein aus und tippe auf eine Stelle. Ganze Reihen oder Spalten verschwinden. Sobald alle drei Steine gelegt sind, kommen neue. Das Spiel endet, wenn kein verfügbarer Stein mehr passt. Die Steine lassen sich nicht drehen.',ready:'Wähle einen Stein und tippe auf das Feld oder ziehe ihn.',choose:'Wähle zuerst einen Stein.',bad:'Dieser Stein passt dort nicht.',clear:'Linien gelöscht',gameover:'Kein verfügbarer Stein passt mehr.',endTitle:'Spiel vorbei',again:'Erneut spielen',finished:'Endpunktzahl',piece:'Stein',used:'Verwendeter Stein',row:'Reihe',column:'Spalte',empty:'leer',filled:'besetzt'},
    nl:{eyebrow:'BLOKKENPUZZEL',intro:'Plaats vormen, vul rijen of kolommen en verdien punten.',language:'Taal',score:'Punten',best:'Record',lines:'Lijnen',combo:'Combo',new:'Nieuw spel',how:'Spelregels',help:'Sleep een van de drie stukken naar het 8×8-bord, of selecteer een stuk en tik op een vak. Maak een hele rij of kolom vol om deze te wissen. Na drie stukken krijg je er drie nieuwe. Het spel eindigt wanneer geen beschikbaar stuk meer past. Stukken kunnen niet draaien.',ready:'Kies een stuk en tik op het bord, of sleep het.',choose:'Kies eerst een stuk.',bad:'Dit stuk past hier niet.',clear:'Lijnen gewist',gameover:'Geen beschikbaar stuk past.',endTitle:'Spel afgelopen',again:'Opnieuw spelen',finished:'Eindscore',piece:'Stuk',used:'Gebruikt stuk',row:'Rij',column:'kolom',empty:'leeg',filled:'bezet'},
    sv:{eyebrow:'BLOCKPUSSEL',intro:'Placera bitar, fyll rader eller kolumner och samla poäng.',language:'Språk',score:'Poäng',best:'Rekord',lines:'Linjer',combo:'Kombo',new:'Nytt spel',how:'Så spelar du',help:'Dra en av de tre bitarna till 8×8-brädet, eller välj en bit och tryck på en ruta. Fyll en hel rad eller kolumn för att ta bort den. När alla tre bitar använts får du tre nya. Spelet slutar när ingen tillgänglig bit passar. Bitar kan inte roteras.',ready:'Välj en bit och tryck på brädet, eller dra den.',choose:'Välj en bit först.',bad:'Biten passar inte där.',clear:'Rensade linjer',gameover:'Inga tillgängliga bitar passar.',endTitle:'Spelet är slut',again:'Spela igen',finished:'Slutpoäng',piece:'Bit',used:'Använd bit',row:'Rad',column:'kolumn',empty:'tom',filled:'upptagen'},
    no:{eyebrow:'BLOKKPUSLESPILL',intro:'Plasser brikker, fyll rader eller kolonner og få poeng.',language:'Språk',score:'Poeng',best:'Rekord',lines:'Linjer',combo:'Kombo',new:'Nytt spill',how:'Slik spiller du',help:'Dra en av de tre brikkene til 8×8-brettet, eller velg en brikke og trykk på en rute. Fyll en hel rad eller kolonne for å fjerne den. Etter at alle tre er brukt, kommer tre nye. Spillet slutter når ingen tilgjengelige brikker passer. Brikkene kan ikke roteres.',ready:'Velg en brikke og trykk på brettet, eller dra den.',choose:'Velg en brikke først.',bad:'Brikken passer ikke der.',clear:'Linjer fjernet',gameover:'Ingen tilgjengelige brikker passer.',endTitle:'Spillet er over',again:'Spill igjen',finished:'Sluttpoeng',piece:'Brikke',used:'Brukt brikke',row:'Rad',column:'kolonne',empty:'tom',filled:'opptatt'}
  };
  let grid,offers,selected,score,best,lines,combo,over,hover=null,drag=null,ghost=null,suppressClick=false;
  const cells=[];
  const current=()=>words[langEl.value] || words.pt;
  const t=key=>current()[key]||words.en[key]||key;
  function translate(){root.querySelectorAll('[data-bb-i18n]').forEach(el=>el.textContent=t(el.dataset.bbI18n));
    boardEl.setAttribute('aria-label','8×8 '+(langEl.value==='pt'?'tabuleiro':'board'));
    if(over) $('bb-end-score').textContent=t('finished')+': '+score;
    renderBoard();renderOffers();}
  function msg(value,kind=''){messageEl.textContent=value;messageEl.className='bb-message'+(kind?' bb-'+kind:'');}
  function bounds(shape){return [1+Math.max(...shape.map(p=>p[0])),1+Math.max(...shape.map(p=>p[1]))];}
  function makeShape(index,usedMini=false){
    const shape=offers[index];const root=document.createElement('div');root.className='bb-mini';
    const [rows,cols]=bounds(shape.cells);
    root.style.setProperty('--bb-rows',rows);root.style.setProperty('--bb-cols',cols);
    const coords=new Set(shape.cells.map(p=>p.join(',')));
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const square=document.createElement('span');square.className='bb-mini-cell';
      if(coords.has(r+','+c)){square.classList.add('bb-filled');square.style.setProperty('--bb-color',COLORS[shape.color]);}
      root.appendChild(square);
    }
    return root;
  }
  function newShape(shapeIndex){return {cells:SHAPES[shapeIndex].map(p=>p.slice()),color:Math.floor(Math.random()*COLORS.length),used:false};}
  function fits(shape,r,c){
    if(!shape)return false;
    // Cell colors are numeric indexes (including 0), so only null is empty.
    // A truthiness check incorrectly treated color 0 as free and allowed overlaps.
    return shape.cells.every(([dr,dc])=>{
      const y=r+dr,x=c+dc;
      return y>=0&&x>=0&&y<8&&x<8&&grid[y][x]===null;
    });
  }
  function hasSpot(shape){for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(fits(shape,r,c))return true;return false;}
  function canPlay(){return offers.some(shape=>!shape.used&&hasSpot(shape));}
  function newOffers(){
    offers=[];
    for(let i=0;i<3;i++){
      // Single- and small-block shapes stay common, while larger pieces add variety.
      const pool=Math.random()<.63 ? SHAPES.slice(0,16) : SHAPES;
      const shape=pool[Math.floor(Math.random()*pool.length)];
      offers.push({cells:shape.map(p=>p.slice()),color:Math.floor(Math.random()*COLORS.length),used:false});
    }
    // Do not end a run simply because the freshly dealt pieces were impossible.
    if(!canPlay()){
      const legal=SHAPES.filter(shape=>hasSpot({cells:shape}));
      if(legal.length){const picked=legal[Math.floor(Math.random()*legal.length)];offers[0]={cells:picked.map(p=>p.slice()),color:Math.floor(Math.random()*COLORS.length),used:false};}
    }
    selected=null;hover=null;
  }
  function renderOffers(){
    offersEl.replaceChildren();
    offers.forEach((shape,i)=>{
      const button=document.createElement('button');button.type='button';
      button.className='bb-piece'+(shape.used?' bb-used':'');
      button.disabled=shape.used||over;button.dataset.index=i;
      button.setAttribute('aria-pressed',String(selected===i&&!shape.used));
      button.setAttribute('aria-label',(shape.used?t('used'):t('piece'))+' '+(i+1));
      const number=document.createElement('span');number.className='bb-piece-number';number.textContent=i+1;
      button.append(number);
      if(!shape.used)button.append(makeShape(i));
      button.addEventListener('click',()=>{if(!shape.used&&!over){selected=i;hover=null;renderOffers();renderBoard();}});
      button.addEventListener('pointerdown',ev=>{
        if(shape.used||over||ev.button!==0)return;
        selected=i;renderOffers();renderBoard();
        drag={index:i,id:ev.pointerId,x:ev.clientX,y:ev.clientY};
        showGhost(ev.clientX,ev.clientY,i);
        if(ev.pointerType!=='mouse')ev.preventDefault();
      });
      offersEl.append(button);
    });
  }
  function makeCells(){
    for(let r=0;r<8;r++)for(let c=0;c<8;c++){
      const button=document.createElement('button');button.type='button';button.className='bb-cell';
      button.dataset.row=r;button.dataset.col=c;boardEl.append(button);cells.push(button);
    }
  }
  function anchorFromCell(cell){
    const r=Number(cell.dataset.row),c=Number(cell.dataset.col);
    if(selected===null||!offers[selected]||offers[selected].used)return null;
    const [h,w]=bounds(offers[selected].cells);
    return {r:r-Math.floor(h/2),c:c-Math.floor(w/2)};
  }
  function markHover(cell){
    const loc=cell?anchorFromCell(cell):null;
    if(loc&&hover&&loc.r===hover.r&&loc.c===hover.c)return;
    hover=loc;renderBoard();
  }
  function renderBoard(){
    const preview=new Set();let good=false,color;
    if(hover&&selected!==null&&offers[selected]&&!offers[selected].used&&!over){
      const shape=offers[selected];color=COLORS[shape.color];good=fits(shape,hover.r,hover.c);
      for(const [dr,dc] of shape.cells){const r=hover.r+dr,c=hover.c+dc;if(r>=0&&c>=0&&r<8&&c<8)preview.add(r+','+c);}
    }
    cells.forEach((button,i)=>{
      const r=Math.floor(i/8),c=i%8,fill=grid?.[r]?.[c];
      button.className='bb-cell';button.style.removeProperty('--bb-color');
      if(fill!==null&&fill!==undefined){button.classList.add('bb-filled');button.style.setProperty('--bb-color',COLORS[fill]);}
      if(preview.has(r+','+c)){button.classList.add(good?'bb-valid':'bb-invalid');if(good)button.style.setProperty('--bb-color',color);}
      button.setAttribute('aria-label',t('row')+' '+(r+1)+', '+t('column')+' '+(c+1)+', '+(fill===null||fill===undefined?t('empty'):t('filled')));
    });
  }
  function stats(){scoreEl.textContent=score;bestEl.textContent=best;linesEl.textContent=lines;comboEl.textContent=combo;}
  function flash(linesCount){
    const burst=$('bb-burst');burst.textContent='+'+(linesCount*75+Math.max(0,linesCount-1)*30+combo*20);
    burst.hidden=false;burst.style.animation='none';void burst.offsetHeight;burst.style.animation='bb-burst .9s ease forwards';
    burst.addEventListener('animationend',()=>{burst.hidden=true;},{once:true});
  }
  function endGame(){over=true;selected=null;hover=null;endEl.hidden=false;$('bb-end-score').textContent=t('finished')+': '+score;msg(t('gameover'));renderOffers();renderBoard();}
  function tryPlace(r,c){
    if(over)return;
    if(selected===null||offers[selected]?.used){msg(t('choose'),'error');return;}
    const shape=offers[selected];
    if(!fits(shape,r,c)){
      msg(t('bad'),'error');frame.classList.remove('bb-shake');void frame.offsetHeight;frame.classList.add('bb-shake');return;
    }
    for(const [dr,dc] of shape.cells)grid[r+dr][c+dc]=shape.color;
    score+=shape.cells.length*5;
    const fullRows=[],fullCols=[];
    for(let y=0;y<8;y++)if(grid[y].every(x=>x!==null))fullRows.push(y);
    for(let x=0;x<8;x++)if(grid.every(row=>row[x]!==null))fullCols.push(x);
    const numLines=fullRows.length+fullCols.length;
    if(numLines){
      const cleared=new Set();
      for(const y of fullRows)for(let x=0;x<8;x++)cleared.add(y+','+x);
      for(const x of fullCols)for(let y=0;y<8;y++)cleared.add(y+','+x);
      for(const position of cleared){const [y,x]=position.split(',').map(Number);grid[y][x]=null;}
      lines+=numLines;combo++;
      score+=numLines*75+Math.max(0,numLines-1)*30+combo*20;
      flash(numLines);msg(t('clear')+': '+numLines+' · '+t('combo')+' ×'+combo,'success');
    }else{combo=0;msg(t('ready'));}
    shape.used=true;selected=null;hover=null;
    if(offers.every(piece=>piece.used))newOffers();
    if(score>best){best=score;try{localStorage.setItem('block-blasters-best',String(best));}catch(e){}}
    stats();renderBoard();renderOffers();
    if(!canPlay())endGame();
  }
  function newGame(){
    grid=Array.from({length:8},()=>Array(8).fill(null));
    score=0;lines=0;combo=0;over=false;hover=null;selected=null;
    newOffers();endEl.hidden=true;$('bb-burst').hidden=true;msg(t('ready'));
    stats();renderBoard();renderOffers();
  }
  function showGhost(x,y,index){
    removeGhost();ghost=document.createElement('div');ghost.className='bb-drag-ghost';ghost.appendChild(makeShape(index));
    document.body.appendChild(ghost);moveGhost(x,y);
  }
  function moveGhost(x,y){if(ghost){ghost.style.left=x+'px';ghost.style.top=y+'px';}}
  function removeGhost(){if(ghost){ghost.remove();ghost=null;}}
  function cellAt(x,y){const hit=document.elementFromPoint(x,y);const cell=hit&&hit.closest('.bb-cell');return cell&&boardEl.contains(cell)?cell:null;}
  boardEl.addEventListener('pointermove',ev=>{if(!drag&&selected!==null)markHover(ev.target.closest('.bb-cell'));});
  boardEl.addEventListener('pointerleave',()=>{if(!drag){hover=null;renderBoard();}});
  boardEl.addEventListener('click',ev=>{
    const cell=ev.target.closest('.bb-cell');if(!cell||suppressClick)return;
    const loc=anchorFromCell(cell);if(loc)tryPlace(loc.r,loc.c);else msg(t('choose'),'error');
  });
  document.addEventListener('pointermove',ev=>{
    if(!drag||ev.pointerId!==drag.id)return;
    drag.x=ev.clientX;drag.y=ev.clientY;
    moveGhost(ev.clientX,ev.clientY);
    markHover(cellAt(ev.clientX,ev.clientY));
  });
  document.addEventListener('pointerup',ev=>{
    if(!drag||ev.pointerId!==drag.id)return;
    const cell=cellAt(ev.clientX,ev.clientY),index=drag.index;
    drag=null;removeGhost();
    if(cell&&offers[index]&&!offers[index].used){selected=index;const loc=anchorFromCell(cell);if(loc)tryPlace(loc.r,loc.c);suppressClick=true;setTimeout(()=>{suppressClick=false;},60);}
    hover=null;renderBoard();
  });
  document.addEventListener('pointercancel',ev=>{if(drag&&drag.id===ev.pointerId){drag=null;removeGhost();hover=null;renderBoard();}});
  $('bb-new').addEventListener('click',newGame);
  $('bb-play-again').addEventListener('click',newGame);
  langEl.addEventListener('change',()=>{translate();if(!over)msg(t('ready'));});
  best=0;try{best=Math.max(0,Number(localStorage.getItem('block-blasters-best'))||0);}catch(e){}
  makeCells();newGame();translate();
})();
