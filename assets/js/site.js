import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY} from './config.js';
const form=document.querySelector('#booking-form');document.querySelector('#year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));if(form){document.querySelector('#preferred_date').min=new Date().toLocaleDateString('en-CA');
form.addEventListener('submit',async e=>{e.preventDefault();const status=document.querySelector('#form-status'),btn=document.querySelector('#submit-btn');if(!form.reportValidity())return;if(!document.querySelector('#consent').checked)return;const data=Object.fromEntries(new FormData(form));if(!SUPABASE_URL.startsWith('https://')||SUPABASE_URL.includes('YOUR_PROJECT')){status.textContent='Online booking is not configured yet. Please call or WhatsApp our team.';return}btn.disabled=true;status.textContent='Sending request...';try{const r=await fetch(`${SUPABASE_URL}/functions/v1/submit-request`,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_PUBLISHABLE_KEY},body:JSON.stringify(data)});if(!r.ok)throw Error('Request failed');form.reset();status.textContent='Thank you. Your service request has been received. Our team will contact you.'}catch{status.textContent='We could not submit your request. Please try again or contact us by phone.'}finally{btn.disabled=false}});}


// Decorative motion is progressive enhancement. Content remains visible without JS.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const nav=document.querySelector('.navbar');
const links=[...document.querySelectorAll('.navbar .nav-link[href^="#"]')];
const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
function updateNavigation(){
  nav?.classList.toggle('is-scrolled',window.scrollY>12);
  let current='';
  for(const section of sections){if(section.getBoundingClientRect().top<=140)current=section.id;}
  for(const link of links){const active=link.getAttribute('href')==='#'+current;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
}
window.addEventListener('scroll',updateNavigation,{passive:true});
window.addEventListener('resize',updateNavigation,{passive:true});
updateNavigation();
if(!reducedMotion.matches && 'IntersectionObserver' in window){
  const targets=[...document.querySelectorAll('.hero .col-lg-6,.section-heading,.section .eyebrow,.section h2,.service-card,.gallery-photo,.section-photo,.booking-form,.vision')];
  targets.forEach((el,i)=>{el.dataset.reveal='';if(el.classList.contains('service-card'))el.style.setProperty('--reveal-delay',`${(i%3)*65}ms`);});
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}},{threshold:.08,rootMargin:'0px 0px 35px 0px'});
  targets.forEach(el=>observer.observe(el));
  document.documentElement.classList.add('motion-ready');
  // Ensure content remains readable when users return from browser history.
  requestAnimationFrame(()=>targets.filter(el=>el.getBoundingClientRect().top<window.innerHeight).forEach(el=>el.classList.add('is-visible')));
}
