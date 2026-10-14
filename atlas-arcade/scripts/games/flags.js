
/* FLAG GUESSING GAME SCRIPT */
(() => {
    const rawFlagCountries = `al|Albânia|Albania\nad|Andorra|\nat|Áustria|Austria\nby|Belarus|Bielorrússia;Belarus;Bielorússia\nbe|Bélgica|Belgium\nba|Bósnia e Herzegovina|Bosnia and Herzegovina;Bosnia;Herzegovina\nbg|Bulgária|Bulgaria\nhr|Croácia|Croatia\ncy|Chipre|Cyprus\ncz|Chéquia|Czechia;Czech Republic;República Tcheca;Republica Checa\ndk|Dinamarca|Denmark\nee|Estônia|Estonia\nfi|Finlândia|Finland\nfr|França|France\nde|Alemanha|Germany\ngr|Grécia|Greece\nhu|Hungria|Hungary\nis|Islândia|Iceland\nie|Irlanda|Ireland\nit|Itália|Italy\nxk|Kosovo|Kosovo\nlv|Letônia|Latvia\nli|Liechtenstein|\nlt|Lituânia|Lithuania\nlu|Luxemburgo|Luxembourg\nmt|Malta|\nmd|Moldávia|Moldova;Republic of Moldova;República da Moldávia\nmc|Mônaco|Monaco\nme|Montenegro|\nnl|Países Baixos|Netherlands;Holland;Holanda\nmk|Macedônia do Norte|North Macedonia;Macedonia;Macedônia\nno|Noruega|Norway\npl|Polônia|Poland\npt|Portugal|\nro|Romênia|Romania\nru|Rússia|Russia\nsm|San Marino|São Marinho\nrs|Sérvia|Serbia\nsk|Eslováquia|Slovakia\nsi|Eslovênia|Slovenia\nes|Espanha|Spain\nse|Suécia|Sweden\nch|Suíça|Switzerland\nua|Ucrânia|Ukraine\ngb|Reino Unido|United Kingdom;UK;Great Britain;Britain;Grã-Bretanha\nva|Cidade do Vaticano|Vatican City;Vatican;Vaticano;Santa Sé;Holy See\nam|Armênia|Armenia\naz|Azerbaijão|Azerbaijan\nge|Geórgia|Georgia\ntr|Turquia|Türkiye;Turkey\nca|Canadá|Canada\nus|Estados Unidos|United States;United States of America;USA;US;EUA;Estados Unidos da América\nmx|México|Mexico\nbz|Belize|Belice\ncr|Costa Rica|\nsv|El Salvador|Salvador\ngt|Guatemala|\nhn|Honduras|\nni|Nicarágua|Nicaragua\npa|Panamá|Panama\nag|Antígua e Barbuda|Antigua and Barbuda;Antigua\nbs|Bahamas|The Bahamas\nbb|Barbados|\ncu|Cuba|\ndm|Dominica|\ndo|República Dominicana|Dominican Republic\ngd|Granada|Grenada\ngy|Guiana|Guyana\nht|Haiti|\njm|Jamaica|\nkn|São Cristóvão e Névis|Saint Kitts and Nevis;St Kitts and Nevis;Saint Christopher and Nevis\nlc|Santa Lúcia|Saint Lucia;St Lucia\nvc|São Vicente e Granadinas|Saint Vincent and the Grenadines;Saint Vincent;St Vincent\nsr|Suriname|Surinam\ntt|Trinidad e Tobago|Trinidad and Tobago\nar|Argentina|\nbo|Bolívia|Bolivia\nbr|Brasil|Brazil\ncl|Chile|\nco|Colômbia|Colombia\nec|Equador|Ecuador\npy|Paraguai|Paraguay\npe|Peru|\nuy|Uruguai|Uruguay\nve|Venezuela|\ndz|Argélia|Algeria\nao|Angola|\nbj|Benim|Benin\nbw|Botsuana|Botswana\nbf|Burkina Faso|\nbi|Burundi|\ncv|Cabo Verde|Cape Verde\ncm|Camarões|Cameroon\ncf|República Centro-Africana|Central African Republic;CAR\ntd|Chade|Chad\nkm|Comores|Comoros\ncd|República Democrática do Congo|Democratic Republic of the Congo;DR Congo;DRC;Congo Kinshasa;Congo-Kinshasa\ncg|República do Congo|Republic of the Congo;Congo Brazzaville;Congo-Brazzaville\nci|Costa do Marfim|Côte d'Ivoire;Cote d Ivoire;Ivory Coast\ndj|Djibuti|Djibouti\neg|Egito|Egypt\ngq|Guiné Equatorial|Equatorial Guinea\ner|Eritreia|Eritrea\nsz|Essuatíni|Eswatini;Swaziland\net|Etiópia|Ethiopia\nga|Gabão|Gabon\ngm|Gâmbia|Gambia;The Gambia\ngh|Gana|Ghana\ngn|Guiné|Guinea\ngw|Guiné-Bissau|Guinea-Bissau\nke|Quênia|Kenya\nls|Lesoto|Lesotho\nlr|Libéria|Liberia\nly|Líbia|Libya\nmg|Madagascar|\nmw|Maláui|Malawi\nml|Mali|\nmr|Mauritânia|Mauritania\nmu|Maurício|Mauritius\nma|Marrocos|Morocco\nmz|Moçambique|Mozambique\nna|Namíbia|Namibia\nne|Níger|Niger\nng|Nigéria|Nigeria\nrw|Ruanda|Rwanda\nst|São Tomé e Príncipe|Sao Tome and Principe;Sao Tome & Principe\nsn|Senegal|Sénégal\nsc|Seicheles|Seychelles\nsl|Serra Leoa|Sierra Leone\nso|Somália|Somalia\nza|África do Sul|South Africa\nss|Sudão do Sul|South Sudan\nsd|Sudão|Sudan\ntz|Tanzânia|Tanzania\ntg|Togo|\ntn|Tunísia|Tunisia\nug|Uganda|\nzm|Zâmbia|Zambia\nzw|Zimbábue|Zimbabwe\naf|Afeganistão|Afghanistan\nbh|Bahrein|Bahrain\nbd|Bangladesh|\nbt|Butão|Bhutan\nbn|Brunei|Brunei Darussalam\nkh|Camboja|Cambodia\ncn|China|People's Republic of China;PRC\nin|Índia|India\nid|Indonésia|Indonesia\nir|Irã|Iran\niq|Iraque|Iraq\nil|Israel|\njp|Japão|Japan\njo|Jordânia|Jordan\nkz|Cazaquistão|Kazakhstan\nkw|Kuwait|\nkg|Quirguistão|Kyrgyzstan\nla|Laos|Lao PDR\nlb|Líbano|Lebanon\nmy|Malásia|Malaysia\nmv|Maldivas|Maldives\nmn|Mongólia|Mongolia\nmm|Mianmar|Myanmar;Burma;Birmânia\nnp|Nepal|\nkp|Coreia do Norte|North Korea;DPRK;República Popular Democrática da Coreia\nom|Omã|Oman\npk|Paquistão|Pakistan\nps|Palestina|Palestine;State of Palestine;Estado da Palestina\nph|Filipinas|Philippines\nqa|Catar|Qatar\nsa|Arábia Saudita|Saudi Arabia\nsg|Singapura|Singapore\nkr|Coreia do Sul|South Korea;Republic of Korea;ROK\nlk|Sri Lanka|Ceylon;Ceilão\nsy|Síria|Syria\ntw|Taiwan|Republic of China;ROC\ntj|Tajiquistão|Tajikistan\nth|Tailândia|Thailand\ntl|Timor-Leste|East Timor;Timor Leste\ntm|Turcomenistão|Turkmenistan\nae|Emirados Árabes Unidos|United Arab Emirates;UAE;EAU\nuz|Uzbequistão|Uzbekistan\nvn|Vietnã|Vietnam;Viet Nam\nye|Iêmen|Yemen\nau|Austrália|Australia\nfj|Fiji|Fiji Islands\nki|Kiribati|\nmh|Ilhas Marshall|Marshall Islands\nfm|Estados Federados da Micronésia|Micronesia;Federated States of Micronesia\nnr|Nauru|\nnz|Nova Zelândia|New Zealand\npw|Palau|\npg|Papua-Nova Guiné|Papua New Guinea\nws|Samoa|\nsb|Ilhas Salomão|Solomon Islands\nto|Tonga|\ntv|Tuvalu|\nvu|Vanuatu|`;
    const flagCountries = rawFlagCountries.split('\n').map(line => {
        const [code, name, aliases = ''] = line.split('|');
        return { code, name, aliases: [name, ...aliases.split(';').filter(Boolean)] };
    });
    const byId = id => document.getElementById(id);
    const form = byId('flag-guess-form');
    const list = byId('flag-list');
    const submit = byId('flag-submit');
    const reveal = byId('flag-reveal');
    const next = byId('flag-new-round');
    const regionBox = byId('flag-regions');
    const countSelect = byId('flag-count');
    const durationSelect = byId('flag-duration');
    const poolText = byId('flag-pool');
    const timeText = byId('flag-time');
    const timerBar = byId('flag-timer-bar');
    const timerFill = byId('flag-timer-fill');
    const status = byId('flag-status');
    const result = byId('flag-result');
    const scoreText = byId('flag-score');
    const winsText = byId('flag-wins');
    const streakText = byId('flag-streak');

    // Region divisions follow the existing country list; transcontinental countries
    // can be selected from both of their applicable regions.
    const firstAmerica = flagCountries.findIndex(country => country.code === 'ca');
    const firstAfrica = flagCountries.findIndex(country => country.code === 'dz');
    const firstAsia = flagCountries.findIndex(country => country.code === 'af');
    const firstOceania = flagCountries.findIndex(country => country.code === 'au');
    const northAmerica = new Set(['ca', 'us', 'mx']);
    const centralAmerica = new Set(['bz', 'cr', 'sv', 'gt', 'hn', 'ni', 'pa']);
    const caribbean = new Set(['ag', 'bs', 'bb', 'cu', 'dm', 'do', 'gd', 'ht', 'jm', 'kn', 'lc', 'vc', 'tt']);
    const transcontinental = new Set(['ru', 'tr', 'am', 'az', 'ge', 'kz']);

    flagCountries.forEach((country, index) => {
        const regions = new Set();
        if (index < firstAmerica) regions.add('europe');
        else if (index < firstAfrica) {
            regions.add(northAmerica.has(country.code) ? 'north-america' : centralAmerica.has(country.code) ? 'central-america' : caribbean.has(country.code) ? 'caribbean' : 'south-america');
        } else if (index < firstAsia) regions.add('africa');
        else if (index < firstOceania) regions.add('asia');
        else regions.add('oceania');
        if (transcontinental.has(country.code)) { regions.add('europe'); regions.add('asia'); }
        country.regions = regions;
    });

    // Browser CLDR translations for country names in all nine Wordle/drawing languages.
    // Existing manual aliases are kept as additional accepted alternatives.
    const languages = ['pt', 'it', 'es', 'en', 'de', 'fr', 'nl', 'sv', 'no'];
    const localizedNames = languages.map(language => {
        try { return new Intl.DisplayNames([language], { type: 'region', fallback: 'none' }); }
        catch (_) { return null; }
    });
    function normalize(value) {
        return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().replace(/ß/g, 'ss').replace(/ø/g, 'o').replace(/æ/g, 'ae')
            .replace(/œ/g, 'oe').replace(/ł/g, 'l').replace(/ı/g, 'i')
            .replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
    }
    flagCountries.forEach(country => {
        const values = new Set(country.aliases);
        localizedNames.forEach(displayNames => {
            if (!displayNames) return;
            const translation = displayNames.of(country.code.toUpperCase());
            if (translation) values.add(translation);
        });
        country.accepted = new Set([...values].map(normalize).filter(Boolean));
    });

    window.countryQuizShared = { countries: flagCountries, normalize };

    let selectedRegions = new Set(); // empty set = all regions
    let current = [];
    let previousCodes = new Set();
    let score = 0, wins = 0, streak = 0;
    let active = false, timerId = null, deadline = 0, secondsTotal = 60;

    function shuffle(items) {
        const copy = [...items];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }
    function eligibleCountries() {
        return flagCountries.filter(country => !selectedRegions.size || [...selectedRegions].some(region => country.regions.has(region)));
    }
    function renderRegionButtons() {
        regionBox.querySelectorAll('[data-region]').forEach(button => {
            const selected = button.dataset.region === 'all' ? selectedRegions.size === 0 : selectedRegions.has(button.dataset.region);
            button.setAttribute('aria-pressed', String(selected));
        });
    }
    function setStatus(message, kind = 'normal') {
        status.textContent = message;
        status.className = 'text-sm min-h-5 ' + (kind === 'good' ? 'text-emerald-300' : kind === 'bad' ? 'text-rose-300' : 'text-rose-200');
    }
    function flagEmoji(code) {
        return [...code.toUpperCase()].map(char => String.fromCodePoint(127397 + char.charCodeAt(0))).join('');
    }
    function updateTimer() {
        const remainingMs = Math.max(0, deadline - Date.now());
        const remaining = Math.ceil(remainingMs / 1000);
        timeText.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
        const percentage = Math.max(0, Math.min(100, remainingMs / (secondsTotal * 1000) * 100));
        timerFill.style.width = `${percentage}%`;
        timerBar.setAttribute('aria-valuenow', String(Math.round(percentage)));
        timeText.classList.toggle('flag-timer-urgent', active && remaining <= 10);
        if (active && remainingMs <= 0) finishRound('timeout');
    }
    function stopTimer() {
        if (timerId !== null) { clearInterval(timerId); timerId = null; }
    }
    function createFlagRow(country, index) {
        const row = document.createElement('li');
        row.className = 'flag-row';

        const number = document.createElement('span');
        number.className = 'text-xs font-bold text-roseGold/70 w-5 shrink-0 text-center';
        number.textContent = `${index + 1}.`;

        const image = document.createElement('img');
        image.className = 'flag-image rounded-lg';
        image.src = `https://flagcdn.com/w160/${country.code}.png`;
        image.alt = `Bandeira número ${index + 1}`;
        image.width = 112;
        image.height = 73;
        image.loading = 'lazy';
        image.addEventListener('error', () => {
            const replacement = document.createElement('span');
            replacement.className = 'flag-image flag-emoji';
            replacement.textContent = flagEmoji(country.code);
            replacement.setAttribute('aria-label', `Bandeira número ${index + 1}`);
            image.replaceWith(replacement);
        }, { once: true });

        const column = document.createElement('div');
        column.className = 'flex-1 min-w-0 space-y-1';
        const input = document.createElement('input');
        input.id = `flag-answer-${index}`;
        input.name = `country-${index}`;
        input.type = 'text';
        input.className = 'flag-input w-full rounded-xl bg-black/30 border border-roseGold/30 px-3 py-2.5 text-sm text-white outline-none';
        input.placeholder = 'Nome do país';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.setAttribute('aria-label', `País da bandeira ${index + 1}`);
        input.addEventListener('keydown', event => {
            if (event.key !== 'Enter') return;
            const inputs = [...list.querySelectorAll('input')];
            const nextInput = inputs[index + 1];
            if (nextInput) { event.preventDefault(); nextInput.focus(); }
        });
        const feedback = document.createElement('p');
        feedback.className = 'hidden text-[11px] leading-snug';
        feedback.setAttribute('aria-live', 'polite');
        column.append(input, feedback);
        row.append(number, image, column);
        return row;
    }
    function startRound() {
        stopTimer();
        const pool = eligibleCountries();
        const wanted = Number(countSelect.value) || 5;
        const count = Math.min(wanted, pool.length);
        // Prefer new flags over repeats from the immediately preceding round.
        const unseen = shuffle(pool.filter(country => !previousCodes.has(country.code)));
        const seen = shuffle(pool.filter(country => previousCodes.has(country.code)));
        current = shuffle([...unseen, ...seen].slice(0, count));
        previousCodes = new Set(current.map(country => country.code));
        secondsTotal = Number(durationSelect.value) || 60;
        active = true;
        list.replaceChildren(...current.map(createFlagRow));
        submit.disabled = false;
        reveal.disabled = false;
        result.classList.add('hidden');
        result.textContent = '';
        poolText.textContent = `${pool.length} países disponíveis${count < wanted ? `; ${count} bandeiras nesta rodada (limite da região)` : ''}.`;
        renderRegionButtons();
        deadline = Date.now() + secondsTotal * 1000;
        updateTimer();
        timerId = setInterval(updateTimer, 200);
        setStatus(`Identifique ${count} ${count === 1 ? 'bandeira' : 'bandeiras'} em ${secondsTotal} segundos. Todas as respostas são conferidas juntas.`);
    }
    function finishRound(reason) {
        if (!active) return;
        active = false;
        stopTimer();
        updateTimer();
        const inputs = [...list.querySelectorAll('input')];
        const grading = current.map((country, index) => country.accepted.has(normalize(inputs[index].value)));
        const correctCount = reason === 'reveal' ? 0 : grading.filter(Boolean).length;
        const perfect = correctCount === current.length && reason !== 'reveal';
        inputs.forEach((input, index) => {
            input.disabled = true;
            const row = input.closest('.flag-row');
            const correct = reason !== 'reveal' && grading[index];
            row.classList.add(correct ? 'flag-correct' : 'flag-wrong');
            const feedback = input.nextElementSibling;
            feedback.classList.remove('hidden');
            feedback.classList.add(correct ? 'text-emerald-300' : 'text-rose-300');
            feedback.textContent = correct ? `Correto: ${current[index].name}` : `Resposta: ${current[index].name}`;
        });
        submit.disabled = true;
        reveal.disabled = true;
        const earned = correctCount * 100;
        score += earned;
        wins += correctCount;
        streak = perfect ? streak + 1 : 0;
        scoreText.textContent = score;
        winsText.textContent = wins;
        streakText.textContent = streak;
        result.textContent = `${correctCount} de ${current.length} bandeiras corretas · +${earned} pontos.`;
        result.classList.remove('hidden');
        if (reason === 'timeout') setStatus('Tempo esgotado! As respostas preenchidas foram conferidas.', 'bad');
        else if (reason === 'reveal') setStatus('Todas as respostas foram reveladas. Nenhum ponto foi atribuído.');
        else if (perfect) setStatus(`Rodada perfeita! ${current.length} de ${current.length} respostas corretas.`, 'good');
        else setStatus(`Rodada finalizada: ${correctCount} de ${current.length} bandeiras corretas.`);
    }
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (active) finishRound('submit');
    });
    regionBox.addEventListener('click', event => {
        const button = event.target.closest('button[data-region]');
        if (!button || !regionBox.contains(button)) return;
        const region = button.dataset.region;
        if (region === 'all') selectedRegions.clear();
        else if (selectedRegions.has(region)) selectedRegions.delete(region);
        else selectedRegions.add(region);
        startRound();
    });
    countSelect.addEventListener('change', startRound);
    durationSelect.addEventListener('change', startRound);
    reveal.addEventListener('click', () => finishRound('reveal'));
    next.addEventListener('click', startRound);
    startRound();
})();
