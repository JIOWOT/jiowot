document.addEventListener('DOMContentLoaded', function(){
  // nav toggle (works for multiple toggles)
  document.querySelectorAll('.nav-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      const nav = document.querySelector('.nav');
      if(nav) nav.classList.toggle('open');
    });
  });

  // footer years
  const years = new Date().getFullYear();
  document.querySelectorAll('[id^="year"]').forEach(function(el){
    el.textContent = years;
  });

  // reveal on scroll
  const revealElems = document.querySelectorAll('.card, .solution, .timeline-item');
  const obs = new IntersectionObserver(entries=>{
    for(const e of entries){
      if(e.isIntersecting) e.target.classList.add('revealed');
    }
  },{threshold:0.08});
  revealElems.forEach(el=>obs.observe(el));
});
