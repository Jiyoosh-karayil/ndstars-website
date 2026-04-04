/* ND Stars Beauty Salon — main.js v2 */

document.addEventListener('DOMContentLoaded', () => {

  /* STICKY HEADER */
  const header = document.getElementById('header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* MOBILE BURGER */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      // No scroll locking — dropdown doesn't cover the page
    });
    nav.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
      });
    });
    // Close dropdown when clicking anywhere outside the header
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header')) {
        nav.classList.remove('open');
        burger.classList.remove('open');
      }
    });
  }

  /* REVEAL ON SCROLL */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        if (!e.target.style.transitionDelay) {
          const siblings = Array.from(e.target.parentElement?.children || [])
            .filter(el => el.classList.contains('reveal'));
          const idx = siblings.indexOf(e.target);
          if (idx > 0) e.target.style.transitionDelay = `${idx * 0.07}s`;
        }
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* TABS */
  const tabBtns     = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');

        const panel = document.getElementById(`tab-${id}`);
        if (panel) {
          panel.classList.add('active');
          panel.querySelectorAll('.reveal').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.05}s`;
            requestAnimationFrame(() => el.classList.add('visible'));
          });
        }

        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });

    // trigger first tab
    document.querySelectorAll('.tab-content.active .reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.05}s`;
      setTimeout(() => el.classList.add('visible'), 80);
    });
  }

  /* PRICE ROW ANIMATION */
  const priceObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.price-item').forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(-10px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = '';
          }, i * 22);
        });
        priceObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.price-list').forEach(l => priceObs.observe(l));

  /* SMOOTH ANCHOR */
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      const hash = href.slice(href.indexOf('#') + 1);
      const target = document.getElementById(hash);
      if (!target) return;
      if (!href.startsWith('#') && !href.startsWith(window.location.pathname + '#')) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
    });
  });

  /* STICKY BOOK BAR — slide up after 2s on mobile */
  const stickyBook = document.getElementById('stickyBook');
  if (stickyBook) {
    setTimeout(() => stickyBook.classList.add('visible'), 2000);
  }

  /* SERVICE CARD SUBTLE TILT */
  document.querySelectorAll('.service-card:not(.service-card--featured)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 3;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 3;
      card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

});
