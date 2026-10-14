(()=>{
    'use strict';
    const root=document.getElementById('visual-pinball-section'),frame=document.getElementById('vp-pinball-frame'),menu=document.getElementById('game-menu-select');
    if(!root||!frame||root.dataset.vpBound)return;root.dataset.vpBound='true';
    const source=window.AtlasArcadeEmbeds?.visualPinball;
    if(typeof source!=='string'){root.dataset.vpBound='';console.error('Visual Pinball UI could not be loaded.');return;}
    let ready=false,parentLanguage=null;
    function sync(){
      if(!ready)return;
      const theme=root.dataset.gameTheme||((menu.value===root.id&&document.getElementById('game-menu-stage').dataset.gameTheme)||'original');
      const state={type:'pj-vpx-state',active:menu.value===root.id&&!root.hidden,theme,siteTheme:document.documentElement.dataset.postcardTheme||'light',viewportHeight:window.innerHeight};
      const language=document.getElementById('sm-language')?.value||'pt';
      if(parentLanguage!==language){state.language=language;parentLanguage=language;}
      frame.contentWindow.postMessage(state,'*');
    }
    function loaded(){ready=true;frame.contentWindow.PJVPCommit='90d94e9f16d40f593c1d78e0549e6a1148078e81';sync();}
    frame.addEventListener('load',loaded);
    window.addEventListener('message',event=>{
      if(event.source!==frame.contentWindow)return;
      if(event.data?.type==='pj-vpx-ready')loaded();
      if(event.data?.type==='pj-vpx-height'&&Number.isFinite(event.data.height)){
        const height=Math.ceil(Math.max(500,Math.min(4500,event.data.height)));
        if(Math.abs(Number(frame.dataset.contentHeight||0)-height)>1){frame.dataset.contentHeight=String(height);frame.style.height=height+'px';}
      }
    });
    menu.addEventListener('change',sync);
    window.addEventListener('resize',sync);
    document.getElementById('sm-language')?.addEventListener('change',sync);
    window.addEventListener('tp:game-theme-change',event=>{if(event.detail?.id===root.id){root.dataset.gameTheme=event.detail.theme;sync();}});
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-postcard-theme']});
    new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['hidden']});
    frame.srcdoc=source;
    window.pjVPBridge={sync,snapshot:()=>({ready,height:Number(frame.dataset.contentHeight||0),active:menu.value===root.id&&!root.hidden,sourceCommit:"90d94e9f16d40f593c1d78e0549e6a1148078e81"})};
  })();
