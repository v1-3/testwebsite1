        // Palavras cruzadas multilíngue: palavras dos dicionários do LibreOffice (mesmos do Wordle),
        // definições para as dicas buscadas online (dictionaryapi.dev e Wiktionary).
        (() => {
            const $ = id => document.getElementById(id);
            const langSel = $('cw-language'), countSel = $('cw-count'), sizeSel = $('cw-size');
            const statusEl = $('cw-status'), wrapEl = $('cw-wrap'), gridEl = $('cw-grid');
            const zoomStatusEl = $('cw-zoom-status'), fitBtn = $('cw-fit'), zoomOutBtn = $('cw-zoom-out'), zoomInBtn = $('cw-zoom-in');
            const currentEl = $('cw-current'), statsEl = $('cw-stats');
            const acrossEl = $('cw-across'), downEl = $('cw-down');
            const LANGS = window.WordleLanguages;

            const dictCache = new Map();
            const defCache = new Map();
            let puzzle = null, active = null, hintsUsed = 0, gameId = 0, finished = false;
            let zoomLevel = 1; // 1 = always fit the entire grid, >1 = scrollable magnification

            const loc = () => LANGS[langSel.value].locale;
            const base = s => s.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
            const showLetter = ch => {
                if (ch === 'ß') return 'ẞ';
                const up = ch.toLocaleUpperCase(loc());
                return Array.from(up).length === 1 ? up : ch;
            };
            const rand = n => Math.floor(Math.random() * n);
            const pick = arr => arr[rand(arr.length)];
            const setStatus = msg => { statusEl.textContent = msg; };

            /* ---------- Dicionário ---------- */
            function parseDictionary(raw, code) {
                const locale = LANGS[code].locale;
                const allowCap = code === 'de'; // substantivos alemães são capitalizados
                const sets = {};
                const caps = new Set();
                const all = new Set();
                let total = 0;
                for (const line of raw.split(/\r?\n/)) {
                    if (!line) continue;
                    const cut = line.search(/[\s\/]/);
                    const entry = cut >= 0 ? line.slice(0, cut) : line;
                    if (entry.length < 3 || entry.length > 16 || !/^\p{L}+$/u.test(entry)) continue;
                    const isCap = entry[0] !== entry[0].toLocaleLowerCase(locale);
                    if (isCap && !allowCap) continue;                       // ignora nomes próprios
                    if (entry === entry.toLocaleUpperCase(locale)) continue; // ignora siglas
                    const word = entry.normalize('NFC').toLocaleLowerCase(locale);
                    const n = Array.from(word).length;
                    if (n < 3 || n > 12) continue;
                    (sets[n] || (sets[n] = new Set())).add(word);
                    all.add(word);
                    if (isCap) caps.add(word);
                    total++;
                }
                const buckets = {};
                for (const n in sets) buckets[n] = [...sets[n]];
                return { buckets, caps, total, all };
            }

            function updateCrosswordSources(){
                const summary=window.MultiDictionaryCatalog?.getMeta(langSel.value);
                const el=$('cw-dictionary-sources');
                if(el&&summary)el.textContent=`${summary.count.toLocaleString('pt-BR')} palavras únicas • ${summary.sources.length} fontes ativas: ${summary.sources.join(', ')||'lista local'}${summary.pending?' • ampliando…':''}`;
            }
            window.addEventListener('dictionary-pool-update',event=>{
                if(event.detail.code===langSel.value)updateCrosswordSources();
            });
            function loadDictionary(code) {
                // Reutiliza o conjunto combinado dos dicionários e do Wikcionário.
                // O cache da grade é recalculado a cada partida: o pool cresce em segundo plano.
                return window.WordleFetchWordList(code).then(words=>{
                    const buckets={},caps=new Set(),all=new Set();
                    for(const word of words){
                        const n=Array.from(word).length;
                        if(n<3||n>12||!/^[\p{L}]+$/u.test(word))continue;
                        (buckets[n]||(buckets[n]=[])).push(word);
                        all.add(word);
                    }
                    if(all.size<50)throw new Error('Nenhuma lista de palavras disponível.');
                    return {buckets,caps,total:all.size,all};
                });
            }

            /* Palavras simples: lista de frequência (FrequencyWords/OpenSubtitles) cruzada com o dicionário ortográfico */
            const FREQ_FOLDERS = { pt: ['pt_br', 'pt'] };
            const FREQ_LIMIT = 15000;
            const simpleCache = new Map();

            async function fetchFrequencyList(code) {
                const all=await window.MultiDictionaryCatalog.getFrequency(code);
                return all.slice(0,FREQ_LIMIT);
            }

            window.addEventListener('dictionary-pool-update',event=>{
                if(event.detail.sources?.length)simpleCache.delete(event.detail.code);
            });
            function loadSimpleWords(code) {
                if (!simpleCache.has(code)) {
                    const request = (async () => {
                        const dict = await loadDictionary(code);
                        let freq = null;
                        try { freq = await fetchFrequencyList(code); } catch (_) { /* usa o dicionário completo */ }
                        const buckets = {};
                        let count = 0;
                        if (freq) {
                            for (const w of new Set(freq)) {
                                if (!dict.all.has(w)) continue;
                                const n = Array.from(w).length;
                                if (n < 3 || n > 12) continue;
                                (buckets[n] || (buckets[n] = [])).push(w);
                                count++;
                            }
                        }
                        if (count < 300) return { buckets: dict.buckets, caps: dict.caps, simple: false };
                        return { buckets, caps: dict.caps, simple: true };
                    })();
                    simpleCache.set(code, request);
                }
                return simpleCache.get(code).catch(err => { simpleCache.delete(code); throw err; });
            }

            /* ---------- Gerador da grade ---------- */
            function canPlace(g, G, letters, r, c, dr, dc, dirName) {
                const n = letters.length;
                const er = r + dr * (n - 1), ec = c + dc * (n - 1);
                const inB = (a, b) => a >= 0 && b >= 0 && a < G && b < G;
                if (!inB(r, c) || !inB(er, ec)) return -1;
                if (inB(r - dr, c - dc) && g[r - dr][c - dc]) return -1;
                if (inB(er + dr, ec + dc) && g[er + dr][ec + dc]) return -1;
                let cross = 0;
                for (let i = 0; i < n; i++) {
                    const rr = r + dr * i, cc = c + dc * i;
                    const cell = g[rr][cc];
                    if (cell) {
                        if (cell.ch !== letters[i] || cell.dirs.has(dirName)) return -1;
                        cross++;
                    } else {
                        if (inB(rr + dc, cc + dr) && g[rr + dc][cc + dr]) return -1;
                        if (inB(rr - dc, cc - dr) && g[rr - dc][cc - dr]) return -1;
                    }
                }
                return cross >= n ? -1 : cross;
            }

            function tryBuild(cands, G, count) {
                const g = Array.from({ length: G }, () => Array(G).fill(null));
                const placed = [];   // células ocupadas
                const entries = [];
                let crossings = 0;
                const put = (word, letters, r, c, dirName) => {
                    const dr = dirName === 'down' ? 1 : 0, dc = dirName === 'across' ? 1 : 0;
                    letters.forEach((ch, i) => {
                        const rr = r + dr * i, cc = c + dc * i;
                        if (!g[rr][cc]) { g[rr][cc] = { ch, dirs: new Set() }; placed.push([rr, cc]); }
                        g[rr][cc].dirs.add(dirName);
                    });
                    entries.push({ word, letters, r, c, dir: dirName });
                };
                const first = cands[0], fl = Array.from(first);
                put(first, fl, Math.floor(G / 2), Math.floor((G - fl.length) / 2), 'across');
                for (let k = 1; k < cands.length && entries.length < count; k++) {
                    const word = cands[k], letters = Array.from(word);
                    let best = [], bestScore = 0;
                    for (const [pr, pc] of placed) {
                        const ch = g[pr][pc].ch;
                        for (let i = 0; i < letters.length; i++) {
                            if (letters[i] !== ch) continue;
                            for (const dirName of ['across', 'down']) {
                                if (g[pr][pc].dirs.has(dirName)) continue;
                                const dr = dirName === 'down' ? 1 : 0, dc = dirName === 'across' ? 1 : 0;
                                const r = pr - dr * i, c = pc - dc * i;
                                const score = canPlace(g, G, letters, r, c, dr, dc, dirName);
                                if (score < 1) continue;
                                if (score > bestScore) { bestScore = score; best = [[r, c, dirName]]; }
                                else if (score === bestScore) best.push([r, c, dirName]);
                            }
                        }
                    }
                    if (best.length) {
                        const [r, c, dirName] = pick(best);
                        put(word, letters, r, c, dirName);
                        crossings += bestScore;
                    }
                }
                return { entries, crossings };
            }

            function buildPuzzle(dict, minL, maxL, count) {
                const lens = [];
                for (let l = minL; l <= maxL; l++) if (dict.buckets[l] && dict.buckets[l].length) lens.push(l);
                if (!lens.length) return null;
                const avg = (minL + maxL) / 2;
                const available = lens.reduce((s, l) => s + dict.buckets[l].length, 0);
                const G = Math.max(9, Math.min(30, Math.max(maxL + 4, Math.ceil(Math.sqrt(count * avg) * 2))));
                let best = null;
                const deadline = performance.now() + 1500;
                for (let attempt = 0; attempt < 120 && performance.now() < deadline; attempt++) {
                    const pool = new Set();
                    let guard = 0;
                    while (pool.size < Math.min(count * 14, available) && guard++ < count * 60) pool.add(pick(dict.buckets[pick(lens)]));
                    const cands = [...pool];
                    // a palavra mais longa vai primeiro, para a grade se espalhar
                    let li = 0;
                    cands.forEach((w, i) => { if (Array.from(w).length > Array.from(cands[li]).length) li = i; });
                    [cands[0], cands[li]] = [cands[li], cands[0]];
                    const res = tryBuild(cands, G, count);
                    const score = res.entries.length * 1000 + res.crossings;
                    if (!best || score > best.score) best = { ...res, score };
                    if (best.entries.length >= count && attempt >= 12) break;
                }
                if (!best) return null;
                return finalizePuzzle(best.entries, dict);
            }

            function finalizePuzzle(rawEntries, dict) {
                let minR = Infinity, minC = Infinity, maxR = -1, maxC = -1;
                for (const e of rawEntries) {
                    const er = e.r + (e.dir === 'down' ? e.letters.length - 1 : 0);
                    const ec = e.c + (e.dir === 'across' ? e.letters.length - 1 : 0);
                    minR = Math.min(minR, e.r); minC = Math.min(minC, e.c);
                    maxR = Math.max(maxR, er); maxC = Math.max(maxC, ec);
                }
                const rows = maxR - minR + 1, cols = maxC - minC + 1;
                const cells = Array.from({ length: rows }, () => Array(cols).fill(null));
                const entries = rawEntries.map(e => ({ ...e, r: e.r - minR, c: e.c - minC, cells: [], solved: false, def: (dict.defs && dict.defs.get(e.word)) || '' }));
                for (const e of entries) {
                    e.letters.forEach((ch, i) => {
                        const r = e.r + (e.dir === 'down' ? i : 0), c = e.c + (e.dir === 'across' ? i : 0);
                        const cell = cells[r][c] || (cells[r][c] = { r, c, ch, entries: {}, value: '', locked: false, wrong: false, num: 0, el: null, input: null });
                        cell.entries[e.dir] = e;
                        e.cells.push(cell);
                    });
                }
                let n = 0;
                for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
                    const cell = cells[r][c];
                    if (!cell) continue;
                    const starts = entries.filter(e => e.r === r && e.c === c);
                    if (starts.length) { n++; cell.num = n; starts.forEach(e => { e.num = n; }); }
                }
                entries.sort((a, b) => a.num - b.num || (a.dir === 'across' ? -1 : 1));
                return { rows, cols, cells, entries, caps: dict.caps };
            }

            /* ---------- Definições (dicas) ---------- */
            const DICT_API = { en: 'en', es: 'es', fr: 'fr', de: 'de', it: 'it', pt: 'pt-BR' };
            const WIKI_KEYS = { no: ['nb', 'no'] };
            const WIKI_LANGUAGE_NAMES = {
                pt: 'Portuguese', it: 'Italian', es: 'Spanish', en: 'English', de: 'German', fr: 'French',
                nl: 'Dutch', sv: 'Swedish', no: 'Norwegian Bokmål'
            };
            const synonymCache = new Map();

            async function fetchJSON(url) {
                const ctl = new AbortController();
                const timer = setTimeout(() => ctl.abort(), 7000);
                try {
                    const res = await fetch(url, { signal: ctl.signal });
                    if (!res.ok) throw new Error('http ' + res.status);
                    return await res.json();
                } finally { clearTimeout(timer); }
            }
            const plainText = html => {
                const doc = new DOMParser().parseFromString(String(html), 'text/html');
                doc.querySelectorAll('style, script, noscript, template').forEach(node => node.remove());
                return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
            };
            const looksLikeStylesheet = text => {
                const value = String(text).trim();
                return /(?:^|\s)\.mw-parser-output\b/i.test(value) ||
                    (/\{[^}]*:[^}]*\}/.test(value) && /(?:color|font-|margin|padding|display|var\(--)/i.test(value));
            };
            // A source sometimes returns only the headword. After hiding that word it
            // becomes "_____", which is not a useful clue and must not be accepted.
            const hasClueText = text => {
                const withoutMask = String(text).replace(/_+/g, '');
                return !looksLikeStylesheet(withoutMask) && /[\p{L}\p{N}]/u.test(withoutMask);
            };
            const clueTerm = text => plainText(text).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
            const usableSynonyms = (values, answer) => {
                const answerTerm = clueTerm(answer);
                return [...new Set((Array.isArray(values) ? values : [])
                    .map(value => plainText(value))
                    .filter(value => value && value.length <= 60 && /[\p{L}]/u.test(value) && clueTerm(value) !== answerTerm))]
                    .slice(0, 3);
            };
            const escapeRegExp = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // The definition endpoint does not consistently include synonyms. Read the
            // language's dedicated "Synonyms" section from Wiktionary as a fallback.
            async function fromWiktionarySynonyms(code, word) {
                const key = `${code}:${word}`;
                if (synonymCache.has(key)) return synonymCache.get(key);
                const language = WIKI_LANGUAGE_NAMES[code];
                if (!language) return [];
                try {
                    const url = `https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&origin=*`;
                    const data = await fetchJSON(url);
                    const wikiText = data?.parse?.wikitext?.['*'] || '';
                    const languageMatch = wikiText.match(new RegExp(`^==\\s*${escapeRegExp(language)}\\s*==\\s*$([\\s\\S]*?)(?=^==[^=].*?==\\s*$|$)`, 'mi'));
                    const synonymMatch = languageMatch?.[1].match(/^={3,4}\\s*Synonyms\\s*={3,4}\\s*$([\\s\\S]*?)(?=^={2,4}[^=].*?={2,4}\\s*$|$)/mi);
                    if (!synonymMatch) throw new Error('no synonyms');
                    const values = [];
                    for (const match of synonymMatch[1].matchAll(/\{\{(?:syn|l|m)\|([^}]+)\}\}/gi)) {
                        values.push(...match[1].split('|').slice(1).filter(part => part && !part.includes('=')));
                    }
                    for (const match of synonymMatch[1].matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) values.push(match[1]);
                    const synonyms = usableSynonyms(values, word);
                    synonymCache.set(key, synonyms);
                    return synonyms;
                } catch (_) {
                    synonymCache.set(key, []);
                    return [];
                }
            }

            async function fromDictionaryApi(code, word) {
                const lang = DICT_API[code];
                if (!lang) throw new Error('unsupported');
                const data = await fetchJSON(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${encodeURIComponent(word)}`);
                for (const entry of Array.isArray(data) ? data : [])
                    for (const meaning of entry.meanings || [])
                        for (const d of meaning.definitions || [])
                            if (d.definition) return {
                                text: plainText(d.definition), pos: meaning.partOfSpeech, lang: code,
                                synonyms: usableSynonyms([...(meaning.synonyms || []), ...(d.synonyms || [])], word)
                            };
                throw new Error('empty');
            }
            async function fromWiktionary(host, keys, word) {
                const data = await fetchJSON(`https://${host}/api/rest_v1/page/definition/${encodeURIComponent(word)}`);
                const lang = host.split('.')[0];   // idioma em que a definição está escrita
                for (const key of keys)
                    for (const entry of data[key] || [])
                        for (const d of entry.definitions || []) {
                            const text = plainText(d.definition || '');
                            if (text.length > 3 && !looksLikeStylesheet(text)) return {
                                text, pos: entry.partOfSpeech, lang,
                                synonyms: usableSynonyms(d.synonyms, word)
                            };
                        }
                throw new Error('empty');
            }

            async function fromLocalWiktionary(code,word){
                const params=new URLSearchParams({action:'parse',page:word,prop:'text',format:'json',origin:'*'});
                const data=await fetchJSON(`https://${code}.wiktionary.org/w/api.php?${params}`);
                const raw=data.parse?.text?.['*'];
                if(!raw)throw new Error('no article');
                const documentHTML=new DOMParser().parseFromString(raw,'text/html');
                documentHTML.querySelectorAll('table,script,style,figure,aside,.inflection-table,.NavFrame').forEach(node=>node.remove());
                for(const li of documentHTML.querySelectorAll('ol > li')){
                    const clue=plainText(li.textContent||'').replace(/\[[^\]]*\]/g,'').trim();
                    if(clue.length>=12&&clue.length<=400&&!looksLikeStylesheet(clue))
                        return {text:clue,pos:null,lang:code,synonyms:[]};
                }
                throw new Error('no definitions');
            }

            /* ---------- Tradução para o português (as dicas são sempre em português) ---------- */
            const POS_PT = {
                noun: 'substantivo', verb: 'verbo', adjective: 'adjetivo', adverb: 'advérbio', pronoun: 'pronome',
                preposition: 'preposição', conjunction: 'conjunção', interjection: 'interjeição', article: 'artigo',
                numeral: 'numeral', determiner: 'determinante', substantivo: 'substantivo', verbo: 'verbo',
                adjetivo: 'adjetivo', 'advérbio': 'advérbio', adverbio: 'advérbio', pronome: 'pronome',
                'preposição': 'preposição', 'conjunção': 'conjunção', 'interjeição': 'interjeição', artigo: 'artigo'
            };
            const translationCache = new Map();
            const translatorStats = { mm: { ok: 0, fail: 0 }, gtx: { ok: 0, fail: 0 } };
            const translatorDead = k => translatorStats[k].ok === 0 && translatorStats[k].fail >= 6;

            async function viaMyMemory(text, from) {
                const data = await fetchJSON(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(from + '|pt-BR')}`);
                const out = data && data.responseData && data.responseData.translatedText;
                if (!out || Number(data.responseStatus) !== 200 || /MYMEMORY WARNING|QUERY LENGTH|INVALID/i.test(out)) throw new Error('mymemory');
                return out;
            }
            async function viaGoogle(text, from) {
                const data = await fetchJSON(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(from)}&tl=pt&dt=t&q=${encodeURIComponent(text)}`);
                const out = (data[0] || []).map(part => part[0]).join('');
                if (!out) throw new Error('gtx');
                return out;
            }
            async function translateToPortuguese(text, from) {
                if (from === 'pt') return text;
                const key = from + '|' + text;
                if (translationCache.has(key)) return translationCache.get(key);
                let out = null;
                for (const [id, run] of [['mm', viaMyMemory], ['gtx', viaGoogle]]) {
                    if (translatorDead(id)) continue;
                    try { out = await run(text, from); translatorStats[id].ok++; if (out) break; }
                    catch (_) { translatorStats[id].fail++; }
                }
                translationCache.set(key, out);
                return out;
            }

            const providerStats = new Map();   // "código:fonte" -> { ok, fail }
            const providerDead = key => { const s = providerStats.get(key); return !!s && s.ok === 0 && s.fail >= 6; };
            const providerNote = (key, ok) => {
                const s = providerStats.get(key) || { ok: 0, fail: 0 };
                if (ok) s.ok++; else s.fail++;
                providerStats.set(key, s);
            };

            // Busca o significado de uma palavra em português (usado como pista). Devolve texto ou null.
            async function fetchDefinition(code, word, lookupWord) {
                const key = code + ':' + word;
                if (defCache.has(key)) return defCache.get(key);
                const keys = WIKI_KEYS[code] || [code];
                const wiki = host => ({ id: host, run: () => fromWiktionary(host, keys, lookupWord) });
                const api = { id: 'api', run: () => fromDictionaryApi(code, lookupWord) };
                // Only English Wiktionary provides the structured /page/definition/ REST
                // endpoint. Other language subdomains return HTTP 501 (Not Implemented).
                // English Wiktionary has entries for other languages, keyed by language code;
                // their English-language explanations are translated to Portuguese below.
                // Use the language-specific Dictionary API first when supported.
                const sources = [api, {id:code+'.wiktionary.org (MediaWiki)',run:()=>fromLocalWiktionary(code,lookupWord)}, wiki('en.wiktionary.org')];
                const tried = new Set();
                let text = null, pos = null;
                for (const source of sources) {
                    if (tried.has(source.id)) continue;
                    tried.add(source.id);
                    const stat = code + ':' + source.id;
                    if (providerDead(stat)) continue;
                    let result = null;
                    try {
                        result = await source.run();
                        providerNote(stat, true);
                    } catch (err) {
                        // 404 / no entry is normal; repeated server/network errors
                        // should temporarily disable a failing source for this session.
                        if (err && (err.name === 'TypeError' || err.name === 'AbortError' || /http 5\d\d/i.test(err.message || ''))) providerNote(stat, false);
                        continue;
                    }
                    if (!result || !result.text) continue;
                    // esconde a palavra (só contém letras) antes de traduzir e de novo depois
                    const maskRe = new RegExp(word, 'giu');
                    let t = result.text.replace(maskRe, '_____').replace(/\s+/g, ' ').trim();
                    if (t.length > 160) t = t.slice(0, 157).trimEnd() + '…';
                    if (result.lang !== 'pt') {
                        t = await translateToPortuguese(t, result.lang);
                        if (!t) continue;   // não conseguiu traduzir: tenta outra fonte
                        t = t.replace(maskRe, '_____').replace(/\s+/g, ' ').trim();
                    }
                    if (t.length < 4 || !hasClueText(t)) continue;
                    let synonyms = usableSynonyms(result.synonyms, word);
                    if (!synonyms.length) synonyms = await fromWiktionarySynonyms(code, lookupWord);
                    if (synonyms.length) {
                        let suffix = ` ${result.lang === 'pt' ? 'Sinônimos' : 'Synonyms'}: ${synonyms.join(', ')}.`;
                        if (result.lang !== 'pt') suffix = await translateToPortuguese(suffix, result.lang) || '';
                        if (suffix) {
                            const maxDefinitionLength = Math.max(40, 160 - suffix.length - 1);
                            if (t.length > maxDefinitionLength) t = t.slice(0, maxDefinitionLength - 1).trimEnd() + '…';
                            t += suffix;
                        }
                    }
                    text = t;
                    pos = result.pos ? (POS_PT[String(result.pos).toLowerCase()] || null) : null;
                    break;
                }
                if (text && pos) text = `(${pos}) ${text}`;
                defCache.set(key, text || null);
                return text || null;
            }

            /* ---------- Interface ---------- */
            const activeEntry = () => active ? active.cell.entries[active.dir] : null;

            function layout() {
                if (!puzzle || !wrapEl.clientWidth) return;
                // Never impose a minimum cell width in fit mode: wide grids were
                // previously clipped on narrow screens by the old 24px minimum.
                const available = Math.max(40, wrapEl.clientWidth - 12);
                const fittedSize = Math.min(44, Math.max(1, Math.floor((available - (puzzle.cols - 1) * 2) / puzzle.cols)));
                const size = Math.max(1, Math.min(48, Math.round(fittedSize * zoomLevel)));
                gridEl.style.setProperty('--cw', size + 'px');
                zoomOutBtn.disabled = zoomLevel <= 1;
                zoomInBtn.disabled = size >= 48;
                fitBtn.disabled = zoomLevel === 1;
                zoomStatusEl.textContent = zoomLevel === 1
                    ? 'Grade inteira visível'
                    : `Zoom ${Math.round(zoomLevel * 100)}% · deslize para ver o restante`;
                // If the player returns to fit mode, reset scroll position.
                if (zoomLevel === 1) wrapEl.scrollLeft = 0;
            }

            function ensureVisible(cell) {
                if (!cell || !cell.el || zoomLevel <= 1) return;
                const outer = wrapEl.getBoundingClientRect();
                const inner = cell.el.getBoundingClientRect();
                if (inner.right > outer.right - 12) wrapEl.scrollLeft += inner.right - outer.right + 20;
                else if (inner.left < outer.left + 12) wrapEl.scrollLeft -= outer.left - inner.left + 20;
            }

            function render() {
                gridEl.innerHTML = '';
                gridEl.style.gridTemplateColumns = `repeat(${puzzle.cols}, var(--cw))`;
                for (let r = 0; r < puzzle.rows; r++) for (let c = 0; c < puzzle.cols; c++) {
                    const cell = puzzle.cells[r][c];
                    if (!cell) { const blank = document.createElement('div'); blank.className = 'cw-blank'; gridEl.appendChild(blank); continue; }
                    const box = document.createElement('div');
                    box.className = 'cw-cell' + (cell.entries.across && cell.entries.down ? ' cross' : '');
                    if (cell.num) { const n = document.createElement('span'); n.className = 'cw-num'; n.textContent = cell.num; box.appendChild(n); }
                    const input = document.createElement('input');
                    input.type = 'text'; input.maxLength = 2; input.autocomplete = 'off';
                    input.setAttribute('autocapitalize', 'characters'); input.setAttribute('autocorrect', 'off');
                    input.spellcheck = false;
                    input.setAttribute('aria-label', `Linha ${r + 1}, coluna ${c + 1}`);
                    box.appendChild(input);
                    gridEl.appendChild(box);
                    cell.el = box; cell.input = input;
                    wireCell(cell);
                }
                buildClues();
                layout();
            }

            function buildClues() {
                acrossEl.innerHTML = ''; downEl.innerHTML = '';
                for (const e of puzzle.entries) {
                    const li = document.createElement('li');
                    li.className = 'cw-clue';
                    const row = document.createElement('div');
                    row.className = 'flex items-start gap-2';
                    const main = document.createElement('button');
                    main.type = 'button'; main.className = 'flex-1 text-left cw-clue-text';
                    main.innerHTML = '<span class="font-bold text-rose-300"></span> <span></span>';
                    main.children[0].textContent = e.num + '.';
                    main.children[1].textContent = e.def;
                    main.addEventListener('click', () => selectEntry(e));
                    const hint = document.createElement('button');
                    hint.type = 'button'; hint.className = 'cw-clue-hint';
                    hint.setAttribute('aria-label', `Revelar uma letra da palavra ${e.num}`);
                    hint.title = 'Revelar uma letra';
                    hint.innerHTML = '<i class="fa-regular fa-lightbulb"></i>';
                    hint.addEventListener('click', () => { selectEntry(e, false); giveHint(e); });
                    row.append(main, hint);
                    li.append(row);
                    e.li = li;
                    (e.dir === 'across' ? acrossEl : downEl).appendChild(li);
                }
            }

            function paint() {
                if (!puzzle) return;
                const entry = activeEntry();
                const inWord = new Set(entry ? entry.cells : []);
                for (const row of puzzle.cells) for (const cell of row) {
                    if (!cell) continue;
                    cell.el.classList.toggle('active', !!active && cell === active.cell);
                    cell.el.classList.toggle('in-word', inWord.has(cell));
                    cell.el.classList.toggle('locked', cell.locked);
                    cell.el.classList.toggle('wrong', cell.wrong);
                }
                for (const e of puzzle.entries) {
                    e.li.classList.toggle('current', e === entry);
                    e.li.classList.toggle('solved', e.solved);
                }
                currentEl.innerHTML = '';
                if (entry) {
                    const title = document.createElement('div');
                    title.className = 'text-sm text-white font-semibold';
                    title.textContent = `${entry.num} ${entry.dir === 'across' ? '→ Horizontal' : '↓ Vertical'}${entry.solved ? ' ✓' : ''}`;
                    const sub = document.createElement('div');
                    sub.className = 'text-sm text-rose-100 mt-1';
                    sub.textContent = entry.def;
                    currentEl.append(title, sub);
                }
                const solved = puzzle.entries.filter(e => e.solved).length;
                statsEl.textContent = `Palavras resolvidas: ${solved}/${puzzle.entries.length} • Dicas usadas: ${hintsUsed}`;
            }

            function setCell(cell, value, lock = false) {
                cell.value = value; cell.input.value = value; cell.wrong = false;
                if (lock) { cell.locked = true; cell.input.readOnly = true; }
            }

            function focusCell(cell, dir) {
                if (!cell.entries[dir]) dir = cell.entries.across ? 'across' : 'down';
                active = { cell, dir };
                paint();
                cell.input.focus({ preventScroll: true });
                ensureVisible(cell);
            }

            function selectEntry(entry, focus = true) {
                const target = entry.cells.find(c => !c.locked && !c.value) || entry.cells.find(c => !c.locked) || entry.cells[0];
                active = { cell: target, dir: entry.dir };
                paint();
                if (focus) { target.input.focus({ preventScroll: true }); ensureVisible(target); }
            }

            function advance(cell, dir, step) {
                const entry = cell.entries[dir];
                if (!entry) return;
                let i = entry.cells.indexOf(cell) + step;
                while (i >= 0 && i < entry.cells.length && entry.cells[i].locked) i += step;
                if (i >= 0 && i < entry.cells.length) focusCell(entry.cells[i], dir);
            }

            function moveBy(cell, dr, dc) {
                const dirName = dr ? 'down' : 'across';
                let r = cell.r + dr, c = cell.c + dc;
                while (r >= 0 && c >= 0 && r < puzzle.rows && c < puzzle.cols) {
                    const next = puzzle.cells[r][c];
                    if (next) { focusCell(next, next.entries[dirName] ? dirName : active.dir); return; }
                    r += dr; c += dc;
                }
            }

            function stepEntry(delta) {
                const list = puzzle.entries;
                const i = list.indexOf(activeEntry());
                selectEntry(list[(i + delta + list.length) % list.length]);
            }

            function wireCell(cell) {
                const input = cell.input;
                let wasActive = false;
                input.addEventListener('pointerdown', () => { wasActive = !!active && active.cell === cell; });
                input.addEventListener('click', () => {
                    if (wasActive && cell.entries.across && cell.entries.down) focusCell(cell, active.dir === 'across' ? 'down' : 'across');
                    wasActive = false;
                });
                input.addEventListener('focus', () => {
                    const dir = active && cell.entries[active.dir] ? active.dir : (cell.entries.across ? 'across' : 'down');
                    if (!active || active.cell !== cell || active.dir !== dir) { active = { cell, dir }; paint(); }
                    input.select();
                });
                input.addEventListener('input', () => {
                    if (cell.locked || finished) { input.value = cell.value; return; }
                    const letters = Array.from(input.value).filter(ch => /\p{L}/u.test(ch));
                    const ch = letters.length ? showLetter(letters[letters.length - 1]) : '';
                    setCell(cell, ch);
                    if (ch) advance(cell, active.dir, 1);
                    checkSolved();
                    paint();
                });
                input.addEventListener('keydown', e => {
                    if (e.ctrlKey || e.metaKey || e.altKey) return;
                    const dir = active ? active.dir : 'across';
                    switch (e.key) {
                        case 'Backspace':
                            e.preventDefault();
                            if (!cell.locked && cell.value) { setCell(cell, ''); paint(); }
                            else {
                                const entry = cell.entries[dir], i = entry.cells.indexOf(cell) - 1;
                                let j = i; while (j >= 0 && entry.cells[j].locked) j--;
                                if (j >= 0) { const prev = entry.cells[j]; setCell(prev, ''); focusCell(prev, dir); }
                            }
                            break;
                        case 'Delete': e.preventDefault(); if (!cell.locked) { setCell(cell, ''); paint(); } break;
                        case 'ArrowLeft': e.preventDefault(); moveBy(cell, 0, -1); break;
                        case 'ArrowRight': e.preventDefault(); moveBy(cell, 0, 1); break;
                        case 'ArrowUp': e.preventDefault(); moveBy(cell, -1, 0); break;
                        case 'ArrowDown': e.preventDefault(); moveBy(cell, 1, 0); break;
                        case 'Tab': e.preventDefault(); stepEntry(e.shiftKey ? -1 : 1); break;
                        case 'Enter':
                        case ' ':
                            e.preventDefault();
                            if (cell.entries.across && cell.entries.down) focusCell(cell, dir === 'across' ? 'down' : 'across');
                            break;
                    }
                });
            }

            function checkSolved() {
                for (const e of puzzle.entries) {
                    if (e.solved) continue;
                    if (e.cells.every(c => c.value && base(c.value) === base(c.ch))) {
                        e.solved = true;
                        e.cells.forEach(c => setCell(c, showLetter(c.ch), true));
                    }
                }
                if (!finished && puzzle.entries.every(e => e.solved)) {
                    finished = true;
                    setStatus(`Parabéns! Vocês completaram as palavras cruzadas${hintsUsed ? ` com ${hintsUsed} ${hintsUsed === 1 ? 'dica' : 'dicas'}` : ' sem nenhuma dica'}! 💖`);
                }
            }

            function revealLetter(entry) {
                const open = entry.cells.filter(c => !c.locked && base(c.value || '') !== base(c.ch));
                if (!open.length) return false;
                const cell = pick(open);
                setCell(cell, showLetter(cell.ch), true);
                return true;
            }

            function giveHint(entry) {
                if (!puzzle || finished) return;
                entry = entry || activeEntry() || puzzle.entries.find(e => !e.solved);
                if (!entry) return;
                if (entry.solved) { setStatus('Essa palavra já está resolvida.'); return; }
                if (!revealLetter(entry)) { setStatus('Todas as letras desta palavra já estão certas.'); return; }
                hintsUsed++;
                setStatus(`Uma letra da palavra ${entry.num} foi revelada.`);
                checkSolved();
                paint();
            }

            function verify() {
                if (!puzzle) return;
                let wrong = 0;
                for (const row of puzzle.cells) for (const cell of row) {
                    if (cell && cell.value && !cell.locked && base(cell.value) !== base(cell.ch)) { cell.wrong = true; wrong++; }
                }
                setStatus(wrong ? `${wrong} ${wrong === 1 ? 'letra incorreta marcada' : 'letras incorretas marcadas'} em vermelho.` : 'Tudo certo até aqui! 💕');
                paint();
            }

            function revealWord() {
                const entry = activeEntry();
                if (!entry || finished) return;
                entry.cells.forEach(c => setCell(c, showLetter(c.ch), true));
                setStatus(`A palavra ${entry.num} foi revelada: ${entry.word.toLocaleUpperCase(loc())}.`);
                checkSolved();
                paint();
            }

            async function mapLimit(items, limit, fn) {
                let next = 0;
                const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
                    while (next < items.length) { const i = next++; await fn(items[i]); }
                });
                await Promise.all(workers);
            }

            // Sorteia palavras e mantém só as que têm significado online (a pista do jogo).
            async function collectWordsWithMeanings(words, lens, count, id) {
                const code = langSel.value;
                const defs = new Map();
                const tried = new Set();
                const target = Math.max(count * 2 + 2, 8);
                for (let round = 0; round < 5 && defs.size < target; round++) {
                    const batch = [];
                    const size = Math.max(10, (target - defs.size) * (round + 2));
                    let guard = 0;
                    while (batch.length < size && guard++ < size * 30) {
                        const bucket = words.buckets[pick(lens)];
                        const w = pick(bucket);
                        if (!tried.has(w)) { tried.add(w); batch.push(w); }
                    }
                    if (!batch.length) break;
                    let done = 0;
                    await mapLimit(batch, 8, async w => {
                        const lookup = words.caps.has(w) ? w[0].toLocaleUpperCase(loc()) + w.slice(1) : w;
                        let def = null;
                        try { def = await fetchDefinition(code, w, lookup); } catch (_) { /* ignora */ }
                        if (id !== gameId) return;
                        done++;
                        if (def) defs.set(w, def);
                        setStatus(`Buscando significados em português… (${defs.size} palavras com significado)`);
                    });
                    if (id !== gameId) return null;
                }
                return defs;
            }

            async function newGame() {
                const id = ++gameId;
                finished = false; hintsUsed = 0; active = null; puzzle = null;
                zoomLevel = 1; wrapEl.scrollLeft = 0;
                const code = langSel.value;
                const [minL, maxL] = sizeSel.value.split('-').map(Number);
                const count = Number(countSel.value);
                gridEl.innerHTML = ''; acrossEl.innerHTML = ''; downEl.innerHTML = '';
                currentEl.innerHTML = ''; statsEl.textContent = '';
                setStatus(`Carregando palavras de ${LANGS[code].label}…`);
                let words;
                try { words = await loadSimpleWords(code); }
                catch (_) {
                    if (id === gameId) setStatus('Não foi possível carregar as palavras. Verifique a conexão e toque em “Nova partida”.');
                    return;
                }
                if (id !== gameId) return;
                updateCrosswordSources();
                const lens = [];
                for (let l = minL; l <= maxL; l++) if (words.buckets[l] && words.buckets[l].length) lens.push(l);
                if (!lens.length) {
                    setStatus(`Não há palavras em ${LANGS[code].label} com esse tamanho. Tente outro tamanho.`);
                    return;
                }
                const defs = await collectWordsWithMeanings(words, lens, count, id);
                if (id !== gameId || !defs) return;
                if (defs.size < 2) {
                    setStatus('Não consegui buscar significados online agora. Verifique a conexão e toque em “Nova partida”.');
                    return;
                }
                setStatus('Montando as palavras cruzadas…');
                await new Promise(r => setTimeout(r, 30));
                if (id !== gameId) return;
                const buckets = {};
                for (const w of defs.keys()) { const n = Array.from(w).length; (buckets[n] || (buckets[n] = [])).push(w); }
                const built = buildPuzzle({ buckets, caps: words.caps, defs }, minL, maxL, count);
                if (!built || built.entries.length < 2) {
                    setStatus(`Não consegui montar uma grade em ${LANGS[code].label} com esse tamanho. Tente outro tamanho de palavra.`);
                    return;
                }
                puzzle = built;
                render();
                selectEntry(puzzle.entries[0], false);
                const got = puzzle.entries.length;
                setStatus((got < count
                    ? `${LANGS[code].label}: consegui encaixar ${got} de ${count} palavras.`
                    : `${LANGS[code].label}: ${got} palavras.`) + (words.simple ? '' : ' (lista completa do dicionário: algumas palavras podem ser raras)') + ' Leia as pistas e toque numa casa para começar!');
            }

            fitBtn.addEventListener('click', () => { zoomLevel = 1; layout(); });
            zoomInBtn.addEventListener('click', () => { zoomLevel = Math.min(8, zoomLevel * 1.3); layout(); });
            zoomOutBtn.addEventListener('click', () => { zoomLevel = Math.max(1, zoomLevel / 1.3); layout(); });
            $('cw-hint').addEventListener('click', () => giveHint());
            $('cw-check').addEventListener('click', verify);
            $('cw-reveal').addEventListener('click', revealWord);
            $('cw-new').addEventListener('click', newGame);
            [langSel, countSel, sizeSel].forEach(el => el.addEventListener('change', newGame));
            if ('ResizeObserver' in window) new ResizeObserver(layout).observe(wrapEl);
            else window.addEventListener('resize', layout);

            newGame();
        })();

