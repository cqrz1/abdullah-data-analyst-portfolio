const loader=document.getElementById('loader');
const progress=document.getElementById('scrollProgress');
const navToggle=document.getElementById('navToggle');
const navLinks=document.getElementById('navLinks');
const year=document.getElementById('year');
const filters=document.querySelectorAll('.filter');
const cards=document.querySelectorAll('.project-card');
const emptyState=document.getElementById('emptyState');

year.textContent=new Date().getFullYear();
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),350));
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=max>0?`${window.scrollY/max*100}%`:'0%';
},{passive:true});

navToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded',String(open));
  navToggle.textContent=open?'Close':'Menu';
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.textContent='Menu';
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  button.classList.add('active');
  const filter=button.dataset.filter;
  let shown=0;
  cards.forEach(card=>{
    const match=filter==='all'||card.dataset.category.split(' ').includes(filter);
    card.classList.toggle('hidden',!match);
    if(match) shown++;
  });
  emptyState.classList.toggle('show',shown===0);
}));
