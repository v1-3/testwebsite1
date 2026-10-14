
 // Match the simulator's own width breakpoints, including narrow PC windows.
 (function(){
  const frame=document.getElementById('solar-remade-frame');
  if(!frame)return;
  let observing=null, raf=0;
  function sync(){
    if(!frame.contentDocument)return;
    const width=frame.getBoundingClientRect().width;
    if(width<1)return;
    const expanded=width<960;
    frame.parentElement.classList.toggle('solar-expanded',expanded);
    if(!expanded){frame.style.height='100%';return;}
    const doc=frame.contentDocument;
    const app=doc.querySelector('.app');
    const natural=app ? app.getBoundingClientRect().height : doc.body.scrollHeight;
    const height=Math.max(600,Math.ceil(natural)+4);
    // Ignore tiny changes to avoid a ResizeObserver feedback loop.
    if(Math.abs((parseFloat(frame.style.height)||0)-height)>2)frame.style.height=height+'px';
  }
  function schedule(){if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{raf=0;sync();});}
  function attach(){
    try{
      if(observing)observing.disconnect();
      const doc=frame.contentDocument;
      if(!doc)return;
      observing=new ResizeObserver(schedule);
      observing.observe(doc.documentElement);
      observing.observe(doc.body);
      // Enabling the section can occur long after the iframe initially loads.
      schedule();setTimeout(schedule,250);setTimeout(schedule,900);
    }catch(e){schedule();}
  }
  frame.addEventListener('load',attach);
  window.addEventListener('resize',schedule,{passive:true});
  const section=document.getElementById('solar-system-section');
  if(section){new MutationObserver(schedule).observe(section,{attributes:true,attributeFilter:['style','class','hidden']});}
  if(frame.contentDocument?.readyState==='complete')attach();
 })();
 