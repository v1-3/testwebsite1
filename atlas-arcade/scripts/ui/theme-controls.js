
(function(){
  'use strict';
  const root=document.documentElement;
  const button=document.getElementById('tp-theme-toggle');
  const meta=document.querySelector('meta[name="theme-color"]');
  if(!button)return;
  function apply(mode,save){
    const dark=mode==='dark';
    root.dataset.postcardTheme=dark?'dark':'light';
    button.setAttribute('aria-pressed',String(dark));
    button.setAttribute('aria-label',dark?'Ativar modo claro':'Ativar modo escuro');
    button.querySelector('.tp-theme-label').textContent=dark?'Modo claro':'Modo escuro';
    button.querySelector('.tp-theme-icon').textContent=dark?'☀':'☾';
    button.title=dark?'Voltar ao cartão-postal claro':'Ver o cartão-postal à noite';
    if(meta)meta.setAttribute('content',dark?'#0D1424':'#EFF2F8');
    if(save){try{localStorage.setItem('tp-postcard-mode',dark?'dark':'light');}catch(e){}}
  }
  apply(root.dataset.postcardTheme||'light',false);
  button.addEventListener('click',()=>apply(root.dataset.postcardTheme==='dark'?'light':'dark',true));
})();
