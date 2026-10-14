
    /* Estacionamento engarrafado: fases verificadas como solucionáveis. */
    (() => {
      'use strict';
      const section = document.getElementById('parking-jam');
      if (!section) return;
      const board = document.getElementById('pj-board');
      const info = document.getElementById('pj-info');
      const movesEl = document.getElementById('pj-moves');
      const levelEl = document.getElementById('pj-level-label');
      const selectedEl = document.getElementById('pj-selected');
      const winEl = document.getElementById('pj-result');
      const undoBtn = document.getElementById('pj-undo');
      const directionButtons = Array.from(section.querySelectorAll('.pj-arrow'));
      const difficultyButtons = Array.from(section.querySelectorAll('.pj-difficulty'));
      const colorSet = ['#e11d48','#0e7490','#7c3aed','#d97706','#0284c7','#16a34a','#c026d3','#a16207','#475569','#0d9488','#be185d','#2563eb','#6d28d9','#b45309'];
      // Format: orientation, length, row, column. A = the exit car.
      const levels = {
        easy: [
          'H2@2,0 V2@1,5 V2@1,4 H2@3,1 H3@3,3 H3@5,0 H2@5,4 V2@4,3',
          'H2@2,0 H3@0,2 V2@1,4 H3@4,1 V3@3,0 V2@1,2 H3@5,3 H2@3,2 V2@0,0',
          'H2@2,0 H2@4,1 H2@0,3 V2@0,2 V3@2,5 V3@2,4 V2@0,1 V2@2,2'
        ],
        medium: [
          'H2@2,0 V3@3,2 V2@0,1 V2@2,5 V3@3,0 H3@1,3 H3@4,3 V2@2,4 V2@3,1 H3@0,2 H3@5,3',
          'H2@2,0 H3@0,2 V3@2,3 V3@2,5 V3@1,4 H2@0,0 H3@5,2 V2@4,1 V2@1,2 V2@3,2 V3@3,0',
          'H2@2,0 H2@1,4 H2@1,2 H2@5,4 V2@2,4 H3@4,2 V2@2,2 V2@2,5 V2@0,1 H2@4,0 H2@0,4 V2@0,0'
        ],
        hard: [
          'H2@2,0 H2@5,4 V2@3,1 V2@2,4 H3@1,1 H3@0,1 H2@4,3 V2@2,2 V2@0,4',
          'H2@2,0 V3@3,5 H2@4,0 H3@3,0 V2@0,0 H3@0,3 H2@4,3 V2@2,3 H3@1,3',
          'H2@2,0 V2@2,4 V3@0,3 H2@0,1 H2@4,4 V3@1,2 V2@0,4 H2@5,3 V2@2,5 V2@3,1'
        ]
      };
      let difficulty = 'easy';
      let levelIndex = 0;
      let cars = [];
      let selected = null;
      let moves = 0;
      let won = false;
      let history = [];
      let swipeStart = null;
      const dirMap = { up: [-1,0,'V'], down: [1,0,'V'], left: [0,-1,'H'], right: [0,1,'H'] };

      function parseLevel(puzzle) {
        return puzzle.split(/\s+/).map((entry,i) => {
          const match = /^([HV])([23])@(\d),(\d)$/.exec(entry);
          if (!match) throw new Error('Invalid parking puzzle');
          return { id:String.fromCharCode(65+i), orientation:match[1], len:Number(match[2]), row:Number(match[3]), col:Number(match[4]), color:colorSet[i % colorSet.length] };
        });
      }
      function canMove(car, direction) {
        if (!car || won) return false;
        const spec = dirMap[direction];
        if (!spec || car.orientation !== spec[2]) return false;
        const row = car.row + spec[0], col = car.col + spec[1];
        if (row < 0 || col < 0 || row + (car.orientation === 'V' ? car.len : 1) > 6 || col + (car.orientation === 'H' ? car.len : 1) > 6) return false;
        for (const other of cars) {
          if (other === car) continue;
          for (let a=0; a<car.len; a++) {
            const cy = row + (car.orientation === 'V' ? a : 0);
            const cx = col + (car.orientation === 'H' ? a : 0);
            for (let b=0; b<other.len; b++) {
              const oy = other.row + (other.orientation === 'V' ? b : 0);
              const ox = other.col + (other.orientation === 'H' ? b : 0);
              if (cy === oy && cx === ox) return false;
            }
          }
        }
        return true;
      }
      function render() {
        const focusedCar = board.querySelector('.pj-car:focus');
        const focusedId = focusedCar?.dataset.car;
        const fragment = document.createDocumentFragment();
        const exit = board.querySelector('.pj-exit');
        if (exit) fragment.appendChild(exit);
        cars.forEach((car, i) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'pj-car ' + (car.orientation === 'V' ? 'pj-vertical' : 'pj-horizontal') + (i === 0 ? ' pj-target' : '');
          button.dataset.car = car.id;
          button.setAttribute('aria-pressed', String(selected === car.id));
          button.setAttribute('aria-label', `Carro ${car.id}${i===0?' vermelho, levar à saída':''}, ${car.orientation==='H'?'horizontal':'vertical'}, linha ${car.row+1}, coluna ${car.col+1}`);
          button.title = i === 0 ? 'Carro A — leve à saída' : 'Carro ' + car.id + ' — selecione para mover';
          button.style.setProperty('--car-color', car.color);
          const inset = 4;
          button.style.left = `calc(${car.col * 100 / 6}% + ${inset}px)`;
          button.style.top = `calc(${car.row * 100 / 6}% + ${inset}px)`;
          button.style.width = `calc(${(car.orientation === 'H' ? car.len : 1) * 100 / 6}% - ${inset*2}px)`;
          button.style.height = `calc(${(car.orientation === 'V' ? car.len : 1) * 100 / 6}% - ${inset*2}px)`;
          const glass = document.createElement('span'); glass.className = 'pj-car-window'; glass.setAttribute('aria-hidden','true');
          const letter = document.createElement('span'); letter.className = 'pj-car-code'; letter.textContent = car.id;
          button.append(glass, letter);
          button.addEventListener('click', () => selectCar(car.id));
          button.addEventListener('pointerdown', event => {
            if (event.button !== 0) return;
            swipeStart = { id:car.id, x:event.clientX, y:event.clientY };
            // The element remains until pointerup; capture supports short swipes outside its outline.
            try { button.setPointerCapture(event.pointerId); } catch (_) {}
          });
          button.addEventListener('pointerup', event => {
            if (!swipeStart || swipeStart.id !== car.id) return;
            const dx=event.clientX-swipeStart.x, dy=event.clientY-swipeStart.y;
            swipeStart=null;
            const delta = car.orientation === 'H' ? dx : dy;
            if (Math.abs(delta) < 23 || Math.abs(car.orientation === 'H' ? dy : dx) > Math.abs(delta)) return;
            selected=car.id;
            const steps=Math.min(5,Math.max(1,Math.round(Math.abs(delta)/(board.clientWidth/6))));
            const direction=car.orientation === 'H' ? (delta>0?'right':'left') : (delta>0?'down':'up');
            for(let step=0;step<steps;step++) if(!move(direction)) break;
            render();
          });
          button.addEventListener('pointercancel', () => { swipeStart=null; });
          fragment.appendChild(button);
        });
        board.replaceChildren(fragment);
        if (focusedId) board.querySelector(`.pj-car[data-car="${focusedId}"]`)?.focus({preventScroll:true});
        selectedEl.textContent = selected || 'Nenhum';
        movesEl.textContent = String(moves);
        levelEl.textContent = `${levelIndex+1} / ${levels[difficulty].length}`;
        undoBtn.disabled = history.length === 0;
        const current = cars.find(c=>c.id===selected);
        directionButtons.forEach(button => { button.disabled=!canMove(current,button.dataset.dir); });
        if (won) info.textContent = 'Saída liberada! Você completou a fase.';
        else if (current) info.textContent = `Carro ${current.id} selecionado. ${current.orientation === 'H' ? 'Mova para a esquerda ou direita.' : 'Mova para cima ou para baixo.'}`;
        else info.textContent = 'Toque em um carro para selecioná-lo.';
        winEl.hidden = !won;
        difficultyButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.level===difficulty)));
      }
      function selectCar(id) {
        if (won) return;
        selected=id;
        render();
      }
      function move(direction) {
        const current = cars.find(c=>c.id===selected);
        if (!canMove(current,direction)) return false;
        history.push({ coords:cars.map(car=>[car.row,car.col]), moves, won });
        const [dy,dx] = dirMap[direction];
        current.row+=dy;
        current.col+=dx;
        moves++;
        if (current.id==='A' && current.col===4) won=true;
        render();
        return true;
      }
      function loadLevel() {
        cars=parseLevel(levels[difficulty][levelIndex]);
        selected='A';
        moves=0;
        won=false;
        history=[];
        render();
      }
      difficultyButtons.forEach(button=>button.addEventListener('click',()=>{
        if (difficulty===button.dataset.level) return;
        difficulty=button.dataset.level;
        levelIndex=0;
        loadLevel();
      }));
      directionButtons.forEach(button=>button.addEventListener('click',()=>move(button.dataset.dir)));
      undoBtn.addEventListener('click',()=>{
        const previous=history.pop();
        if(!previous) return;
        cars.forEach((car,i)=>{car.row=previous.coords[i][0];car.col=previous.coords[i][1];});
        moves=previous.moves;
        won=previous.won;
        render();
      });
      document.getElementById('pj-reset').addEventListener('click',loadLevel);
      document.getElementById('pj-next').addEventListener('click',()=>{
        levelIndex=(levelIndex+1)%levels[difficulty].length;
        loadLevel();
      });
      document.addEventListener('keydown',event=>{
        const directions={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};
        const direction=directions[event.key];
        if (!direction || !section.contains(document.activeElement)) return;
        if (document.activeElement?.matches('.pj-difficulty')) return;
        event.preventDefault();
        move(direction);
      });
      loadLevel();
    })();
    