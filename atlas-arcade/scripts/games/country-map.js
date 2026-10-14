
/* COUNTRY MAP QUIZ: country names and multilingual aliases shared with the flag game. */
(() => {
    const shared = window.countryQuizShared;
    const section = document.getElementById('map-game-section');
    if (!shared || !section) return;
    const byId = id => document.getElementById(id);
    const allCountries = shared.countries;
    const normalize = shared.normalize;
    const regionsBox = byId('map-regions');
    const durationSelect = byId('map-duration');
    const mapSvg = byId('map-svg');
    // Wrap Samoa and Tonga across the date line in the Pacific-centered Oceania view.
    for (const code of ['ws', 'to']) {
        const original = mapSvg.querySelector(`[data-code="${code}"]`);
        if (original) {
            const duplicate = original.cloneNode(true);
            duplicate.setAttribute('transform', 'translate(1080 0)');
            mapSvg.appendChild(duplicate);
        }
    }
    const paths = [...mapSvg.querySelectorAll('[data-code]')];
    const pathByCode = new Map(paths.map(path => [path.dataset.code, path]));
    const answer = byId('map-answer');
    const submit = byId('map-submit');
    const startButton = byId('map-start');
    const finishButton = byId('map-finish');
    const foundText = byId('map-found');
    const totalText = byId('map-total');
    const timeText = byId('map-time');
    const timeBar = byId('map-timer-bar');
    const timeFill = byId('map-timer-fill');
    const status = byId('map-status');
    const selectedLabel = byId('map-selected-label');
    const results = byId('map-results');
    const summary = byId('map-summary');
    const missedText = byId('map-missed');
    const namedText = byId('map-named-list');
    const guessedCounter = byId('map-guessed-counter');

    // Bounding boxes in the SVG's built-in equirectangular coordinates.
    // One or more regions can be selected, as in the flag game.
    const bounds = {
        europe: [-26, 30, 60, 73],
        'north-america': [-170, 6, -50, 75],
        'central-america': [-93, 7, -76, 19],
        'south-america': [-84, -57, -33, 14],
        caribbean: [-88, 8, -56, 28],
        africa: [-20, -37, 54, 39],
        asia: [25, -13, 180, 82],
        oceania: [-180, -49, 180, 23]
    };
    let selectedRegions = new Set(); // Empty = all regions.
    let eligible = new Map();
    let guessed = new Set();
    let selectedCountry = null;
    let running = false;
    let timerId = null;
    let deadline = 0;
    let duration = 300;

    function setStatus(text, kind = '') {
        status.textContent = text;
        status.className = 'text-sm min-h-5 ' + (kind === 'success' ? 'text-emerald-300' : kind === 'error' ? 'text-rose-300' : 'text-rose-200');
    }
    function syncButtons() {
        regionsBox.querySelectorAll('[data-region]').forEach(button => {
            const region = button.dataset.region;
            button.setAttribute('aria-pressed', String(region === 'all' ? !selectedRegions.size : selectedRegions.has(region)));
        });
    }
    function getEligible() {
        return allCountries.filter(country => !selectedRegions.size || [...selectedRegions].some(region => country.regions.has(region)));
    }
    function regionView() {
        if (selectedRegions.size === 1 && selectedRegions.has('oceania')) {
            // Pacific-centered view, including eastern islands beyond the date line.
            mapSvg.setAttribute('viewBox', '800 196 380 225');
            return;
        }
        if (!selectedRegions.size) { mapSvg.setAttribute('viewBox', '0 0 1080 540'); return; }
        const boxes = [...selectedRegions].map(region => bounds[region]).filter(Boolean);
        if (!boxes.length) { mapSvg.setAttribute('viewBox', '0 0 1080 540'); return; }
        let minLon = Math.min(...boxes.map(b => b[0]));
        let minLat = Math.min(...boxes.map(b => b[1]));
        let maxLon = Math.max(...boxes.map(b => b[2]));
        let maxLat = Math.max(...boxes.map(b => b[3]));
        const left = Math.max(0, (minLon + 180) * 3 - 9);
        const right = Math.min(1080, (maxLon + 180) * 3 + 9);
        const top = Math.max(0, (90 - maxLat) * 3 - 9);
        const bottom = Math.min(540, (90 - minLat) * 3 + 9);
        const width = right - left, height = bottom - top;
        // Expand the smaller axis to fit the panel's 1.7:1 viewport without distortion.
        const ideal = 1.7;
        let x = left, y = top, w = width, h = height;
        if (w / h < ideal) { w = h * ideal; x = Math.max(0,Math.min(1080 - w, left + (width - w)/2)); }
        else { h = w / ideal; y = Math.max(0,Math.min(540 - h, top + (height - h)/2)); }
        mapSvg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${Math.min(1080,w).toFixed(1)} ${Math.min(540,h).toFixed(1)}`);
    }
    function paintMap() {
        paths.forEach(path => {
            const code = path.dataset.code;
            const enabled = eligible.has(code);
            const isGuessed = guessed.has(code);
            path.classList.toggle('map-eligible', enabled);
            path.classList.toggle('map-ineligible', !enabled);
            path.classList.toggle('map-guessed', isGuessed);
            path.classList.toggle('map-selected', code === selectedCountry && running);
            path.setAttribute('aria-disabled', String(!enabled || !running));
            path.setAttribute('aria-label', isGuessed ? `${eligible.get(code).name}, país identificado` : 'Selecionar país não identificado');
        });
    }
    function refreshProgress() {
        foundText.textContent = guessed.size;
        totalText.textContent = eligible.size;
        guessedCounter.textContent = guessed.size;
        const names = [...guessed].map(code => eligible.get(code).name).sort((a,b) => a.localeCompare(b,'pt'));
        namedText.textContent = names.length ? names.join(' · ') : 'Nenhum por enquanto.';
    }
    function updateSelected() {
        selectedLabel.textContent = selectedCountry && running
            ? 'País selecionado em amarelo. Digite o nome desse país e pressione Enter. Clique novamente para desmarcar.'
            : running ? 'Digite qualquer país desta região, ou clique nele primeiro para responder especificamente.'
                      : 'Clique em “Começar” para ativar as respostas. Você pode escolher vários países em qualquer ordem.';
    }
    function stopClock() { if (timerId !== null) { clearInterval(timerId); timerId = null; } }
    function showClock(ms) {
        const remaining = Math.ceil(Math.max(0, ms) / 1000);
        timeText.textContent = `${String(Math.floor(remaining / 60)).padStart(2,'0')}:${String(remaining % 60).padStart(2,'0')}`;
        const percent = Math.max(0, Math.min(100, ms / (duration * 1000) * 100));
        timeFill.style.width = percent + '%';
        timeBar.setAttribute('aria-valuenow', String(Math.round(percent)));
        timeText.classList.toggle('flag-timer-urgent', running && remaining <= 20);
    }
    function tick() {
        const ms = Math.max(0, deadline - Date.now());
        showClock(ms);
        if (running && ms <= 0) finish('timeout');
    }
    function prepare() {
        stopClock();
        running = false;
        selectedCountry = null;
        guessed.clear();
        eligible = new Map(getEligible().map(country => [country.code,country]));
        duration = Number(durationSelect.value) || 300;
        showClock(duration * 1000);
        answer.value = '';
        answer.disabled = true;
        submit.disabled = true;
        finishButton.disabled = true;
        startButton.innerHTML = '<i class="fa-solid fa-play mr-1"></i>Começar';
        results.classList.add('hidden');
        summary.textContent = '';
        missedText.textContent = '';
        syncButtons();
        regionView();
        paintMap();
        refreshProgress();
        updateSelected();
        setStatus(`Pronto para começar: ${eligible.size} países e ${Math.floor(duration / 60)} minutos.`);
    }
    function begin() {
        prepare();
        running = true;
        answer.disabled = false;
        submit.disabled = false;
        finishButton.disabled = false;
        startButton.innerHTML = '<i class="fa-solid fa-rotate-right mr-1"></i>Recomeçar';
        deadline = Date.now() + duration * 1000;
        tick();
        timerId = setInterval(tick, 200);
        updateSelected();
        paintMap();
        setStatus('Rodada iniciada! Identifique o máximo de países possível antes do tempo acabar.');
        answer.focus({ preventScroll:true });
    }
    function finish(reason) {
        if (!running) return;
        running = false;
        stopClock();
        if (reason === 'timeout') showClock(0);
        else showClock(Math.max(0, deadline - Date.now()));
        selectedCountry = null;
        answer.disabled = true;
        submit.disabled = true;
        finishButton.disabled = true;
        startButton.innerHTML = '<i class="fa-solid fa-rotate-right mr-1"></i>Jogar novamente';
        const missed = [...eligible.values()].filter(country => !guessed.has(country.code));
        summary.textContent = `${guessed.size} de ${eligible.size} países identificados (${Math.round(100 * guessed.size / eligible.size)}%).`;
        missedText.textContent = missed.length ? 'Não identificados: ' + missed.map(country=>country.name).sort((a,b)=>a.localeCompare(b,'pt')).join(' · ') : 'Todos os países foram identificados!';
        results.classList.remove('hidden');
        paintMap();
        updateSelected();
        setStatus(reason === 'timeout' ? 'Tempo esgotado! Confira os países que faltaram.' : reason === 'complete' ? 'Parabéns! Todos os países foram identificados.' : 'Rodada finalizada. Confira as respostas.');
    }
    function attempt(raw) {
        if (!running) return;
        if (Date.now() >= deadline) { finish('timeout'); return; }
        const value = normalize(raw);
        if (!value) { setStatus('Digite o nome de um país.', 'error'); return; }
        const matches = [...eligible.values()].filter(country => country.accepted.has(value));
        if (!matches.length) { setStatus('Resposta não encontrada nesta região. Tente novamente.', 'error'); return; }
        let country = selectedCountry ? matches.find(c => c.code === selectedCountry) : matches.find(c => !guessed.has(c.code));
        if (!country) {
            if (!selectedCountry && matches.every(c => guessed.has(c.code))) setStatus('Esse país já foi identificado.', 'error');
            else setStatus('A resposta não corresponde ao país selecionado. Tente novamente ou desmarque-o no mapa.', 'error');
            return;
        }
        if (guessed.has(country.code)) { setStatus('Esse país já foi identificado.', 'error'); return; }
        guessed.add(country.code);
        selectedCountry = null;
        answer.value = '';
        refreshProgress();
        paintMap();
        updateSelected();
        if (guessed.size === eligible.size) { finish('complete'); return; }
        setStatus(`Correto: ${country.name}! ${guessed.size} de ${eligible.size} países encontrados.`, 'success');
    }
    regionsBox.addEventListener('click', event => {
        const button = event.target.closest('[data-region]');
        if (!button || !regionsBox.contains(button)) return;
        const region = button.dataset.region;
        if (region === 'all') selectedRegions.clear();
        else if (selectedRegions.has(region)) selectedRegions.delete(region);
        else selectedRegions.add(region);
        prepare();
    });
    durationSelect.addEventListener('change', prepare);
    byId('map-guess-form').addEventListener('submit', event => { event.preventDefault(); attempt(answer.value); });
    startButton.addEventListener('click', begin);
    finishButton.addEventListener('click', () => finish('manual'));
    function selectLocation(target) {
        if (!running) return;
        const shape = target.closest('[data-code]');
        if (!shape || !mapSvg.contains(shape)) return;
        const code = shape.dataset.code;
        if (!eligible.has(code)) return;
        if (guessed.has(code)) { setStatus(`${eligible.get(code).name} já foi identificado.`); return; }
        selectedCountry = selectedCountry === code ? null : code;
        paintMap();
        updateSelected();
        answer.focus({ preventScroll:true });
    }
    mapSvg.addEventListener('click', event => selectLocation(event.target));
    mapSvg.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const shape = event.target.closest('[data-code]');
        if (!shape) return;
        event.preventDefault();
        selectLocation(shape);
    });
    prepare();
})();
