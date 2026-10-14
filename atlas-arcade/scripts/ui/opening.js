
(function(){
  'use strict';
  const root = document.documentElement;
  const welcome = document.getElementById('welcome-screen');
  const enter = document.getElementById('enter-btn');
  const skip = document.getElementById('entry-skip');
  if(!welcome || !enter || !skip) {root.dataset.entryState='entered';return;}
  const background = [...document.body.children]
    .filter(element => element !== welcome && !['SCRIPT','STYLE'].includes(element.tagName))
    .map(element => ({element,inert:element.inert}));
  const revealElements = [...document.querySelectorAll('body > header.content-layer,body > main.content-layer,body > footer.content-layer')];
  const animations = [];
  const timers = [];
  let opening = false;
  let completed = false;
  root.dataset.entryState = 'closed';
  root.classList.add('pj-entry-locked');
  background.forEach(({element}) => {element.inert=true;});
  enter.disabled = false;
  try {if(typeof welcome.showModal==='function' && !welcome.open) welcome.showModal();} catch(_) {}
  enter.focus({preventScroll:true});
  function keepFocus(event) {
    if(!completed && !welcome.contains(event.target)) (opening?skip:enter).focus({preventScroll:true});
  }
  function restoreIntroFocus() {
    if(!completed && document.hasFocus() && !welcome.contains(document.activeElement)) (opening?skip:enter).focus({preventScroll:true});
  }
  // Fragment navigation can clear focus after the initial dialog focusing steps.
  welcome.addEventListener('focusout',()=>requestAnimationFrame(restoreIntroFocus));
  window.addEventListener('load',()=>{
    timers.push(setTimeout(restoreIntroFocus,0));
    requestAnimationFrame(restoreIntroFocus);
  },{once:true});
  window.addEventListener('focus',restoreIntroFocus);
  document.addEventListener('focusin',keepFocus,true);
  function animate(element,frames,options) {
    if(!element) return;
    const animation = element.animate(frames,{fill:'both',...options});
    animations.push(animation);
    return animation;
  }
  function finish() {
    if(completed) return;
    completed = true;
    timers.forEach(clearTimeout);
    document.removeEventListener('focusin',keepFocus,true);
    window.removeEventListener('focus',restoreIntroFocus);
    root.dataset.entryState = 'entered';
    if(welcome.open && typeof welcome.close==='function') welcome.close();
    welcome.hidden = true;
    welcome.style.display = 'none';
    root.classList.remove('pj-entry-locked');
    background.forEach(({element,inert}) => {element.inert=inert;});
    animations.forEach(animation => animation.cancel());
    const selected = document.getElementById('game-menu-select')?.value;
    let linked = null;
    try {linked=document.getElementById(decodeURIComponent(location.hash.slice(1)));} catch(_) {}
    const target = (selected && document.getElementById('ux-game-title')) || linked || document.getElementById('pj-pass-title');
    if(target) {
      if(!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1');
      target.focus({preventScroll:!location.hash});
    }
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new CustomEvent('pj:entry-complete'));
  }
  function sound() {
    try {if(typeof startInteractionMusic === 'function') Promise.resolve(startInteractionMusic()).catch(()=>{});} catch(_) {}
  }
  function start() {
    if(opening || completed) return;
    opening = true;
    root.dataset.entryState = 'opening';
    enter.disabled = true;
    skip.textContent = 'Pular animação';
    skip.focus({preventScroll:true});
    sound();
    if(matchMedia('(prefers-reduced-motion: reduce)').matches || !enter.animate) {finish();return;}
    // Completion never depends on sound, animation events, or a foreground tab.
    timers.push(setTimeout(finish,2200));
    try {
      animate(welcome.querySelector('.pj-entry-seal'),[
        {transform:'translate(-50%,-50%) scale(1)',opacity:1},
        {transform:'translate(-50%,-50%) scale(.85)',opacity:1,offset:.45},
        {transform:'translate(-50%,-50%) scale(1.12)',opacity:0}
      ],{duration:240,easing:'ease-out'});
      animate(welcome.querySelector('.pj-entry-flap'),[
        {transform:'rotateX(0deg)'},{transform:'rotateX(180deg)'}
      ],{duration:520,delay:120,easing:'cubic-bezier(.22,.7,.15,1)'});
      timers.push(setTimeout(()=>{const flap=welcome.querySelector('.pj-entry-flap');if(flap)flap.style.zIndex='0';},440));
      animate(welcome.querySelector('.pj-entry-letter'),[
        {transform:'translateY(0) rotate(0deg)'},
        {transform:'translateY(-78%) rotate(-2deg)',offset:.78},
        {transform:'translateY(-82%) rotate(0deg) scale(1.04)'}
      ],{duration:800,delay:330,easing:'cubic-bezier(.18,.75,.2,1)'});
      animate(enter,[
        {transform:'translateY(0) rotate(0deg)',opacity:1},
        {transform:'translateY(12px) rotate(-2deg)',opacity:1,offset:.55},
        {transform:'translateY(36px) rotate(0deg)',opacity:0}
      ],{duration:1100,easing:'ease-in-out'});
      animate(welcome.querySelector('.pj-entry-heading'),[{opacity:1},{opacity:0,transform:'translateY(-12px)'}],{duration:380,delay:270,easing:'ease-out'});
      animate(welcome.querySelector('.pj-entry-instruction'),[{opacity:1},{opacity:0}],{duration:220,delay:250});
      animate(welcome.querySelector('.pj-entry-flight'),[
        {transform:'translate3d(-50%,12vh,0) rotate(-12deg) scale(.6)',opacity:0},
        {transform:'translate3d(4vw,-4vh,0) rotate(-24deg) scale(1)',opacity:1,offset:.25},
        {transform:'translate3d(46vw,-48vh,0) rotate(-38deg) scale(.72)',opacity:0}
      ],{duration:850,delay:650,easing:'cubic-bezier(.3,.1,.25,1)'});
      timers.push(setTimeout(()=>{
        if(completed) return;
        root.dataset.entryState = 'revealing';
        revealElements.forEach((element,index)=>animate(element,[
          {opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}
        ],{duration:550,delay:index*60,easing:'cubic-bezier(.2,.7,.2,1)'}));
      },900));
      const curtain = animate(welcome,[
        {clipPath:'inset(0 0 0% 0 round 0px)'},
        {clipPath:'inset(0 0 100% 0 round 0px)'}
      ],{duration:650,delay:950,easing:'cubic-bezier(.65,0,.25,1)'});
      curtain.finished.then(finish,finish);
    } catch(_) {finish();}
  }
  enter.addEventListener('click',start);
  skip.addEventListener('click',finish);
  welcome.addEventListener('keydown',event=>{
    // Keep game shortcuts behind the dialog; native Enter/Space still click buttons.
    event.stopPropagation();
    if(event.key==='Escape') {event.preventDefault();finish();return;}
    if(event.key!=='Tab') return;
    const buttons = [enter,skip].filter(button=>!button.disabled);
    const first = buttons[0],last = buttons[buttons.length-1];
    if((event.shiftKey && document.activeElement===first) || (!event.shiftKey && document.activeElement===last)) {
      event.preventDefault();(event.shiftKey?last:first).focus();
    }
  });
  welcome.addEventListener('keyup',event=>event.stopPropagation());
  welcome.addEventListener('cancel',event=>{event.preventDefault();finish();});
})();

