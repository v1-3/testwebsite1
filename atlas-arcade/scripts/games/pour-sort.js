
    // Independent liquid sorting game: vetted, solvable challenges in each difficulty.
    (() => {
      'use strict';
      const section=document.getElementById('pour-sort');
      if (!section) return;
      const board=section.querySelector('#ps-board');
      const info=section.querySelector('#ps-message');
      const movesEl=section.querySelector('#ps-moves');
      const sortedEl=section.querySelector('#ps-sorted');
      const levelEl=section.querySelector('#ps-level');
      const winEl=section.querySelector('#ps-success');
      const undoBtn=section.querySelector('#ps-undo');
      const difficulties=Array.from(section.querySelectorAll('[data-ps-difficulty]'));
      const colors=[
        {name:'rosa',hex:'#fb7185'},
        {name:'azul',hex:'#38bdf8'},
        {name:'amarelo',hex:'#fbbf24'},
        {name:'roxo',hex:'#a78bfa'},
        {name:'verde',hex:'#34d399'},
        {name:'laranja',hex:'#fb923c'},
        {name:'magenta',hex:'#f472b6'}
      ];
      // Each string encodes a flask bottom-to-top; an empty string means empty.
      // Every puzzle was produced by reversible color-group moves from a solved state.
      const puzzles={
        easy:[
          ['', '1221', '2210', '0001', ''],
          ['0001', '', '2221', '1102', ''],
          ['0220', '1112', '', '', '1002'],
          ['', '1110', '2220', '0021', '']
        ],
        medium:[
          ['0001', '', '2221', '3321', '4443', '', '0431'],
          ['', '', '2220', '3324', '4030', '1110', '4413'],
          ['', '1003', '222', '3310', '4130', '4441', '2'],
          ['', '110', '2323', '3310', '4442', '2410', '0']
        ],
        hard:[
          ['0016', '1110', '224', '3325', '425', '5034', '', '6634', '65'],
          ['025', '5', '5225', '3310', '4446', '', '1602', '6140', '3316'],
          ['0012', '1532', '', '3412', '4443', '', '6661', '6005', '5532'],
          ['0403', '1004', '2223', '', '4423', '5551', '6661', '', '5631']
        ]
      };
      const shapes=['tube','round','vial','jar'];
      let difficulty='easy', levelIndex=0, flasks=[], startFlasks=[], selected=-1;
      let moves=0, history=[], won=false, customMessage='';
      function clone(state) { return state.map(tube=>tube.slice()); }
      function sorted(tube) { return tube.length===4 && tube.every(color=>color===tube[0]); }
      function canPour(from,to) {
        if (from<0 || to<0 || from===to) return false;
        const source=flasks[from], target=flasks[to];
        return Boolean(source?.length && target && target.length<4 && (!target.length || target.at(-1)===source.at(-1)));
      }
      function render() {
        const focus=board.contains(document.activeElement) ? Number(document.activeElement.closest('.ps-flask')?.dataset.index) : -1;
        const fragment=document.createDocumentFragment();
        flasks.forEach((tube,i)=>{
          const button=document.createElement('button');
          button.type='button';
          button.className='ps-flask';
          button.dataset.index=String(i);
          button.dataset.shape=shapes[i%shapes.length];
          button.setAttribute('aria-pressed',String(i===selected));
          button.setAttribute('aria-label',`Frasco ${i+1}: ${tube.length ? tube.length+' camadas, de baixo para cima: '+tube.map(color=>colors[color].name).join(', ') : 'vazio'}`);
          if(i===selected) button.classList.add('ps-selected');
          else if(selected>=0 && canPour(selected,i)) button.classList.add('ps-possible');
          const neck=document.createElement('span');neck.className='ps-neck';neck.setAttribute('aria-hidden','true');
          const glass=document.createElement('span');glass.className='ps-glass';glass.setAttribute('aria-hidden','true');
          const bed=document.createElement('span');bed.className='ps-liquid-bed';
          tube.forEach(color=>{
            const liquid=document.createElement('span');
            liquid.className='ps-liquid';
            liquid.style.setProperty('--liquid',colors[color].hex);
            bed.appendChild(liquid);
          });
          glass.appendChild(bed);
          const caption=document.createElement('span');caption.className='ps-caption';caption.textContent=`Frasco ${String(i+1).padStart(2,'0')}`;
          const fill=document.createElement('span');fill.className='ps-capacity';fill.textContent=`${tube.length} / 4`;
          button.append(neck,glass,caption,fill);
          fragment.appendChild(button);
        });
        board.replaceChildren(fragment);
        if(focus>=0 && focus<flasks.length) board.querySelector(`[data-index="${focus}"]`)?.focus({preventScroll:true});
        movesEl.textContent=String(moves);
        sortedEl.textContent=`${flasks.filter(sorted).length} / ${colorsForDifficulty()}`;
        levelEl.textContent=`${levelIndex+1} / ${puzzles[difficulty].length}`;
        undoBtn.disabled=history.length===0;
        winEl.hidden=!won;
        difficulties.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.psDifficulty===difficulty)));
        info.textContent=won?'Você resolveu o desafio! Escolha “Nova fase” para continuar.' : customMessage || (selected>=0?`Frasco ${selected+1} selecionado. Escolha outro frasco para despejar.`:'Escolha um frasco e depois outro para despejar o líquido.');
      }
      function colorsForDifficulty() { return {easy:3,medium:5,hard:7}[difficulty]; }
      function selectFlask(index) {
        if(won) return;
        if(index===selected) { selected=-1; customMessage=''; render(); return; }
        if(selected>=0 && canPour(selected,index)) {
          history.push({flasks:clone(flasks),moves});
          const src=flasks[selected], dst=flasks[index], color=src.at(-1);
          let number=0;
          for(let i=src.length-1;i>=0 && src[i]===color;i--) number++;
          number=Math.min(number,4-dst.length);
          for(let j=0;j<number;j++) dst.push(src.pop());
          moves++;
          selected=-1;
          won=flasks.every(tube=>tube.length===0 || sorted(tube));
          customMessage=won?'':`${number} camada${number!==1?'s':''} transferida${number!==1?'s':''}. Continue organizando as cores.`;
          render(); return;
        }
        if(flasks[index].length) {
          selected=index;
          customMessage='';
        } else if(selected>=0) {
          customMessage='Este frasco não pode receber mais líquido.';
        } else {
          customMessage='Escolha primeiro um frasco com líquido.';
        }
        render();
      }
      function loadPuzzle() {
        startFlasks=puzzles[difficulty][levelIndex].map(value=>Array.from(value,ch=>Number(ch)));
        flasks=clone(startFlasks);
        history=[]; selected=-1; moves=0; won=false; customMessage='';
        render();
      }
      board.addEventListener('click',event=>{
        const button=event.target.closest('.ps-flask');
        if(button && board.contains(button)) selectFlask(Number(button.dataset.index));
      });
      board.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
        const current=event.target.closest('.ps-flask');
        if(!current) return;
        event.preventDefault();
        const columns=Math.max(1,Math.round(board.clientWidth/(current.offsetWidth+5)));
        const steps={ArrowLeft:-1,ArrowRight:1,ArrowUp:-columns,ArrowDown:columns};
        const next=Math.max(0,Math.min(flasks.length-1,Number(current.dataset.index)+steps[event.key]));
        board.querySelector(`[data-index="${next}"]`)?.focus();
      });
      difficulties.forEach(button=>button.addEventListener('click',()=>{
        difficulty=button.dataset.psDifficulty; levelIndex=0; loadPuzzle();
      }));
      undoBtn.addEventListener('click',()=>{
        const previous=history.pop(); if(!previous) return;
        flasks=previous.flasks; moves=previous.moves; selected=-1; won=false; customMessage='Último movimento desfeito.'; render();
      });
      section.querySelector('#ps-reset').addEventListener('click',loadPuzzle);
      section.querySelector('#ps-next').addEventListener('click',()=>{
        levelIndex=(levelIndex+1)%puzzles[difficulty].length; loadPuzzle();
      });
      loadPuzzle();
    })();
    