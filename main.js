/* ============================================
   XWING VENTURES — Main JS
   ============================================ */

(function () {
  'use strict';

  /* -- Nav scroll state -- */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -- Active link highlight -- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* -- Mobile nav toggle -- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* -- Intersection observer: fade-in elements -- */
  const observed = document.querySelectorAll(
    '.card, .tech-tile, .problem-item, .approach-step, .stat-item'
  );
  if ('IntersectionObserver' in window && observed.length) {
    observed.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    observed.forEach(el => io.observe(el));
  }

  /* -- Apply form submission (static) -- */
  const form = document.getElementById('applyForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      btn.textContent = 'Submitted — We\'ll be in touch';
      btn.disabled = true;
      btn.style.background = '#2e2e2e';
      btn.style.borderColor = '#2e2e2e';
      btn.style.color = '#888';
      btn.style.cursor = 'default';
    });
  }
})();
