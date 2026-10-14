        // Wordle multilíngue: palavras carregadas dos dicionários públicos do LibreOffice.
        (() => {
            const LANGUAGES = {
                pt: { label: 'Português', locale: 'pt-BR', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/pt_BR/pt_BR.dic' },
                it: { label: 'Italiano', locale: 'it-IT', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/it_IT/it_IT.dic' },
                es: { label: 'Espanhol', locale: 'es-ES', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/es/es_ES.dic' },
                en: { label: 'Inglês', locale: 'en-US', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/en/en_US.dic' },
                de: { label: 'Alemão', locale: 'de-DE', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/de/de_DE_frami.dic' },
                fr: { label: 'Francês', locale: 'fr-FR', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/fr_FR/dictionaries/fr.dic' },
                nl: { label: 'Holandês', locale: 'nl-NL', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/nl_NL/nl_NL.dic' },
                sv: { label: 'Sueco', locale: 'sv-SE', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/sv_SE/dictionaries/sv_SE.dic' },
                no: { label: 'Norueguês (bokmål)', locale: 'nb-NO', url: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/no/nb_NO.dic' }
            };
            // Lista reserva pequena para manter o jogo jogável se a conexão falhar.
            const FALLBACK = {
                pt: 'sol lua mar paz amor vida casa flor beijo feliz sonho noite mundo sorriso carinho coracao saudade alegria casal juntos eterno'.split(' '),
                it: 'sole mare pace amore bacio bella cuore felice sogno notte mondo sorriso insieme eterno'.split(' '),
                es: 'sol mar paz amor vida casa flor beso feliz sueño noche mundo sonrisa cariño pareja juntos eterno'.split(' '),
                en: 'sun sky sea love life home rose kiss happy dream night world smile heart couple together forever'.split(' '),
                de: 'see sonne herz liebe leben haus blume kuss glueck traum nacht welt laecheln paar zusammen immer'.split(' '),
                fr: 'mer paix amour vie maison fleur bisou heureux reve nuit monde sourire coeur couple ensemble toujours'.split(' '),
                nl: 'zon zee liefde leven huis bloem kus blij droom nacht wereld glimlach hart samen altijd'.split(' '),
                sv: 'sol hav kärlek liv hem blomma kyss glad dröm natt värld hjärta tillsammans alltid'.split(' '),
                no: 'sol hav kjærlighet liv hjem blomst kyss glad drøm natt verden hjerte sammen alltid'.split(' ')
            };
            const board = document.getElementById('wordle-board');
            const status = document.getElementById('wordle-status');
            const input = document.getElementById('wordle-input');
            const form = document.getElementById('wordle-form');
            const submit = document.getElementById('wordle-submit');
            const languageSelect = document.getElementById('wordle-language');
            const lengthSelect = document.getElementById('wordle-length');
            const attemptsSelect = document.getElementById('wordle-attempts');
            const wordLists = new Map();
            let activeLanguage = LANGUAGES.pt;
            let validWords = new Set();
            let answer = '';
            let guesses = [];
            let finished = false;
            let shareRows = [];
            let loadSequence = 0;

            const normalize = (value, language = activeLanguage) => value.normalize('NFC').toLocaleLowerCase(language.locale);
            const lettersOf = value => Array.from(value);
            const displayLetter = value => value === 'ß' ? 'ẞ' : value.toLocaleUpperCase(activeLanguage.locale);

            function parseDictionary(raw, language) {
                const words = new Set();
                for (const line of raw.replace(/^\uFEFF/, '').split(/\r?\n/)) {
                    // Hunspell .dic entries may include morphology flags after a slash.
                    const entry = line.trim().split(/\s+/)[0].split('/')[0];
                    if (!entry) continue;
                    const word = normalize(entry, language);
                    if (/^\p{L}+$/u.test(word)) words.add(word);
                }
                return words;
            }

            // Pool extensível: dois tipos de léxico (Hunspell + corpus de frequência),
            // Wikcionário da própria língua e variantes regionais confirmadas.
            // Cada fonte adiciona palavras à MESMA coleção, sem bloquear as outras.
            const DICTIONARY_VARIANTS = {
                pt: ['https://raw.githubusercontent.com/LibreOffice/dictionaries/master/pt_PT/pt_PT.dic'],
                en: ['https://raw.githubusercontent.com/LibreOffice/dictionaries/master/en/en_GB.dic']
            };
            const FREQUENCY_FOLDERS = {pt:['pt_br','pt'],no:['no','nb']};
            const BLOCKED = new Set(['sexo','porn','porno','pornografia','fuck','fucking','shit','asshole','bitch','merda','puta','puto','foda','foder','mierda','putain','merde','scheisse','scheiße']);
            const multiPools = new Map();
            const frequencyCache = new Map();

            const isUsableWord = (word, code) => {
                if (typeof word !== 'string') return false;
                const cleaned = word.trim().normalize('NFC').toLocaleLowerCase(LANGUAGES[code].locale);
                return /^\p{L}{2,24}$/u.test(cleaned) && !BLOCKED.has(cleaned);
            };
            async function textFromProvider(url, timeout=14000) {
                const ctl = new AbortController();
                const timer = setTimeout(()=>ctl.abort(),timeout);
                try {
                    const response = await fetch(url,{signal:ctl.signal});
                    if(!response.ok)throw new Error('HTTP '+response.status);
                    return await response.text();
                } finally {clearTimeout(timer);}
            }
            async function frequentWords(code) {
                if(!frequencyCache.has(code)) {
                    const request=(async()=>{
                        const folders=FREQUENCY_FOLDERS[code]||[code];
                        for(const folder of folders){
                            try {
                                const url=`https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/${folder}/${folder}_50k.txt`;
                                const raw=await textFromProvider(url);
                                const words=[];const used=new Set();
                                for(const line of raw.split(/\r?\n/)){
                                    const token=line.trim().split(/\s+/)[0];
                                    if(!isUsableWord(token,code))continue;
                                    const w=normalize(token,LANGUAGES[code]);
                                    if(used.has(w))continue;
                                    used.add(w);words.push(w);
                                    if(words.length>=45000)break;
                                }
                                if(words.length>=200)return words;
                            } catch(_) { /* tentar a próxima versão da lista */ }
                        }
                        throw new Error('Corpus de frequência indisponível.');
                    })();
                    frequencyCache.set(code,request);
                }
                return frequencyCache.get(code).catch(error=>{frequencyCache.delete(code);throw error;});
            }
            async function randomWiktionaryWords(code) {
                const words=new Set();
                const base=`https://${code}.wiktionary.org/w/api.php`;
                for(let batch=0;batch<2;batch++){
                    const params=new URLSearchParams({action:'query',list:'random',rnnamespace:'0',rnlimit:'250',format:'json',origin:'*'});
                    try {
                        const raw=await textFromProvider(base+'?'+params,10000);
                        const data=JSON.parse(raw);
                        for(const page of data.query?.random||[]){
                            const title=String(page.title||'');
                            if(!isUsableWord(title,code))continue;
                            words.add(normalize(title,LANGUAGES[code]));
                        }
                    } catch(_){break;}
                }
                if(words.size<10)throw new Error('Wikcionário temporariamente indisponível.');
                return [...words];
            }
            function poolMeta(code){
                const meta=multiPools.get(code);
                return meta?{count:meta.words.size,verifiedCount:meta.verified.size,sources:[...meta.sources],pending:meta.pending}:null;
            }
            function broadcastPool(code){
                window.dispatchEvent(new CustomEvent('dictionary-pool-update',{detail:{code,...poolMeta(code)}}));
            }
            function initializePool(code){
                if(multiPools.has(code))return multiPools.get(code);
                const words=new Set(FALLBACK[code].filter(w=>isUsableWord(w,code)).map(w=>normalize(w,LANGUAGES[code])));
                const meta={words,verified:new Set(),sources:new Set(),pending:0,ready:null};
                multiPools.set(code,meta);
                const providers=[
                    {name:'LibreOffice',verified:true,run:async()=>{
                        const raw=await textFromProvider(LANGUAGES[code].url);
                        return parseDictionary(raw,LANGUAGES[code]);
                    }},
                    ...((DICTIONARY_VARIANTS[code]||[]).map((url,i)=>({name:'LibreOffice (variante '+(i+2)+')',verified:true,run:async()=>parseDictionary(await textFromProvider(url),LANGUAGES[code])}))),
                    {name:'FrequencyWords',verified:false,run:()=>frequentWords(code)},
                    {name:'Wikcionário '+code.toUpperCase(),verified:true,run:()=>randomWiktionaryWords(code)}
                ];
                meta.pending=providers.length;
                const tasks=providers.map(provider=>(async()=>{
                    let result;
                    try {
                        result=await provider.run();
                        let accepted=0;
                        for(const word of result){
                            if(!isUsableWord(word,code))continue;
                            const w=normalize(word,LANGUAGES[code]);
                            words.add(w);
                            if(provider.verified)meta.verified.add(w);
                            accepted++;
                        }
                        if(accepted<10)throw new Error('Lista incompleta.');
                        meta.sources.add(provider.name);
                        broadcastPool(code);
                        return accepted;
                    } finally {meta.pending--;broadcastPool(code);}
                })());
                // Inicia o jogo assim que a primeira fonte ampla responder.
                // Outras fontes continuam alimentando o mesmo Set em segundo plano.
                meta.ready=Promise.any(tasks).then(()=>meta.words).catch(()=>meta.words);
                return meta;
            }
            async function fetchWordList(code){
                const meta=initializePool(code);
                await meta.ready;
                return meta.words;
            }
            window.MultiDictionaryCatalog={
                getWords:fetchWordList,
                getFrequency:frequentWords,
                getMeta:poolMeta,
                getVerified:code=>initializePool(code).verified,
                getCachedWords:code=>initializePool(code).words,
                refresh:code=>{multiPools.delete(code);return fetchWordList(code);}
            };

            // Compartilha o carregador e o cache de dicionários com o jogo de desenho.
            window.WordleLanguages = LANGUAGES;
            window.WordleFetchWordList = fetchWordList;

            function makeBoard() {
                const wordLength = Number(lengthSelect.value);
                const attempts = Number(attemptsSelect.value);
                board.innerHTML = '';
                board.style.maxWidth = `${Math.min(560, wordLength * 46 + (wordLength - 1) * 8)}px`;
                for (let r = 0; r < attempts; r++) {
                    const row = document.createElement('div');
                    row.className = 'grid gap-2';
                    row.style.gridTemplateColumns = `repeat(${wordLength}, minmax(0, 1fr))`;
                    for (let c = 0; c < wordLength; c++) {
                        const tile = document.createElement('div');
                        tile.id = `wordle-${r}-${c}`;
                        tile.className = 'aspect-square min-w-0 rounded-lg border border-roseGold/25 bg-black/20 flex items-center justify-center font-bold text-white';
                        tile.style.fontSize = wordLength >= 9 ? 'clamp(.65rem, 2vw, 1rem)' : wordLength >= 7 ? 'clamp(.8rem, 2.5vw, 1.25rem)' : 'clamp(1rem, 3vw, 1.5rem)';
                        row.appendChild(tile);
                    }
                    board.appendChild(row);
                }
            }

            function paintGuess(word, rowIndex) {
                const letters = lettersOf(word);
                const result = Array(letters.length).fill('absent');
                const remaining = lettersOf(answer);
                letters.forEach((letter, i) => {
                    if (letter === remaining[i]) { result[i] = 'correct'; remaining[i] = null; }
                });
                letters.forEach((letter, i) => {
                    if (result[i] === 'correct') return;
                    const found = remaining.indexOf(letter);
                    if (found !== -1) { result[i] = 'present'; remaining[found] = null; }
                });
                const colors = {
                    correct: 'bg-emerald-700 border-emerald-600',
                    present: 'bg-amber-600 border-amber-500',
                    absent: 'bg-slate-700 border-slate-600'
                };
                letters.forEach((letter, i) => {
                    const tile = document.getElementById(`wordle-${rowIndex}-${i}`);
                    tile.textContent = displayLetter(letter);
                    tile.className += ` ${colors[result[i]]}`;
                });
                shareRows.push(result.map(x => ({ correct: '🟩', present: '🟨', absent: '⬛' })[x]).join(''));
                return result.every(x => x === 'correct');
            }

            function startGame(allWords, isFallback = false) {
                activeLanguage = LANGUAGES[languageSelect.value];
                const wordLength = Number(lengthSelect.value);
                const attempts = Number(attemptsSelect.value);
                const candidates = [...allWords].filter(word => lettersOf(word).length === wordLength);
                validWords = new Set(candidates);
                if (!candidates.length) {
                    answer = '';
                    finished = true;
                    makeBoard();
                    input.value = '';
                    input.disabled = true;
                    submit.disabled = true;
                    status.textContent = `Não há palavras de ${wordLength} letras disponíveis no idioma ${activeLanguage.label}. Escolha outro tamanho.`;
                    return;
                }
                answer = candidates[Math.floor(Math.random() * candidates.length)];
                guesses = [];
                finished = false;
                shareRows = [];
                makeBoard();
                input.value = '';
                input.maxLength = wordLength + 2;
                input.placeholder = `Digite ${wordLength} letras`;
                input.disabled = false;
                submit.disabled = false;
                status.textContent = `${activeLanguage.label}: palavra de ${wordLength} letras • ${attempts} tentativas${isFallback ? ' (lista de reserva)' : ''}.`;
                updateWordleSources();
                input.focus();
            }

            function updateWordleSources(){
                const el=document.getElementById('wordle-dictionary-sources');
                const info=window.MultiDictionaryCatalog?.getMeta(languageSelect.value);
                if(!el||!info)return;
                el.textContent=`${info.count.toLocaleString('pt-BR')} palavras únicas • ${info.sources.length} fontes: ${info.sources.join(', ')||'lista local'}${info.pending?' • ampliando…':''}`;
            }
            window.addEventListener('dictionary-pool-update',event=>{
                if(event.detail.code===languageSelect.value)updateWordleSources();
            });

            async function loadAndStartGame() {
                const sequence = ++loadSequence;
                activeLanguage = LANGUAGES[languageSelect.value];
                finished = true;
                input.disabled = true;
                submit.disabled = true;
                status.textContent = `Carregando dicionário de ${activeLanguage.label}…`;
                try {
                    const words = await fetchWordList(languageSelect.value);
                    if (sequence !== loadSequence) return;
                    const summary=window.MultiDictionaryCatalog.getMeta(languageSelect.value);
                    startGame(words, !summary?.sources?.length);
                } catch (error) {
                    if (sequence !== loadSequence) return;
                    const fallback = new Set(FALLBACK[languageSelect.value].map(word => normalize(word, activeLanguage)));
                    startGame(fallback, true);
                    if (!finished) status.textContent += ' — o dicionário online não respondeu; a lista de reserva é limitada.';
                }
            }

            form.addEventListener('submit', event => {
                event.preventDefault();
                if (finished || !answer) return;
                const wordLength = Number(lengthSelect.value);
                const attempts = Number(attemptsSelect.value);
                const guess = normalize(input.value.trim());
                if (!/^\p{L}+$/u.test(guess) || lettersOf(guess).length !== wordLength) {
                    status.textContent = `Digite uma palavra com exatamente ${wordLength} letras.`;
                    return;
                }
                if (!validWords.has(guess) && !window.MultiDictionaryCatalog.getCachedWords(languageSelect.value).has(guess)) {
                    status.textContent = 'Essa palavra ainda não foi encontrada nas fontes deste idioma. Tente outra.';
                    return;
                }
                const won = paintGuess(guess, guesses.length);
                guesses.push(guess);
                input.value = '';
                if (won) {
                    finished = true;
                    status.textContent = `Acertaram em ${guesses.length} ${guesses.length === 1 ? 'tentativa' : 'tentativas'}! A palavra era ${answer.toLocaleUpperCase(activeLanguage.locale)}.`;
                } else if (guesses.length === attempts) {
                    finished = true;
                    status.textContent = `Fim de jogo! A palavra era ${answer.toLocaleUpperCase(activeLanguage.locale)}.`;
                } else {
                    status.textContent = `Tentativa ${guesses.length} de ${attempts}.`;
                }
                if (finished) { input.disabled = true; submit.disabled = true; }
            });

            document.getElementById('wordle-new').addEventListener('click', loadAndStartGame);
            languageSelect.addEventListener('change', loadAndStartGame);
            lengthSelect.addEventListener('change', loadAndStartGame);
            attemptsSelect.addEventListener('change', loadAndStartGame);
            document.getElementById('wordle-share').addEventListener('click', async () => {
                if (!guesses.length) { status.textContent = 'Façam pelo menos uma tentativa antes de compartilhar.'; return; }
                const result = `Termo ${guesses.length}/${Number(attemptsSelect.value)} • ${Number(lengthSelect.value)} letras • ${activeLanguage.label}\n${shareRows.join('\n')}`;
                try { await navigator.clipboard.writeText(result); status.textContent = 'Resultado copiado!'; }
                catch { status.textContent = result; }
            });

            makeBoard();
            loadAndStartGame();
        })();



