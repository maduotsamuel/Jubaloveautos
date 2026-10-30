// Self-contained navigation: does not depend on Bootstrap JS or Supabase.
(() => {
  const button = document.querySelector('.navbar-toggler');
  const menu = document.getElementById('nav');
  const navbar = document.querySelector('.navbar');
  if (!button || !menu || !navbar) return;
  const mobile = () => window.matchMedia('(max-width: 991.98px)').matches;
  const setOpen = (open) => {
    menu.classList.toggle('show', open);
    button.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  button.addEventListener('click', () => {
    if (mobile()) setOpen(!menu.classList.contains('show'));
  });
  menu.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', () => {
    if (mobile()) setOpen(false);
  }));
  document.addEventListener('click', event => {
    if (mobile() && !navbar.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('show')) {
      setOpen(false);
      button.focus();
    }
  });
  window.addEventListener('resize', () => setOpen(false), {passive:true});
  setOpen(false);
})();
