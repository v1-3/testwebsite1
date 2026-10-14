
(function(){
  const progressValue = document.querySelector('#progress-percentage b');
  function updateFlight(){
    const launch = new Date('2024-06-01T00:00:00');
    const target = new Date('2028-01-27T00:00:00');
    const now = new Date();
    const total = Math.max(1, target - launch);
    const done = Math.min(Math.max(now - launch, 0), total);
    const ratio = done / total;
    const arcDone = document.getElementById('pj-arcDone');
    const planeG = document.getElementById('pj-planeG');
    const bar = document.getElementById('progress-bar');
    if(arcDone){
      const pathLen = arcDone.getTotalLength ? arcDone.getTotalLength() : 1000;
      arcDone.style.strokeDasharray = `${(pathLen*ratio).toFixed(1)} ${Math.max(pathLen-(pathLen*ratio),0).toFixed(1)}`;
      if(planeG && arcDone.getPointAtLength){
        const p = arcDone.getPointAtLength(pathLen * ratio);
        const p2 = arcDone.getPointAtLength(Math.min(pathLen * ratio + 0.1, pathLen));
        const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
        planeG.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);
      }
    }
    if(progressValue){
      const percentage = `${(ratio*100).toFixed(1).replace('.',',')}%`;
      if(progressValue.textContent !== percentage) progressValue.textContent = percentage;
    }
    if(bar){ bar.style.width = `${ratio*100}%`; }
    const days = Math.max(0, Math.ceil((target - now)/(1000*60*60*24)));
    const stub = document.getElementById('stubDays');
    if(stub){ stub.textContent = `${days} ${days === 1 ? 'dia' : 'dias'}`; }
  }
  function setupSpotify(){
    const btn = document.getElementById('pj-spotify-toggle');
    const frame = document.getElementById('spotify-iframe');
    const wrap = document.getElementById('pj-spotify-wrap');
    if(!btn || !wrap || !frame) return;
    btn.addEventListener('click', () => {
      wrap.classList.toggle('pj-hidden');
      const hidden = wrap.classList.contains('pj-hidden');
      btn.innerHTML = hidden ? '<i class="fa-solid fa-music" aria-hidden="true"></i> Tocar a playlist aqui' : '<i class="fa-solid fa-music" aria-hidden="true"></i> Ocultar playlist';
    });
  }
  function init(){ updateFlight(); setupSpotify(); setInterval(updateFlight, 1000); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
