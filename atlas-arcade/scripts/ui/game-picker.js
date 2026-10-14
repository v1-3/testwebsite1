
    /* Move existing games into a single picker without cloning or resetting their state. */
    (() => {
        'use strict';
        const select = document.getElementById('game-menu-select');
        const stage = document.getElementById('game-menu-stage');
        const empty = document.getElementById('game-menu-placeholder');
        if (!select || !stage || !empty) return;
        const ids = Array.from(select.options).map(option => option.value).filter(Boolean);
        // The Earth entry shares the NASA Eyes section but selects the Earth application.
        const gameAliases = { 'nasa-eyes-earth-section': 'nasa-eyes-section' };
        const games = new Map();
        for (const id of ids) {
            const section = document.getElementById(id);
            if (!section) continue;
            section.hidden = true;
            stage.appendChild(section);
            games.set(id, section);
        }
        function showGame(id) {
            const target = gameAliases[id] || id;
            const chosen = games.has(target) ? id : '';
            for (const [gameId, section] of games) {
                section.hidden = gameId !== target;
            }
            select.value = chosen;
            empty.hidden = Boolean(chosen);
            stage.classList.toggle('game-menu-has-selection', Boolean(chosen));
            // Both NASA experiences have first-class menu entries without duplicating iframes.
            if (chosen === 'nasa-eyes-earth-section') {
                document.getElementById('ney-tab-earth')?.click();
            } else if (chosen === 'nasa-eyes-section') {
                document.getElementById('ney-tab-solar')?.click();
            }
            if (chosen) {
                // Notify maps, canvases and responsive boards after becoming visible.
                requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
            }
        }
        select.addEventListener('change', () => showGame(select.value));
        function openLinkedGame() {
            const fragment = window.location.hash.slice(1);
            let linked = null;
            if (fragment === 'game-library') linked = '';
            else if (fragment.startsWith('desenho=')) linked = 'draw-game-section';
            else if (games.has(fragment) || gameAliases[fragment]) linked = fragment;
            if (linked !== null) {
                select.value = linked;
                select.dispatchEvent(new Event('change', {bubbles:true}));
            }
        }
        showGame('');
        openLinkedGame(); // Existing shared-drawing links open the drawing game directly.
        window.addEventListener('hashchange', openLinkedGame);
    })();
    