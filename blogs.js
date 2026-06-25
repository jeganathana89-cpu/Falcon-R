  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

  function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
  function closeMenu()  { document.getElementById('mobileMenu').classList.remove('open'); }

  document.getElementById('hamburger').addEventListener('click', toggleMenu);
  document.addEventListener('click', e => {
    const m = document.getElementById('mobileMenu'), h = document.getElementById('hamburger');
    if (m.classList.contains('open') && !m.contains(e.target) && !h.contains(e.target)) closeMenu();
  });

  /* ---- Scroll reveal ---- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---- Category filter (visual only) ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---- Pagination (visual only) ---- */
  document.querySelectorAll('.pg-btn:not(.arrow)').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pg-btn:not(.arrow)').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });