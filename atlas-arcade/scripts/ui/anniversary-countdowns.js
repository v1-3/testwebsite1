
(function(){
  'use strict';
  // Calendar dates use the visitor's local timezone, just like the reunion timer.
  function getAnniversaryCountdown(month, day, now = new Date()) {
    const year = now.getFullYear();
    const start = new Date(year, month - 1, day);
    const end = new Date(year, month - 1, day + 1);
    const isToday = now >= start && now < end;
    const target = now < start || isToday ? start : new Date(year + 1, month - 1, day);
    const totalSeconds = isToday ? 0 : Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 1000));
    return {
      isToday,target,
      days:Math.floor(totalSeconds / 86400),
      hours:Math.floor(totalSeconds / 3600) % 24,
      minutes:Math.floor(totalSeconds / 60) % 60,
      seconds:totalSeconds % 60
    };
  }
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {day:'numeric',month:'long',year:'numeric'});
  const countdowns = [
    {id:'anniv',month:9,day:13},
    {id:'victor',month:4,day:17},
    {id:'julia',month:1,day:27}
  ].map(event => {
    const prefix = 'sub-' + event.id;
    return {
      ...event,
      card:document.querySelector('[data-anniversary="' + event.id + '"]'),
      date:document.getElementById(prefix + '-date'),
      status:document.getElementById(prefix + '-status'),
      timer:document.getElementById(prefix + '-timer'),
      celebration:document.getElementById(prefix + '-celebration'),
      label:document.getElementById(prefix + '-day-label'),
      values:Object.fromEntries(['days','hours','minutes','secs'].map(unit => [unit,document.getElementById(prefix + '-' + unit)]))
    };
  }).filter(event => event.card && event.timer && event.date);
  function setText(element, value) {
    if(element && element.textContent !== value) element.textContent = value;
  }
  function updateAnniversaries() {
    const now = new Date();
    for(const event of countdowns) {
      const data = getAnniversaryCountdown(event.month,event.day,now);
      const today = String(data.isToday);
      if(event.card.dataset.today !== today) event.card.dataset.today = today;
      event.timer.hidden = data.isToday;
      event.celebration.hidden = !data.isToday;
      setText(event.status,data.isToday ? 'Hoje é dia de celebrar' : 'Próxima comemoração');
      setText(event.date,dateFormatter.format(data.target));
      const dateValue = [data.target.getFullYear(),String(event.month).padStart(2,'0'),String(event.day).padStart(2,'0')].join('-');
      if(event.date.dateTime !== dateValue) event.date.dateTime = dateValue;
      setText(event.values.days,String(data.days));
      setText(event.label,data.days === 1 ? 'dia' : 'dias');
      setText(event.values.hours,String(data.hours).padStart(2,'0'));
      setText(event.values.minutes,String(data.minutes).padStart(2,'0'));
      setText(event.values.secs,String(data.seconds).padStart(2,'0'));
    }
  }
  updateAnniversaries();
  setInterval(updateAnniversaries,1000);
  document.addEventListener('visibilitychange',() => {if(!document.hidden) updateAnniversaries();});
})();

