
/* Caça-Palavras Multilíngue — jogo independente das demais seções. */
(() => {
    'use strict';
    const $ = id => document.getElementById(id);
    const board = $('ws-board');
    if (!board) return;

    const language = $('ws-language'), count = $('ws-count'), size = $('ws-size');
    const newButton = $('ws-new'), revealButton = $('ws-reveal');
    const status = $('ws-status'), wordList = $('ws-word-list'), progress = $('ws-progress');
    const source = $('ws-source');
    const scroller = $('ws-scroll'), fitButton = $('ws-fit');
    const zoomOut = $('ws-zoom-out'), zoomIn = $('ws-zoom-in'), zoomStatus = $('ws-zoom-status');
    const checkH = $('ws-horizontal'), checkV = $('ws-vertical');
    const checkD = $('ws-diagonal'), checkR = $('ws-reverse');
    const localeByCode = {pt:'pt-BR',it:'it-IT',es:'es-ES',en:'en-US',de:'de-DE',fr:'fr-FR',nl:'nl-NL',sv:'sv-SE',no:'nb-NO'};
    const frequencyFolders = { pt:['pt_br','pt'],no:['no','nb'] };
    const backup = {
      pt: 'amigo escola janela banana livro musica jardim menina menino cidade cavalo gato cachorro domingo segunda praia chuva nuvem sorriso comida alegre familia sorriso estrela inverno verao caminho cadeira cozinha desenho floresta laranja montanha sapato viagem planeta oceano inverno segredo perfume melodia surpresa amizade palavra carinho pintura segredo cadeira castelo aventura mochila natureza morango chocolate bicicleta borboleta'.split(' '),
      it: 'amico scuola finestra banana libro musica giardino ragazza ragazzo citta cavallo gatto cane domenica spiaggia pioggia nuvola sorriso cucina famiglia stella inverno estate strada sedia cucina disegno foresta arancia montagna scarpa viaggio pianeta oceano segreto profumo melodia sorpresa amicizia parola affetto pittura castello avventura zaino natura fragola cioccolato bicicletta farfalla'.split(' '),
      es: 'amigo escuela ventana banana libro musica jardin chica chico ciudad caballo gato perro domingo playa lluvia nube sonrisa comida alegre familia estrella invierno verano camino silla cocina dibujo bosque naranja montana zapato viaje planeta oceano secreto perfume melodia sorpresa amistad palabra carino pintura castillo aventura mochila naturaleza fresa chocolate bicicleta mariposa'.split(' '),
      en: 'friend school window banana book music garden girl boy city horse cat dog sunday beach rain cloud smile food happy family star winter summer road chair kitchen drawing forest orange mountain shoe journey planet ocean secret perfume melody surprise friendship word painting castle adventure backpack nature strawberry chocolate bicycle butterfly'.split(' '),
      de: 'freund schule fenster banane buch musik garten maedchen junge stadt pferd katze hund sonntag strand regen wolke laecheln essen glueck familie stern winter sommer straße stuhl kueche zeichnung wald orange berg schuh reise planet ozean geheimnis parfum melodie ueberraschung freundschaft wort malerei schloss abenteuer rucksack natur erdbeere schokolade fahrrad schmetterling'.split(' '),
      fr: 'ami ecole fenetre banane livre musique jardin fille garcon ville cheval chat chien dimanche plage pluie nuage sourire manger heureux famille etoile hiver ete chemin chaise cuisine dessin foret orange montagne chaussure voyage planete ocean secret parfum melodie surprise amitie parole peinture chateau aventure nature fraise chocolat bicyclette papillon'.split(' '),
      nl: 'vriend school raam banaan boek muziek tuin meisje jongen stad paard kat hond zondag strand regen wolk glimlach eten gelukkig familie ster winter zomer straat stoel keuken tekening bos sinaasappel berg schoen reis planeet oceaan geheim parfum melodie verrassing vriendschap woord schilderij kasteel avontuur rugzak natuur aardbei chocolade fiets vlinder'.split(' '),
      sv: 'van skola fonster banan bok musik tradgard flicka pojke stad hast katt hund sondag strand regn moln leende mat glad familj stjarna vinter sommar gata stol kok teckning skog apelsin berg sko resa planet hav hemlighet parfym melodi overrraskning vanskap ord malning slott aventyr ryggsack natur jordgubbe choklad cykel fjaril'.split(' '),
      no: 'venn skole vindu banan bok musikk hage jente gutt by hest katt hund sondag strand regn sky smil mat glad familie stjerne vinter sommer gate stol kjokken tegning skog appelsin fjell sko reise planet hav hemmelighet parfyme melodi overraskelse vennskap ord maleri slott eventyr ryggsekk natur jordbaer sjokolade sykkel sommerfugl'.split(' ')
    };
    const freqCache = new Map();
    const rand = n => Math.floor(Math.random()*n);
    const shuffle = values => {
        for (let i=values.length-1;i>0;i--) {const j=rand(i+1); [values[i],values[j]]=[values[j],values[i]];}
        return values;
    };
    const letters = text => Array.from(text);
    const forGrid = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
        .replace(/ß/gi,'ss').replace(/æ/gi,'ae').replace(/œ/gi,'oe')
        .replace(/ø/gi,'o').replace(/ð/gi,'d').replace(/þ/gi,'th').toUpperCase();
    const allowedWord = str => /^\p{L}+$/u.test(str);
    const censor = new Set(['sexo','sex','porn','porno','pornografia','fuck','fucking','shit','asshole','bitch','merda','puta','puto','foda','foder','mierda','mierdas','putain','merde','scheisse','scheiße','kuken','helvete']);
    let puzzle = null, found = new Set(), revealed = false, requestNumber = 0;
    let pointer = null, anchor = null, preview = [];
    let zoomLevel = 1; // 1 means the whole puzzle fits inside the visible game panel.
    const setStatus = (message, error=false) => { status.textContent = message; status.style.color = error?'#fda4af':'#fecdd3'; };

    function layoutWordSearch() {
        if (!puzzle || !scroller.clientWidth) return;
        const style = window.getComputedStyle(scroller);
        const available = scroller.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const sidePadding = 2; // 1px internal board padding on each side
        const gap = 2;
        const fitted = Math.min(36, Math.max(1, Math.floor((available - sidePadding - gap * (puzzle.size - 1)) / puzzle.size)));
        const cellSize = Math.max(1, Math.min(48, Math.round(fitted * zoomLevel)));
        board.style.setProperty('--ws-cell-size', cellSize + 'px');
        fitButton.disabled = zoomLevel <= 1;
        zoomOut.disabled = zoomLevel <= 1;
        zoomIn.disabled = cellSize >= 48;
        zoomStatus.textContent = zoomLevel === 1 ? 'Grade inteira visível' : `Zoom ${Math.round(zoomLevel * 100)}% · deslize para ver o restante`;
        if (zoomLevel === 1) scroller.scrollLeft = 0;
    }

    fitButton.addEventListener('click', () => { zoomLevel = 1; layoutWordSearch(); });
    zoomOut.addEventListener('click', () => { zoomLevel = Math.max(1, +(zoomLevel - .25).toFixed(2)); layoutWordSearch(); });
    zoomIn.addEventListener('click', () => { zoomLevel = Math.min(5, +(zoomLevel + .25).toFixed(2)); layoutWordSearch(); });
    if ('ResizeObserver' in window) {
        new ResizeObserver(() => layoutWordSearch()).observe(scroller);
    } else {
        window.addEventListener('resize', layoutWordSearch);
    }

    async function fetchSimpleWords(code) {
        if(!freqCache.has(code)) {
            const promise=(async()=>{
                let frequency=[];let fromFrequency=true;
                try {frequency=await window.MultiDictionaryCatalog.getFrequency(code);}
                catch(_) {fromFrequency=false;}
                let pool;
                try {pool=await window.WordleFetchWordList(code);}
                catch(_) {pool=new Set(backup[code]||[]);}
                const verified=window.MultiDictionaryCatalog?.getVerified(code)||new Set();
                const result=[],seen=new Set();
                const candidates=fromFrequency?[...frequency,...pool]:[...pool];
                for(const item of candidates){
                    if(!allowedWord(item)||censor.has(item.toLowerCase()))continue;
                    const word=item.normalize('NFC').toLocaleLowerCase(localeByCode[code]);
                    const grid=forGrid(word);
                    if(grid.length<3||grid.length>10||!/^[A-Z]+$/.test(grid)||seen.has(grid))continue;
                    seen.add(grid);result.push(word);
                }
                if(result.length<70)throw new Error('Listas online indisponíveis.');
                // Verified means we have at least one spelling dictionary, not just a frequency corpus.
                return {words:result,verified:verified.size>=100};
            })();
            freqCache.set(code,promise);
        }
        try{return await freqCache.get(code);}catch(error){freqCache.delete(code);throw error;}
    }
    window.addEventListener('dictionary-pool-update',event=>{
        if(event.detail.sources?.length)freqCache.delete(event.detail.code);
    });
    window.addEventListener('dictionary-pool-update',event=>{
        if(event.detail.code!==language.value||!puzzle)return;
        if(event.detail.sources?.length)source.textContent=`${event.detail.count.toLocaleString('pt-BR')} palavras únicas · ${event.detail.sources.join(', ')}${event.detail.pending?' · ampliando…':''}`;
    });
    function directions() {
        const basic=[];
        if(checkH.checked) basic.push([0,1]);
        if(checkV.checked) basic.push([1,0]);
        if(checkD.checked) basic.push([1,1],[1,-1]);
        if(checkR.checked) basic.push(...basic.map(([dr,dc])=>[-dr,-dc]));
        return basic;
    }
    function normalizedCandidates(pool,min,max) {
        const seen = new Set();
        return pool.flatMap(word => {
            if(!allowedWord(word))return [];
            const grid = forGrid(word);
            if(!/^[A-Z]+$/.test(grid) || grid.length<min || grid.length>max || seen.has(grid) || censor.has(word.toLowerCase()))return [];
            seen.add(grid);
            return [{display:word.toLocaleUpperCase(localeByCode[language.value]),grid}];
        });
    }
    function makePuzzle(words,dirList) {
        const maxLen=Math.max(...words.map(w=>w.grid.length));
        const avg=words.reduce((sum,w)=>sum+w.grid.length,0)/words.length;
        const startingSize=Math.max(10,maxLen+2,Math.ceil(Math.sqrt(words.length*avg*2.6)));
        for(let G=startingSize;G<=Math.max(startingSize,26);G++) {
            for(let restart=0;restart<18;restart++) {
                const grid=Array.from({length:G},()=>Array(G).fill(''));
                const placements=[];
                let valid=true;
                for(const word of [...words].sort((a,b)=>b.grid.length-a.grid.length)) {
                    const candidatePositions=[];
                    const chars=letters(word.grid);
                    for(let t=0;t<370;t++) {
                        const [dr,dc]=dirList[rand(dirList.length)];
                        const row=rand(G),col=rand(G);
                        const endR=row+dr*(chars.length-1),endC=col+dc*(chars.length-1);
                        if(endR<0 || endC<0 || endR>=G || endC>=G)continue;
                        const cells=[];
                        let overlap=0,conflict=false;
                        for(let i=0;i<chars.length;i++) {
                            const r=row+dr*i,c=col+dc*i;
                            const previous=grid[r][c];
                            if(previous && previous!==chars[i]){conflict=true;break;}
                            if(previous) overlap++;
                            cells.push([r,c]);
                        }
                        if(conflict || overlap===chars.length)continue;
                        candidatePositions.push({cells,overlap});
                        if(candidatePositions.length>=55)break;
                    }
                    if(!candidatePositions.length) {valid=false;break;}
                    const best=shuffle(candidatePositions).sort((a,b)=>b.overlap-a.overlap).slice(0,8);
                    const chosen=best[rand(best.length)];
                    chars.forEach((ch,i)=>{const [r,c]=chosen.cells[i];grid[r][c]=ch;});
                    placements.push({...word,cells:chosen.cells});
                }
                if(!valid)continue;
                const alphabet=words.flatMap(w=>letters(w.grid));
                for(let r=0;r<G;r++)for(let c=0;c<G;c++) if(!grid[r][c])grid[r][c]=alphabet[rand(alphabet.length)];
                return {grid,size:G,placements};
            }
        }
        return null;
    }
    const keyForPath = cells => cells.map(([r,c])=>`${r}:${c}`).join('|');
    function linePath(first,last) {
        if(!puzzle)return [];
        const dr=last[0]-first[0], dc=last[1]-first[1];
        if(dr && dc && Math.abs(dr)!==Math.abs(dc))return [];
        if(!dr && !dc)return [first];
        const n=Math.max(Math.abs(dr),Math.abs(dc));
        const stepR=Math.sign(dr),stepC=Math.sign(dc);
        return Array.from({length:n+1},(_,i)=>[first[0]+stepR*i,first[1]+stepC*i]);
    }
    function paintPreview(cells) {
        preview.forEach(([r,c])=>cellAt(r,c)?.classList.remove('ws-preview'));
        preview=cells;
        preview.forEach(([r,c])=>cellAt(r,c)?.classList.add('ws-preview'));
    }
    function cellAt(row,col){return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);}
    function paint() {
        if(!puzzle)return;
        const complete=new Set();const hints=new Set();
        for(let i=0;i<puzzle.placements.length;i++) {
            if(found.has(i) || revealed) {
                const target=found.has(i)?complete:hints;
                for(const cell of puzzle.placements[i].cells)target.add(cell.join(':'));
            }
        }
        for(const cell of board.children) {
            const key=`${cell.dataset.row}:${cell.dataset.col}`;
            cell.classList.toggle('ws-found',complete.has(key));
            cell.classList.toggle('ws-revealed',hints.has(key) && !complete.has(key));
        }
        const listItems=wordList.querySelectorAll('li');
        listItems.forEach((item,i)=>{
            item.classList.toggle('ws-word-found',found.has(i));
            item.classList.toggle('ws-word-revealed',revealed&&!found.has(i));
        });
        progress.textContent=`${found.size} / ${puzzle.placements.length}`;
    }
    function choose(first,last) {
        if(!puzzle || revealed)return;
        const selection=linePath(first,last);
        paintPreview([]);
        if(selection.length<2)return;
        const path=keyForPath(selection);
        const reversePath=keyForPath([...selection].reverse());
        const idx=puzzle.placements.findIndex(({cells},i)=>!found.has(i) && (keyForPath(cells)===path || keyForPath(cells)===reversePath));
        if(idx<0){setStatus('Esta sequência não corresponde a uma palavra da lista. Tente outra direção.');return;}
        found.add(idx);
        paint();
        setStatus(`Você encontrou ${puzzle.placements[idx].display}! ${found.size} de ${puzzle.placements.length} palavras.`);
        if(found.size===puzzle.placements.length){setStatus(`Parabéns! Você encontrou todas as ${found.size} palavras!`);revealButton.disabled=true;}
    }
    function getCell(event) {
        const el=document.elementFromPoint(event.clientX,event.clientY)?.closest('.ws-cell');
        if(!el || !board.contains(el))return null;
        return [Number(el.dataset.row),Number(el.dataset.col)];
    }
    function same(a,b){return a && b && a[0]===b[0] && a[1]===b[1];}
    board.addEventListener('pointerdown',event=>{
        if(!puzzle||revealed||event.button!==0)return;
        const first=getCell(event);
        if(!first)return;
        pointer={id:event.pointerId,first,last:first,moved:false};
        board.setPointerCapture?.(event.pointerId);
        paintPreview([first]);
    });
    board.addEventListener('pointermove',event=>{
        if(!pointer || pointer.id!==event.pointerId)return;
        const over=getCell(event);
        if(!over)return;
        if(!same(over,pointer.first))pointer.moved=true;
        pointer.last=over;
        paintPreview(linePath(pointer.first,over));
    });
    board.addEventListener('pointerup',event=>{
        if(!pointer || pointer.id!==event.pointerId)return;
        const start=pointer.first;
        const end=getCell(event)||pointer.last;
        const moved=pointer.moved && !same(start,end);
        pointer=null;
        paintPreview([]);
        if(moved){anchor=null;choose(start,end);}
        else if(anchor && !same(anchor,end)){const previous=anchor;anchor=null;choose(previous,end);}
        else{anchor=end;paintPreview([end]);setStatus('Agora escolha a última letra da palavra (ou arraste entre as duas extremidades).');}
    });
    board.addEventListener('pointercancel',()=>{pointer=null;paintPreview([]);});
    board.addEventListener('keydown',event=>{
        const current=event.target.closest('.ws-cell');
        if(!current)return;
        const r=Number(current.dataset.row),c=Number(current.dataset.col);
        const moves={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};
        if(moves[event.key]) {
            event.preventDefault();
            const [dr,dc]=moves[event.key];
            cellAt(Math.max(0,Math.min(puzzle.size-1,r+dr)),Math.max(0,Math.min(puzzle.size-1,c+dc)))?.focus();
        } else if(event.key==='Enter' || event.key===' ') {
            event.preventDefault();
            if(!anchor){anchor=[r,c];paintPreview([anchor]);}
            else{const first=anchor;anchor=null;choose(first,[r,c]);}
        }
    });
    function renderPuzzle() {
        found.clear();revealed=false;anchor=null;pointer=null;preview=[];
        board.replaceChildren();
        board.style.setProperty('--ws-grid-size',puzzle.size);
        zoomLevel = 1;
        const fragment=document.createDocumentFragment();
        for(let r=0;r<puzzle.size;r++)for(let c=0;c<puzzle.size;c++){
            const cell=document.createElement('button');
            cell.type='button';cell.className='ws-cell';
            cell.dataset.row=r;cell.dataset.col=c;
            cell.textContent=puzzle.grid[r][c];
            cell.setAttribute('aria-label',`Linha ${r+1}, coluna ${c+1}, letra ${puzzle.grid[r][c]}`);
            fragment.appendChild(cell);
        }
        board.appendChild(fragment);
        wordList.replaceChildren();
        puzzle.placements.forEach(({display})=>{
            const item=document.createElement('li');item.className='ws-word';item.textContent=display;wordList.appendChild(item);
        });
        paint();
        revealButton.disabled=false;
        layoutWordSearch();
    }
    async function createGame() {
        const token=++requestNumber;
        const dirList=directions();
        if(!dirList.length){setStatus('Ative pelo menos uma direção: horizontal, vertical ou diagonal.',true);return;}
        const wordCount=Number(count.value);
        const [min,max]=size.value.split('-').map(Number);
        newButton.disabled=true;
        revealButton.disabled=true;
        setStatus('Buscando palavras frequentes e verificando o dicionário online…');
        let online=true,verified=false,pool=[];
        try {
            const data=await fetchSimpleWords(language.value);
            pool=data.words;
            verified=data.verified;
        } catch(_) {
            online=false;
            pool=backup[language.value] || backup.pt;
        }
        if(token!==requestNumber)return;
        const candidates=normalizedCandidates(pool,min,max);
        if(candidates.length<wordCount) {
            newButton.disabled=false;
            setStatus(`Só há ${candidates.length} palavras de ${min} a ${max} letras disponíveis${online?' na fonte online':' na lista de reserva'}. Reduza a quantidade ou escolha outro tamanho.`,true);
            const summary=window.MultiDictionaryCatalog?.getMeta(language.value);
            source.textContent=online
                ? `Vocabulário de ${summary?.count.toLocaleString('pt-BR')||'?'} palavras · ${summary?.sources.join(', ')||'fontes online'}${summary?.pending?' · ampliando…':''}`
                : 'Lista de reserva: conexão indisponível.';
            return;
        }
        let generated=null;
        for(let attempt=0;attempt<10 && !generated;attempt++) {
            const words=shuffle(candidates.slice(0,Math.min(candidates.length,2500))).slice(0,wordCount);
            generated=makePuzzle(words,dirList);
        }
        newButton.disabled=false;
        if(!generated){setStatus('Não foi possível encaixar todas as palavras. Tente gerar novamente ou ative outras direções.',true);return;}
        puzzle=generated;
        renderPuzzle();
        source.textContent='';
        setStatus(`Encontre as ${wordCount} palavras de ${min} a ${max} letras. Arraste ou clique na primeira e na última letra.`);
    }
    newButton.addEventListener('click',createGame);
    revealButton.addEventListener('click',()=>{
        if(!puzzle||revealed)return;
        revealed=true;anchor=null;paintPreview([]);paint();
        revealButton.disabled=true;
        setStatus(`Soluções mostradas: ${found.size} de ${puzzle.placements.length} palavras encontradas sem ajuda.`);
    });
    // No implicit fetching until user chooses to generate; other games load as before.
})();

