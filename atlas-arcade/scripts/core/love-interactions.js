        let loveCount = 0;
        const sweetMessages = [
            "Te amo, Julia! ❤️",
            "Mais um pedacinho do meu coração para você! 💖",
            "Até o infinito é pouco perto do que sinto! ✨",
            "Você é a melhor parte dos meus dias! 🌹",
            "Meu mundo é muito mais feliz com você! 💫",
            "Cada segundo longe de você é uma contagem regressiva para o nosso abraço. 🫂",
            "Você é o meu sonho que se tornou realidade. 🌟",
            "Obrigado por ser a melhor namorada do mundo! 💖",
            "Com você, qualquer distância vale a pena. 🌍",
            "Te amo hoje, amanhã e para sempre! 💞",
            "Seu sorriso é a minha paz. 🥰",
            "Você faz meu coração acelerar mesmo de longe. 💓",
            "O som da sua voz ilumina até o meu dia mais cinza. ☀️",
            "Guardei um pedacinho de mim em cada lembrança nossa. 🧩",
            "Não vejo a hora de olhar nos seus olhos e te abraçar bem forte. 🤗",
            "Meu lugar favorito no universo é onde você estiver. 🌌",
            "Amar você é a coisa mais natural e bonita que já me aconteceu. 🌷",
            "Você é poesia pura escrita em forma de pessoa. 📖",
            "Nenhum obstáculo é grande demais quando penso em nós dois. 🧗‍♂️",
            "Cada detalhe seu me faz te amar um pouquinho mais a cada dia. 🌸",
            "Você é o meu pensamento favorito ao acordar e ao dormir. 🌙",
            "Meu futuro tem o seu nome escrito em cada página. 💍",
            "A distância não diminui o que sinto, só aumenta a vontade de te ver. ✈️",
            "Você é o meu porto seguro e a minha maior aventura. ⚓"
        ];

        function showLoveToast() {
            const container = document.getElementById('love-toast-container');
            const toast = document.createElement('div');
            toast.className = 'glass-card px-5 py-2.5 rounded-full text-xs sm:text-sm text-pink-200 border border-rose-500/40 shadow-[0_0_20px_rgba(225,29,72,0.4)] toast-animation flex items-center gap-2';
            const randomMsg = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
            toast.innerHTML = `<i class="fa-solid fa-heart text-rose-500"></i> <span>${randomMsg}</span>`;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 4500);
        }

        document.getElementById('heart-burst-btn').addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            createHeartBurst(rect.left + rect.width / 2, rect.top, 35);

            loveCount++;
            document.getElementById('love-counter').innerText = loveCount;
            
            const btnText = document.getElementById('heart-btn-text');
            btnText.innerText = "Amor Enviado! 💖";
            setTimeout(() => {
                btnText.innerText = "Enviar Amor";
            }, 3500);

            showLoveToast();
        });

        window.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            createHeartBurst(e.clientX, e.clientY, 15);
        });

