(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), 350);
  });

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('site-header');
  const toTop = document.getElementById('to-top');
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header && header.classList.toggle('scrolled', scrolled);
    toTop && toTop.classList.toggle('visible', window.scrollY > 500);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop && toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(() => el.classList.add('in-view'), (i % 6) * 70);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Stat counters ---------- */
  const stats = document.querySelectorAll('.stat-num');
  const animateStat = (el) => {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  if (stats.length) {
    if ('IntersectionObserver' in window) {
      const statIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      stats.forEach(el => statIo.observe(el));
    } else {
      stats.forEach(animateStat);
    }
  }

  /* ---------- Embers canvas ---------- */
  const canvas = document.getElementById('embers');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, dpr;

    const colors = ['255,94,58', '255,183,3', '255,46,99'];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: h + Math.random() * 100,
        r: (Math.random() * 2 + 0.6) * dpr,
        speed: (Math.random() * 0.6 + 0.25) * dpr,
        drift: (Math.random() - 0.5) * 0.4 * dpr,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.25,
        flicker: Math.random() * 0.02 + 0.005,
        life: 0,
      };
    }

    const COUNT = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 26000));

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => {
        const p = makeParticle();
        p.y = Math.random() * h;
        return p;
      });
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(p.life) * p.drift;
        p.life += p.flicker * 10;

        if (p.y < -20) Object.assign(p, makeParticle(), { y: h + 10 });

        const flicker = 0.6 + Math.sin(p.life) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * flicker})`;
        ctx.fill();
      });
      requestAnimationFrame(frame);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    init();
    requestAnimationFrame(frame);
  } else if (canvas) {
    canvas.style.display = 'none';
  }

})();
