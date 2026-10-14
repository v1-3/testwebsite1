        // Torres de Hanói: seleção por toque/click, com discos de 3 a 8.
        (() => {
            const board = document.getElementById('hanoi-board');
            const stats = document.getElementById('hanoi-stats');
            const status = document.getElementById('hanoi-status');
            const restart = document.getElementById('hanoi-restart');
            const sizeControls = Array.from(document.querySelectorAll('#hanoi-size-controls [data-disks]'));
            if (!board || !stats || !status || !restart || !sizeControls.length) return;

            const pegNames = ['Torre A', 'Torre B', 'Torre C'];
            const diskColors = [
                ['#fb7185', '#be123c'], ['#f9a8d4', '#db2777'], ['#c4b5fd', '#7c3aed'], ['#93c5fd', '#2563eb'],
                ['#67e8f9', '#0891b2'], ['#86efac', '#16a34a'], ['#fde68a', '#d97706'], ['#fdba74', '#ea580c']
            ];
            let diskCount = 3;
            let towers = [];
            let selectedTower = null;
            let moves = 0;
            let complete = false;

            const minimumMoves = count => (2 ** count) - 1;
            const setStatus = message => { status.textContent = message; };
            const setSizeButtons = () => sizeControls.forEach(button => {
                button.setAttribute('aria-pressed', String(Number(button.dataset.disks) === diskCount));
            });

            function render() {
                board.innerHTML = '';
                towers.forEach((tower, towerIndex) => {
                    const towerButton = document.createElement('button');
                    towerButton.type = 'button';
                    towerButton.className = 'hanoi-tower';
                    towerButton.dataset.selected = String(selectedTower === towerIndex);
                    towerButton.setAttribute('aria-pressed', String(selectedTower === towerIndex));
                    towerButton.setAttribute('aria-label', `${pegNames[towerIndex]}, ${tower.length} ${tower.length === 1 ? 'disco' : 'discos'}${selectedTower === towerIndex ? ', selecionada' : ''}`);

                    const label = document.createElement('span');
                    label.className = 'hanoi-peg-label';
                    label.setAttribute('aria-hidden', 'true');
                    label.textContent = String.fromCharCode(65 + towerIndex);

                    const disks = document.createElement('span');
                    disks.className = 'hanoi-disks';
                    disks.setAttribute('aria-hidden', 'true');
                    tower.forEach(size => {
                        const disk = document.createElement('span');
                        const ratio = diskCount === 1 ? .7 : .3 + ((size - 1) / (diskCount - 1)) * .64;
                        const [light, dark] = diskColors[(size - 1) % diskColors.length];
                        disk.className = 'hanoi-disk';
                        disk.style.setProperty('--disk-width', `${Math.round(ratio * 100)}%`);
                        disk.style.setProperty('--disk-light', light);
                        disk.style.setProperty('--disk-dark', dark);
                        disks.appendChild(disk);
                    });

                    towerButton.append(label, disks);
                    towerButton.addEventListener('click', () => chooseTower(towerIndex));
                    board.appendChild(towerButton);
                });
                stats.textContent = `Movimentos: ${moves} • Mínimo possível: ${minimumMoves(diskCount)}`;
            }

            function chooseTower(targetIndex) {
                if (complete) {
                    setStatus('Essa partida já foi concluída. Escolha outro número de discos ou recomece.');
                    return;
                }
                if (selectedTower === null) {
                    if (!towers[targetIndex].length) {
                        setStatus('Essa torre está vazia. Escolha uma torre que tenha um disco.');
                        return;
                    }
                    selectedTower = targetIndex;
                    setStatus(`${pegNames[targetIndex]} selecionada. Agora escolha a torre de destino.`);
                    render();
                    return;
                }
                if (selectedTower === targetIndex) {
                    selectedTower = null;
                    setStatus('Seleção cancelada. Escolha uma torre de origem.');
                    render();
                    return;
                }

                const source = towers[selectedTower];
                const movingDisk = source[source.length - 1];
                const destination = towers[targetIndex];
                const topDestinationDisk = destination[destination.length - 1];
                if (topDestinationDisk && movingDisk > topDestinationDisk) {
                    setStatus('Não dá para colocar um disco maior sobre um menor. Escolha outra torre de destino.');
                    render();
                    return;
                }

                source.pop();
                destination.push(movingDisk);
                moves++;
                selectedTower = null;
                complete = towers.some((tower, index) => index !== 0 && tower.length === diskCount);
                if (complete) {
                    setStatus(`Parabéns! Você completou as Torres de Hanói em ${moves} movimentos${moves === minimumMoves(diskCount) ? ', no mínimo possível' : ''}! 💖`);
                } else {
                    setStatus(`Disco movido para ${pegNames[targetIndex]}.`);
                }
                render();
            }

            function startGame(count = diskCount) {
                diskCount = count;
                towers = [Array.from({ length: diskCount }, (_, index) => diskCount - index), [], []];
                selectedTower = null;
                moves = 0;
                complete = false;
                setSizeButtons();
                setStatus('Escolha uma torre de origem para começar.');
                render();
            }

            sizeControls.forEach(button => button.addEventListener('click', () => startGame(Number(button.dataset.disks))));
            restart.addEventListener('click', () => startGame());
            startGame();
        })();

    