        // Desenho Misterioso: palavra aleatória, desenho vetorial e link compacto compartilhável.
        (() => {
            const langSelect = document.getElementById('draw-language');
            const startButton = document.getElementById('draw-start');
            const maker = document.getElementById('draw-maker');
            // Curated, drawing-friendly vocabulary. Unlike Wordle's general dictionary,
            // these lists contain only common concrete nouns that are easy to sketch.
            const DRAW_WORD_BANKS = {
                pt: 'casa carro bicicleta ônibus trem avião barco moto bola boneca urso gato cachorro peixe pássaro coelho tartaruga vaca cavalo porco galinha pato borboleta abelha aranha maçã banana laranja uva morango melancia abacaxi limão pera pão queijo ovo bolo pizza sorvete cenoura tomate batata milho cogumelo árvore flor folha sol lua estrela nuvem chuva montanha rio praia pedra cadeira mesa cama sofá porta janela relógio telefone computador televisão livro lápis caneta mochila guarda-chuva chave copo prato colher garfo faca escova pente óculos chapéu sapato meia camisa calça vestido casaco luva guitarra piano tambor'.split(' '),
                it: 'casa auto bicicletta autobus treno aereo barca moto palla bambola orso gatto cane pesce uccello coniglio tartaruga mucca cavallo maiale gallina anatra farfalla ape ragno mela banana arancia uva fragola anguria ananas limone pera pane formaggio uovo torta pizza gelato carota pomodoro patata mais fungo albero fiore foglia sole luna stella nuvola pioggia montagna fiume spiaggia sasso sedia tavolo letto divano porta finestra orologio telefono computer televisore libro matita penna zaino ombrello chiave bicchiere piatto cucchiaio forchetta coltello spazzolino pettine occhiali cappello scarpa calza camicia pantaloni vestito cappotto guanto chitarra pianoforte tamburo'.split(' '),
                es: 'casa coche bicicleta autobús tren avión barco moto pelota muñeca oso gato perro pez pájaro conejo tortuga vaca caballo cerdo gallina pato mariposa abeja araña manzana plátano naranja uva fresa sandía piña limón pera pan queso huevo pastel pizza helado zanahoria tomate patata maíz champiñón árbol flor hoja sol luna estrella nube lluvia montaña río playa piedra silla mesa cama sofá puerta ventana reloj teléfono ordenador televisor libro lápiz bolígrafo mochila paraguas llave vaso plato cuchara tenedor cuchillo cepillo peine gafas sombrero zapato calcetín camisa pantalón vestido abrigo guante guitarra piano tambor'.split(' '),
                en: 'house car bicycle bus train airplane boat motorcycle ball doll teddy cat dog fish bird rabbit turtle cow horse pig chicken duck butterfly bee spider apple banana orange grapes strawberry watermelon pineapple lemon pear bread cheese egg cake pizza icecream carrot tomato potato corn mushroom tree flower leaf sun moon star cloud rain mountain river beach rock chair table bed sofa door window clock phone computer television book pencil pen backpack umbrella key cup plate spoon fork knife toothbrush comb glasses hat shoe sock shirt trousers dress coat glove guitar piano drum'.split(' '),
                de: 'haus auto fahrrad bus zug flugzeug boot motorrad ball puppe teddy katze hund fisch vogel hase schildkröte kuh pferd schwein huhn ente schmetterling biene spinne apfel banane orange traube erdbeere wassermelone ananas zitrone birne brot käse ei kuchen pizza eis karotte tomate kartoffel mais pilz baum blume blatt sonne mond stern wolke regen berg fluss strand stein stuhl tisch bett sofa tür fenster uhr telefon computer fernseher buch bleistift stift rucksack regenschirm schlüssel glas teller löffel gabel messer zahnbürste kamm brille hut schuh socke hemd hose kleid mantel handschuh gitarre klavier trommel'.split(' '),
                fr: 'maison voiture vélo bus train avion bateau moto ballon poupée ours chat chien poisson oiseau lapin tortue vache cheval cochon poule canard papillon abeille araignée pomme banane orange raisin fraise pastèque ananas citron poire pain fromage oeuf gâteau pizza glace carotte tomate patate maïs champignon arbre fleur feuille soleil lune étoile nuage pluie montagne rivière plage pierre chaise table lit canapé porte fenêtre horloge téléphone ordinateur télévision livre crayon stylo sac parapluie clé verre assiette cuillère fourchette couteau brosse peigne lunettes chapeau chaussure chaussette chemise pantalon robe manteau gant guitare piano tambour'.split(' '),
                nl: 'huis auto fiets bus trein vliegtuig boot motor bal pop beer kat hond vis vogel konijn schildpad koe paard varken kip eend vlinder bij spin appel banaan sinaasappel druif aardbei meloen ananas citroen peer brood kaas ei taart pizza ijs wortel tomaat aardappel maïs paddenstoel boom bloem blad zon maan ster wolk regen berg rivier strand steen stoel tafel bed bank deur raam klok telefoon computer televisie boek potlood pen rugzak paraplu sleutel glas bord lepel vork mes tandenborstel kam bril hoed schoen sok shirt broek jurk jas handschoen gitaar piano trommel'.split(' '),
                sv: 'hus bil cykel buss tåg flygplan båt motorcykel boll docka nalle katt hund fisk fågel kanin sköldpadda ko häst gris höna anka fjäril bi spindel äpple banan apelsin druva jordgubbe melon ananas citron päron bröd ost ägg tårta pizza glass morot tomat potatis majs svamp träd blomma blad sol måne stjärna moln regn berg flod strand sten stol bord säng soffa dörr fönster klocka telefon dator tv bok penna ryggsäck paraply nyckel glas tallrik sked gaffel kniv tandborste kam glasögon hatt sko strumpa skjorta byxa klänning jacka handske gitarr piano trumma'.split(' '),
                no: 'hus bil sykkel buss tog fly flybåt motorsykkel ball dukke bamse katt hund fisk fugl kanin skilpadde ku hest gris høne and sommerfugl bie edderkopp eple banan appelsin drue jordbær melon ananas sitron pære brød ost egg kake pizza iskrem gulrot tomat potet mais sopp tre blomst blad sol måne stjerne sky regn fjell elv strand stein stol bord seng sofa dør vindu klokke telefon datamaskin tv bok blyant penn ryggsekk paraply nøkkel glass tallerken skje gaffel kniv tannbørste kam briller hatt sko sokk skjorte bukse kjole jakke hanske gitar piano tromme'.split(' ')
            };
            const previousSecretByLanguage = new Map();
            const promptPanel = document.getElementById('draw-prompt-panel');
            const secretWordEl = document.getElementById('draw-secret-word');
            const canvas = document.getElementById('draw-canvas');
            const ctx = canvas.getContext('2d');
            const status = document.getElementById('draw-status');
            const viewer = document.getElementById('draw-viewer');
            const viewCanvas = document.getElementById('draw-view-canvas');
            const viewCtx = viewCanvas.getContext('2d');
            const guessForm = document.getElementById('draw-guess-form');
            const guessInput = document.getElementById('draw-guess-input');
            const guessStatus = document.getElementById('draw-guess-status');
            const guessSubmit = document.getElementById('draw-guess-submit');
            let secretWord = '';
            let activeCode = 'pt';
            let strokes = [];
            let currentStroke = null;
            let pointerIsDown = false;
            let receivedPayload = null;
            let currentColor = '#23121d';
            let eraserActive = false;
            const paletteButtons = Array.from(document.querySelectorAll('.draw-color-button'));
            const eraserButton = document.getElementById('draw-eraser');
            const eraserPreview = document.getElementById('draw-eraser-preview');
            const eraserDiameter = 24; // Match the actual eraser's canvas-space stroke width.

            function hideEraserPreview() {
                eraserPreview.style.display = 'none';
            }
            function updateEraserPreview(event) {
                if (!eraserActive || promptPanel.classList.contains('hidden')) {
                    hideEraserPreview();
                    return;
                }
                const rect = canvas.getBoundingClientRect();
                if (!rect.width || !rect.height) return;
                // Use the same coordinate mapping as positionFor() and scale the 24px brush.
                const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
                const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
                eraserPreview.style.width = `${eraserDiameter * canvas.clientWidth / canvas.width}px`;
                eraserPreview.style.height = `${eraserDiameter * canvas.clientHeight / canvas.height}px`;
                eraserPreview.style.left = `${canvas.offsetLeft + canvas.clientLeft + x * canvas.clientWidth}px`;
                eraserPreview.style.top = `${canvas.offsetTop + canvas.clientTop + y * canvas.clientHeight}px`;
                eraserPreview.style.display = 'block';
            }
            canvas.addEventListener('pointerenter', updateEraserPreview);
            canvas.addEventListener('pointermove', updateEraserPreview);
            canvas.addEventListener('pointerleave', () => { if (!pointerIsDown) hideEraserPreview(); });

            function setDrawingTool(color, useEraser = false) {
                currentColor = color;
                eraserActive = useEraser;
                hideEraserPreview();
                paletteButtons.forEach(button => button.setAttribute('aria-pressed', String(!useEraser && button.dataset.color === color)));
                eraserButton.setAttribute('aria-pressed', String(useEraser));
                canvas.style.cursor = useEraser ? 'none' : 'crosshair';
            }
            paletteButtons.forEach(button => button.addEventListener('click', () => setDrawingTool(button.dataset.color)));
            eraserButton.addEventListener('click', () => setDrawingTool('#ffffff', true));

            const languageInfo = () => window.WordleLanguages?.[activeCode] || { label: langSelect.options[langSelect.selectedIndex]?.text || 'Português', locale: 'pt-BR' };
            const normalizeGuess = (value, code) => {
                const language = window.WordleLanguages?.[code] || { locale: 'pt-BR' };
                return value.trim().normalize('NFC').toLocaleLowerCase(language.locale);
            };

            function prepareCanvas(context, targetCanvas) {
                context.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.strokeStyle = '#23121d';
                context.lineWidth = 8;
            }

            function strokeData(stroke) {
                // Accept legacy shared links (an array of points) as well as styled strokes.
                if (Array.isArray(stroke)) return { points: stroke, color: '#23121d', width: 8 };
                return {
                    points: Array.isArray(stroke?.p) ? stroke.p : [],
                    color: stroke?.e ? '#ffffff' : (stroke?.c || '#23121d'),
                    width: Number.isFinite(stroke?.z) ? stroke.z : 8
                };
            }

            function redrawMaker() {
                prepareCanvas(ctx, canvas);
                for (const stroke of strokes) drawStroke(ctx, canvas, stroke);
                ctx.strokeStyle = eraserActive ? '#ffffff' : currentColor;
                ctx.fillStyle = eraserActive ? '#ffffff' : currentColor;
                ctx.lineWidth = eraserActive ? 24 : 8;
            }

            function drawStroke(context, targetCanvas, stroke) {
                const data = strokeData(stroke);
                if (!data.points.length) return;
                context.save();
                context.strokeStyle = data.color;
                context.fillStyle = data.color;
                context.lineWidth = data.width;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.beginPath();
                const coords = data.points.map(point => Array.isArray(point) ? point : [point.x, point.y]);
                const x0 = coords[0][0] / 1000 * targetCanvas.width;
                const y0 = coords[0][1] / 1000 * targetCanvas.height;
                context.moveTo(x0, y0);
                if (coords.length === 1) {
                    context.arc(x0, y0, context.lineWidth / 2, 0, Math.PI * 2);
                    context.fill();
                } else {
                    for (let i = 1; i < coords.length; i++) {
                        context.lineTo(coords[i][0] / 1000 * targetCanvas.width, coords[i][1] / 1000 * targetCanvas.height);
                    }
                    context.stroke();
                }
                context.restore();
            }

            function positionFor(event, targetCanvas) {
                const rect = targetCanvas.getBoundingClientRect();
                return [
                    Math.max(0, Math.min(1000, Math.round((event.clientX - rect.left) / rect.width * 1000))),
                    Math.max(0, Math.min(1000, Math.round((event.clientY - rect.top) / rect.height * 1000)))
                ];
            }

            function drawLiveSegment(a, b, stroke) {
                const data = strokeData(stroke);
                ctx.save();
                ctx.strokeStyle = data.color;
                ctx.lineWidth = data.width;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.beginPath();
                ctx.moveTo(a[0] / 1000 * canvas.width, a[1] / 1000 * canvas.height);
                ctx.lineTo(b[0] / 1000 * canvas.width, b[1] / 1000 * canvas.height);
                ctx.stroke();
                ctx.restore();
            }

            canvas.addEventListener('pointerdown', event => {
                if (!promptPanel.classList.contains('hidden')) {
                    updateEraserPreview(event);
                    event.preventDefault();
                    pointerIsDown = true;
                    canvas.setPointerCapture(event.pointerId);
                    currentStroke = { p: [positionFor(event, canvas)], c: eraserActive ? '#ffffff' : currentColor, e: eraserActive, z: eraserActive ? 24 : 8 };
                    strokes.push(currentStroke);
                    const p = currentStroke.p[0];
                    ctx.save();
                    ctx.fillStyle = currentStroke.c;
                    ctx.beginPath();
                    ctx.arc(p[0] / 1000 * canvas.width, p[1] / 1000 * canvas.height, currentStroke.z / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            });
            canvas.addEventListener('pointermove', event => {
                if (!pointerIsDown || !currentStroke) return;
                const point = positionFor(event, canvas);
                const points = currentStroke.p;
                const last = points[points.length - 1];
                const dx = (point[0] - last[0]) / 1000 * canvas.width;
                const dy = (point[1] - last[1]) / 1000 * canvas.height;
                if (Math.hypot(dx, dy) < 2.5) return;
                drawLiveSegment(last, point, currentStroke);
                points.push(point);
            });
            function endStroke(event) {
                pointerIsDown = false;
                currentStroke = null;
                if (event.pointerType !== 'mouse') hideEraserPreview();
            }
            canvas.addEventListener('pointerup', endStroke);
            canvas.addEventListener('pointercancel', endStroke);
            canvas.addEventListener('lostpointercapture', endStroke);

            document.getElementById('draw-clear').addEventListener('click', () => {
                strokes = [];
                currentStroke = null;
                redrawMaker();
                status.textContent = 'Desenho apagado.';
            });
            document.getElementById('draw-undo').addEventListener('click', () => {
                strokes.pop();
                currentStroke = null;
                redrawMaker();
                status.textContent = strokes.length ? 'Último traço removido.' : 'O desenho está vazio.';
            });

            function sampleStrokes(inputStrokes) {
                // Keep links compact while preserving each stroke's color and eraser mode.
                const samplePoints = points => {
                    if (points.length <= 90) return points;
                    const step = (points.length - 1) / 89;
                    const sampled = [];
                    for (let i = 0; i < 90; i++) sampled.push(points[Math.round(i * step)]);
                    return sampled;
                };
                return inputStrokes.map(stroke => {
                    if (Array.isArray(stroke)) return samplePoints(stroke); // old link format
                    return { ...stroke, p: samplePoints(stroke.p || []) };
                }).filter(stroke => Array.isArray(stroke) ? stroke.length > 0 : stroke.p.length > 0);
            }

            function setMakerMode() {
                hideEraserPreview();
                viewer.classList.add('hidden');
                maker.classList.remove('hidden');
                promptPanel.classList.add('hidden');
                startButton.classList.remove('hidden');
                secretWord = '';
                strokes = [];
                currentStroke = null;
                redrawMaker();
                guessInput.value = '';
                receivedPayload = null;
                status.textContent = 'Escolha um idioma e sorteie uma palavra para começar.';
                const cleanUrl = location.pathname + location.search;
                history.replaceState(null, '', cleanUrl);
            }

            async function startChallenge() {
                activeCode = langSelect.value;
                startButton.disabled = true;
                startButton.textContent = 'Sorteando…';
                const words = DRAW_WORD_BANKS[activeCode] || DRAW_WORD_BANKS.pt;
                const previousWord = previousSecretByLanguage.get(activeCode) || secretWord;
                const candidates = words.filter(word => normalizeGuess(word, activeCode) !== normalizeGuess(previousWord || '', activeCode));
                const availableWords = candidates.length ? candidates : words;
                secretWord = availableWords[Math.floor(Math.random() * availableWords.length)];
                previousSecretByLanguage.set(activeCode, secretWord);
                strokes = [];
                currentStroke = null;
                redrawMaker();
                secretWordEl.textContent = secretWord.toLocaleUpperCase(languageInfo().locale);
                promptPanel.classList.remove('hidden');
                startButton.classList.add('hidden');
                status.textContent = '';
                // Remove any previous challenge fragment until the new one is shared.
                history.replaceState(null, '', location.pathname + location.search);
                startButton.disabled = false;
                startButton.textContent = 'Sortear palavra';
            }
            startButton.addEventListener('click', startChallenge);
            document.getElementById('draw-another-word').addEventListener('click', startChallenge);
            langSelect.addEventListener('change', () => {
                if (!promptPanel.classList.contains('hidden')) {
                    secretWord = '';
                    strokes = [];
                    promptPanel.classList.add('hidden');
                    startButton.classList.remove('hidden');
                    redrawMaker();
                }
                status.textContent = 'Idioma alterado. Sorteie uma nova palavra.';
            });

            async function copyTextToClipboard(text) {
                // Clipboard API is preferred; the hidden textarea fallback also works on many HTTP/file setups.
                try {
                    if (navigator.clipboard?.writeText && window.isSecureContext) {
                        await navigator.clipboard.writeText(text);
                        return true;
                    }
                } catch (error) { /* Try the compatibility fallback below. */ }
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                textarea.style.top = '0';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                textarea.setSelectionRange(0, textarea.value.length);
                let copied = false;
                try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
                textarea.remove();
                return copied;
            }

            document.getElementById('draw-share').addEventListener('click', async () => {
                if (!secretWord || !strokes.length) {
                    status.textContent = 'Desenhe pelo menos um traço antes de criar o link.';
                    return;
                }
                if (!window.LZString || typeof LZString.compressToEncodedURIComponent !== 'function') {
                    status.textContent = 'A biblioteca de compactação não carregou. Verifique a conexão e recarregue a página.';
                    return;
                }
                const payload = { v: 1, l: activeCode, w: secretWord, s: sampleStrokes(strokes) };
                const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
                const shareUrl = new URL(location.href);
                shareUrl.hash = `desenho=${compressed}`;
                history.replaceState(null, '', shareUrl.pathname + shareUrl.search + shareUrl.hash);
                const copied = await copyTextToClipboard(shareUrl.href);
                if (copied) {
                    status.textContent = location.protocol === 'file:'
                        ? 'Link copiado! Para outra pessoa abrir, publique este site na internet e gere o link novamente na versão publicada.'
                        : 'Link copiado para a área de transferência. Envie para a outra pessoa adivinhar a palavra.';
                } else {
                    status.textContent = 'Não foi possível copiar automaticamente. O link já está na barra do navegador; copie-o manualmente.';
                    window.prompt('Copie este link para compartilhar o desenho:', shareUrl.href);
                }
            });

            function loadSharedChallenge() {
                const match = location.hash.match(/^#desenho=(.+)$/);
                if (!match) return false;
                if (!window.LZString) {
                    status.textContent = 'Não foi possível abrir o desenho porque a biblioteca de compactação não carregou.';
                    return true;
                }
                try {
                    const decoded = LZString.decompressFromEncodedURIComponent(match[1]);
                    const payload = JSON.parse(decoded);
                    const supported = window.WordleLanguages && window.WordleLanguages[payload.l];
                    if (payload.v !== 1 || !supported || typeof payload.w !== 'string' || !Array.isArray(payload.s)) throw new Error('Link inválido');
                    activeCode = payload.l;
                    receivedPayload = payload;
                    maker.classList.add('hidden');
                    viewer.classList.remove('hidden');
                    prepareCanvas(viewCtx, viewCanvas);
                    for (const stroke of payload.s) drawStroke(viewCtx, viewCanvas, stroke);
                    document.getElementById('draw-viewer-instructions').textContent = `Desenho misterioso — adivinhe a palavra em ${supported.label}.`;
                    guessInput.value = '';
                    guessInput.disabled = false;
                    guessSubmit.disabled = false;
                    guessStatus.textContent = '';
                    status.textContent = `Desafio recebido em ${supported.label}.`;
                } catch (error) {
                    status.textContent = 'Este link de desenho parece inválido ou incompleto.';
                }
                return true;
            }

            guessForm.addEventListener('submit', event => {
                event.preventDefault();
                if (!receivedPayload) return;
                const guess = normalizeGuess(guessInput.value, receivedPayload.l);
                const answer = normalizeGuess(receivedPayload.w, receivedPayload.l);
                if (!guess) {
                    guessStatus.textContent = 'Digite seu palpite primeiro.';
                    return;
                }
                if (guess === answer) {
                    guessStatus.textContent = `Acertou! A palavra era “${receivedPayload.w.toLocaleUpperCase(languageInfo().locale)}”.`;
                    guessStatus.className = 'text-sm text-emerald-300 min-h-5';
                    guessInput.disabled = true;
                    guessSubmit.disabled = true;
                } else {
                    guessStatus.textContent = 'Ainda não! Tente outra palavra.';
                    guessStatus.className = 'text-sm text-rose-200 min-h-5';
                    guessInput.select();
                }
            });
            document.getElementById('draw-create-another').addEventListener('click', setMakerMode);

            prepareCanvas(ctx, canvas);
            prepareCanvas(viewCtx, viewCanvas);
            if (!loadSharedChallenge()) status.textContent = 'Escolha um idioma e sorteie uma palavra para começar.';

            // Restore the actual drawing pixels when site or game themes change.
            // The strokes (including eraser strokes) remain in their original
            // coordinate system; this does not clear the drawing or shared image.
            function refreshDrawingsAfterThemeChange() {
                if (!pointerIsDown) redrawMaker();
                if (receivedPayload && !viewer.classList.contains('hidden')) {
                    prepareCanvas(viewCtx, viewCanvas);
                    for (const stroke of receivedPayload.s) drawStroke(viewCtx, viewCanvas, stroke);
                }
            }
            const drawingThemeObserver = new MutationObserver(refreshDrawingsAfterThemeChange);
            drawingThemeObserver.observe(document.documentElement, {attributes:true, attributeFilter:['data-postcard-theme']});
            const drawingGameStage = document.getElementById('game-menu-stage');
            if (drawingGameStage) {
                drawingThemeObserver.observe(drawingGameStage, {attributes:true, attributeFilter:['data-game-theme']});
            }
        })();


