(() => {
  'use strict';
  const root = document.querySelector('[data-carousel]');
  if (!root) return;
  const slides = [...root.querySelectorAll('.showcase-slide')];
  const dots = [...root.querySelectorAll('[data-slide]')];
  const current = root.querySelector('[data-current]');
  const pause = root.querySelector('[data-pause]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, paused = false, touchX = null;
  function stop() { if (timer !== null) { clearInterval(timer); timer = null; } }
  function start() { stop(); if (!paused && !reduceMotion.matches && !document.hidden) timer = setInterval(() => show(index + 1), 6500); }
  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { const active = i === index; slide.classList.toggle('is-current', active); slide.setAttribute('aria-hidden', String(!active)); if (active) slide.removeAttribute('inert'); else slide.setAttribute('inert', ''); });
    dots.forEach((dot, i) => { dot.classList.toggle('is-current', i === index); if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
    current.textContent = String(index + 1).padStart(2, '0');
  }
  root.querySelector('[data-next]').addEventListener('click', () => { show(index + 1); start(); });
  root.querySelector('[data-prev]').addEventListener('click', () => { show(index - 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  pause.addEventListener('click', () => { paused = !paused; pause.setAttribute('aria-pressed', String(paused)); pause.setAttribute('aria-label', paused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'); pause.textContent = paused ? '▶' : 'Ⅱ'; start(); });
  root.addEventListener('keydown', e => { if (e.target.closest('a, button') && !['ArrowLeft','ArrowRight'].includes(e.key)) return; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show(index + (e.key === 'ArrowRight' ? 1 : -1)); start(); } });
  root.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, {passive:true});
  root.addEventListener('touchend', e => { if (touchX === null) return; const delta = e.changedTouches[0].screenX - touchX; touchX = null; if (Math.abs(delta) > 55) { show(index + (delta < 0 ? 1 : -1)); start(); } }, {passive:true});
  root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop); root.addEventListener('focusout', e => { if (!root.contains(e.relatedTarget)) start(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  reduceMotion.addEventListener?.('change', start);
  show(0); start();
})();
