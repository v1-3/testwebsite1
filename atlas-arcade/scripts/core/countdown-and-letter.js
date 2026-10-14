        const targetDate = new Date('January 27, 2028 00:00:00').getTime();

        const quotes = [
            { text: "O tempo é muito lento para os que esperam, muito rápido para os que têm medo, mas para os que amam, o tempo é eternidade.", author: "Henry Van Dyke" },
            { text: "Eu te escolheria. Centenas de vidas, em qualquer universo, em qualquer versão da realidade, eu encontraria você.", author: "Kiersten White" },
            { text: "O amor não consiste em olhar um para o outro, mas em olhar juntos na mesma direção.", author: "Antoine de Saint-Exupéry" },
            { text: "Até 27 de janeiro de 2028 e para todo o sempre, cada segundo me aproxima do seu abraço.", author: "Declaração de Amor" },
            { text: "O meu lugar favorito no mundo inteiro é bem ao seu lado, onde o tempo parece parar e o resto do universo deixa de importar.", author: "Declaração de Amor" },
            { text: "A distância física é apenas um detalhe irrelevante quando o sentimento que habita no peito é maior do que qualquer quilômetro.", author: "Poesia Romântica" }
        ];

        let currentQuoteIndex = 0;

        const els = {
            years: document.getElementById('years'),
            months: document.getElementById('months'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            quoteText: document.getElementById('quote-text'),
            quoteAuthor: document.getElementById('quote-author')
        };

        function updateCountdowns() {
            const now = new Date();
            const target = new Date(targetDate);
            const distance = target.getTime() - now.getTime();

            if (distance >= 0) {
                let years = target.getFullYear() - now.getFullYear();
                let months = target.getMonth() - now.getMonth();
                let days = target.getDate() - now.getDate();
                let hours = target.getHours() - now.getHours();
                let minutes = target.getMinutes() - now.getMinutes();
                let seconds = target.getSeconds() - now.getSeconds();

                if (seconds < 0) { seconds += 60; minutes--; }
                if (minutes < 0) { minutes += 60; hours--; }
                if (hours < 0) { hours += 24; days--; }
                if (days < 0) {
                    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
                    days += prevMonth.getDate();
                    months--;
                }
                if (months < 0) { months += 12; years--; }

                els.years.innerText = String(years).padStart(2, '0');
                els.months.innerText = String(months).padStart(2, '0');
                els.days.innerText = String(days).padStart(2, '0');
                els.hours.innerText = String(hours).padStart(2, '0');
                els.minutes.innerText = String(minutes).padStart(2, '0');
                els.seconds.innerText = String(seconds).padStart(2, '0');
                [['years',years,'ano','anos'],['months',months,'mês','meses'],['days',days,'dia','dias'],['hours',hours,'hora','horas']].forEach(([key,value,singular,plural]) => {
                    const label = els[key].closest('.pj-time')?.querySelector('small');
                    const text = value === 1 ? singular : plural;
                    if(label && label.textContent !== text) label.textContent = text;
                });

            }

        }

        setInterval(updateCountdowns, 1000);
        updateCountdowns();

        function displayQuote(index) {
            els.quoteText.classList.add('opacity-0');
            els.quoteAuthor.classList.add('opacity-0');
            setTimeout(() => {
                els.quoteText.innerText = `"${quotes[index].text}"`;
                els.quoteAuthor.innerText = `— ${quotes[index].author}`;
                els.quoteText.classList.remove('opacity-0');
                els.quoteAuthor.classList.remove('opacity-0');
            }, 300);
        }

        document.getElementById('prev-quote').addEventListener('click', () => {
            currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
            displayQuote(currentQuoteIndex);
        });
        document.getElementById('next-quote').addEventListener('click', () => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            displayQuote(currentQuoteIndex);
        });
        setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            displayQuote(currentQuoteIndex);
        }, 12000);

