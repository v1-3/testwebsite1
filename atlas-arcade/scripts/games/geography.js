
(() => {
    const countries = window.AtlasCountryData;

    // Add clue variation to every location without revealing more than three hints in a round.
    const landlockedCountries = new Set([
        'Afeganistão','Andorra','Armênia','Áustria','Azerbaijão','Bielorrússia','Butão','Bolívia','Botsuana',
        'Burkina Faso','Burundi','Cazaquistão','Chade','Chéquia','Czechia','Eswatini','Etiópia','Hungria',
        'Kosovo','Laos','Lesoto','Liechtenstein','Luxemburgo','Malawi','Mali','Moldávia','Mongólia','Nepal',
        'Níger','Macedônia do Norte','Paraguai','Quirguistão','República Centro-Africana','Ruanda','San Marino',
        'Sérvia','Eslováquia','Sudão do Sul','Suíça','Tajiquistão','Turcomenistão','Uganda','Uzbequistão',
        'Vaticano','Zâmbia','Zimbábue'
    ]);
    const islandCountries = new Set([
        'Antígua e Barbuda','Bahamas','Bahrein','Barbados','Cabo Verde','Comores','Cuba','Chipre','Dominica',
        'República Dominicana','Fiji','Granada','Haiti','Indonésia','Irlanda','Islândia','Itália','Jamaica','Japão',
        'Kiribati','Madagascar','Maldivas','Malta','Maurício','Micronésia','Nauru','Nova Zelândia','Palau',
        'Papua-Nova Guiné','Filipinas','Samoa','São Cristóvão e Névis','Santa Lúcia','São Tomé e Príncipe',
        'São Vicente e Granadinas','Seicheles','Singapura','Sri Lanka','Ilhas Salomão','Taiwan','Timor-Leste',
        'Tonga','Trinidad e Tobago','Tuvalu','Vanuatu','Reino Unido','Austrália','Coreia do Sul','Brunei',
        'Guam','Porto Rico','Groenlândia','Ilhas Faroé','Curaçao','Aruba','Ilhas Cook','Niue','Bermudas',
        'Ilhas Malvinas','Martinica','Guadalupe','Polinésia Francesa','Ilhas Cayman','Bonaire','Madeira','Açores'
    ]);
    function parseAreaKm2(country) {
        const areaHint = (country.hints || []).find(h => /área/i.test(h[0]));
        if (!areaHint) return null;
        const text = areaHint[1].toLowerCase();
        const num = text.match(/(\d[\d.,\s]*\d|\d+(?:[.,]\d+)?)/);
        if (!num) return null;
        let raw = num[1].replace(/\s/g, '');
        const hasMillion = /milh(?:ão|ões|ao|oes)/i.test(text);
        let value;
        if (raw.includes('.') && raw.includes(',')) value = Number(raw.replace(/\./g, '').replace(',', '.'));
        else if ((raw.match(/\./g) || []).length > 1 || /\.\d{3}$/.test(raw)) value = Number(raw.replace(/\./g, '').replace(',', '.'));
        else if (raw.includes(',') && /,\d{3}$/.test(raw)) value = Number(raw.replace(/,/g, ''));
        else value = Number(raw.replace(',', '.'));
        if (!Number.isFinite(value)) return null;
        if (hasMillion) value *= 1000000;
        else if (/mil km|mil quilômetros|mil quil[oô]metros/i.test(text) && value < 100000) value *= 1000;
        return value;
    }
    const knownNames = countries.flatMap(c => [c.name, ...(c.aliases || [])])
        .map(name => ({ name, normalized: normalize(name) }))
        .filter(x => x.normalized.length > 2)
        .sort((a,b) => b.normalized.length - a.normalized.length);
    function supplementalHints(country) {
        const extras = [];
        const locationHint = (country.hints || []).find(h => /^(geografia|localização)$/i.test(h[0]));
        const locationText = locationHint ? locationHint[1].toLowerCase() : '';
        if (landlockedCountries.has(country.name) || /sem litoral|não possui litoral|nao possui litoral|país sem saída ao mar|pais sem saida ao mar/.test(locationText)) {
            extras.push(['Perfil territorial', 'Não possui litoral oceânico; o acesso ao mar depende de países vizinhos.']);
        } else if (islandCountries.has(country.name) || /arquipélago|arquipelago|país insular|pais insular|ilha no|é uma ilha|e uma ilha/.test(locationText)) {
            extras.push(['Perfil territorial', 'É uma localização insular ou arquipelágica, com o mar desempenhando papel importante na sua geografia.']);
        } else {
            extras.push(['Perfil territorial', 'Possui território continental com acesso marítimo, embora também possa incluir ilhas.']);
        }
        const borderHint = (country.hints || []).find(h => /fronteira|vizinhança|vizinhos/i.test(h[0]));
        if (borderHint) {
            const borderText = ' ' + normalize(borderHint[1]) + ' ';
            const selfNames = new Set([country.name, ...(country.aliases || [])].map(normalize));
            const neighbor = knownNames.find(candidate => !selfNames.has(candidate.normalized) && borderText.includes(' ' + candidate.normalized + ' '));
            if (neighbor) extras.push(['Pista de vizinhança', `Uma das localizações mencionadas entre seus vizinhos é ${neighbor.name}.`]);
        }
        const area = parseAreaKm2(country);
        if (area != null && area > 0) {
            let scale;
            if (area >= 2000000) scale = 'muito extenso';
            else if (area >= 500000) scale = 'extenso';
            else if (area >= 100000) scale = 'de extensão intermediária';
            else if (area >= 30000) scale = 'relativamente compacto';
            else scale = 'de pequena extensão territorial';
            extras.push(['Escala territorial', `Em comparação com outros países e territórios, seu tamanho é ${scale}.`]);
        }
        return extras;
    }
    countries.forEach(country => {
        const existing = new Set(country.hints.map(h => normalize(h[0] + ' ' + h[1])));
        for (const hint of supplementalHints(country)) {
            const key = normalize(hint[0] + ' ' + hint[1]);
            if (!existing.has(key)) { country.hints.push(hint); existing.add(key); }
        }
    });

    const $ = (id) => document.getElementById(id);
    const hintsBox = $('geo-hints');
    const answerInput = $('geo-answer');
    const guessForm = $('geo-guess-form');
    const submitButton = $('geo-submit');
    const nextHintButton = $('geo-next-hint');
    const revealButton = $('geo-reveal-answer');
    const newRoundButton = $('geo-new-round');
    const status = $('geo-status');
    const result = $('geo-last-result');
    const scoreText = $('geo-score');
    const winsText = $('geo-wins');
    const streakText = $('geo-streak');
    const hintCount = $('geo-hint-count');
    const hintProgress = $('geo-hint-progress');

    let current = null;
    let previousId = -1;
    let shownHints = 1;
    let activeHints = [];
    let attempts = 0;
    let roundActive = true;
    let score = 0;
    let wins = 0;
    let streak = 0;

    function normalize(value) {
        return String(value || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().replace(/&/g, ' e ').replace(/[^a-z0-9]+/g, ' ')
            .trim().replace(/\s+/g, ' ');
    }

    function setStatus(message, kind = 'normal') {
        status.textContent = message;
        status.className = 'text-sm min-h-5 ' + (kind === 'good' ? 'text-emerald-300' : kind === 'bad' ? 'text-rose-300' : 'text-rose-200');
    }

    function acceptedAnswer(country, guess) {
        const normalizedGuess = normalize(guess);
        if (!normalizedGuess) return false;
        return [country.name, ...country.aliases].some(alias => normalize(alias) === normalizedGuess);
    }

    function renderHints() {
        hintsBox.innerHTML = '';
        activeHints.slice(0, shownHints).forEach((hint, index) => {
            const card = document.createElement('div');
            card.className = 'geo-hint-card';
            const number = document.createElement('span');
            number.className = 'geo-hint-number';
            number.textContent = String(index + 1).padStart(2, '0');
            const content = document.createElement('div');
            content.className = 'min-w-0';
            const category = document.createElement('span');
            category.className = 'geo-hint-category';
            category.textContent = hint[0];
            const clue = document.createElement('p');
            clue.className = 'geo-hint-text';
            clue.textContent = hint[1];
            content.append(category, clue);
            card.append(number, content);
            hintsBox.appendChild(card);
        });
        hintCount.textContent = `${shownHints} de ${activeHints.length}`;
        hintProgress.style.width = `${(shownHints / activeHints.length) * 100}%`;
        nextHintButton.disabled = !roundActive || shownHints >= activeHints.length;
        nextHintButton.innerHTML = shownHints >= activeHints.length
            ? '<i class="fa-solid fa-check mr-1"></i>Todas as pistas reveladas'
            : '<i class="fa-regular fa-lightbulb mr-1"></i>Mostrar próxima pista';
    }

    function startRound() {
        let nextIndex = Math.floor(Math.random() * countries.length);
        if (countries.length > 1) {
            while (nextIndex === previousId) nextIndex = Math.floor(Math.random() * countries.length);
        }
        previousId = nextIndex;
        current = countries[nextIndex];
        // Shuffle the full pool and keep only three distinct hints for this round.
        activeHints = [...current.hints];
        for (let i = activeHints.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [activeHints[i], activeHints[j]] = [activeHints[j], activeHints[i]];
        }
        activeHints = activeHints.slice(0, 3);
        shownHints = 1;
        attempts = 0;
        roundActive = true;
        answerInput.value = '';
        answerInput.disabled = false;
        submitButton.disabled = false;
        answerInput.placeholder = 'Qual é o país ou território?';
        revealButton.disabled = false;
        result.classList.add('hidden');
        setStatus('Leia a primeira das três pistas sorteadas. Cada nova pista ajuda, mas reduz a pontuação possível.');
        renderHints();
        answerInput.focus({ preventScroll: true });
    }

    function finishRound(wasCorrect, revealed = false) {
        roundActive = false;
        answerInput.disabled = true;
        submitButton.disabled = true;
        nextHintButton.disabled = true;
        revealButton.disabled = true;
        renderHints();
        result.classList.remove('hidden');
        result.textContent = `Resposta: ${current.name}.`;
        if (wasCorrect) {
            const earned = Math.max(10, 100 - ((shownHints - 1) * 15) - (Math.max(0, attempts - 1) * 5));
            score += earned;
            wins += 1;
            streak += 1;
            scoreText.textContent = score;
            winsText.textContent = wins;
            streakText.textContent = streak;
            setStatus(`Correto! Você ganhou ${earned} pontos usando ${shownHints} ${shownHints === 1 ? 'pista' : 'pistas'}.`, 'good');
        } else {
            streak = 0;
            streakText.textContent = streak;
            setStatus(revealed ? `Resposta revelada: ${current.name}.` : `A rodada terminou. A resposta era ${current.name}.`, 'normal');
        }
    }

    guessForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!roundActive) return;
        const guess = answerInput.value.trim();
        if (!guess) {
            setStatus('Digite um país ou território antes de responder.', 'bad');
            answerInput.focus();
            return;
        }
        attempts += 1;
        if (acceptedAnswer(current, guess)) {
            finishRound(true);
        } else {
            setStatus('Ainda não. Tente outra resposta ou revele mais uma pista.', 'bad');
            answerInput.select();
        }
    });

    nextHintButton.addEventListener('click', () => {
        if (!roundActive || shownHints >= activeHints.length) return;
        shownHints += 1;
        renderHints();
        setStatus(shownHints >= activeHints.length ? 'Você já viu as três pistas sorteadas. Envie seu palpite.' : 'Nova pista revelada. Qual é o seu palpite?');
    });

    revealButton.addEventListener('click', () => {
        if (roundActive) finishRound(false, true);
    });

    newRoundButton.addEventListener('click', startRound);
    startRound();
})();
