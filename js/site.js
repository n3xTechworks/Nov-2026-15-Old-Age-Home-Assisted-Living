/* Thymewood Garden Residence: shared behaviour for every page.
   Theme + direction (persisted; first applied by the inline <head> script), Home dropdown,
   mobile menu, header-height sync for anchor offsets, footer year, opt-in reveal. */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY_THEME = 'tw-theme';
  var KEY_DIR = 'tw-dir';
  root.classList.add('js');

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }

  function syncLabels() {
    var dark = root.getAttribute('data-theme') === 'dark';
    var rtl = root.getAttribute('dir') === 'rtl';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      b.setAttribute('aria-pressed', String(dark));
      b.title = dark ? 'Light theme' : 'Dark theme';
    });
    document.querySelectorAll('[data-dir-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', rtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
      b.setAttribute('aria-pressed', String(rtl));
      b.title = rtl ? 'Left-to-right layout' : 'Right-to-left layout';
    });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle], [data-dir-toggle]');
    if (!t) return;
    if (t.hasAttribute('data-theme-toggle')) {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store(KEY_THEME, next);
    } else {
      var dir = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      root.setAttribute('dir', dir);
      store(KEY_DIR, dir);
    }
    syncLabels();
  });
  syncLabels();

  /* ---- Home dropdown: click / keyboard, hover on fine pointers ---- */
  document.querySelectorAll('.has-sub').forEach(function (li) {
    var btn = li.querySelector('[aria-controls]');
    if (!btn) return;
    function set(open) { li.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); }
    btn.addEventListener('click', function () { set(!li.classList.contains('open')); });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      li.addEventListener('mouseenter', function () { set(true); });
      li.addEventListener('mouseleave', function () { set(false); });
    }
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) set(false); });
    document.addEventListener('click', function (e) { if (!li.contains(e.target)) set(false); });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && li.classList.contains('open')) { set(false); btn.focus(); }
      if (e.key === 'ArrowDown' && e.target === btn) { e.preventDefault(); set(true); var a = li.querySelector('.submenu a'); if (a) a.focus(); }
    });
  });

  /* ---- Mobile menu (nav links only; controls stay in the header bar) ---- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var panel = document.querySelector('[data-mobile-menu]');
  var header = document.getElementById('siteHeader');
  function setMenu(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    panel.hidden = !open;
  }
  if (toggle && panel) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    var mq = window.matchMedia('(min-width: 1024px)');
    var onMq = function (m) { if (m.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);
  }

  /* ---- Keep anchor offsets right: --header-h follows the real header height ---- */
  function syncHeader() {
    if (!header) return;
    root.style.setProperty('--header-h', Math.round(header.getBoundingClientRect().height) + 'px');
  }
  syncHeader();
  window.addEventListener('resize', syncHeader);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeader);

  /* Same-page anchor links: smooth scroll with the header offset (CSS scroll-padding does the offset) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var target = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', a.getAttribute('href'));
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
  /* Arriving from another page with a hash: re-align once fonts/images have settled */
  if (location.hash) {
    window.addEventListener('load', function () {
      var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) { syncHeader(); t.scrollIntoView({ block: 'start' }); }
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---- Motion (calm, transform + opacity only) ----
     Runs only when the inline <head> script added html.motion (no reduced-motion, not an automated browser).
     Elements are hidden ONLY after this script marks them, so nothing stays hidden if JS fails. */
  var MOTION = root.classList.contains('motion') && 'IntersectionObserver' in window;
  if (MOTION) {
    var STAGGER_PARENTS = '.cards, .testimonials, .gallery, .faq-list, .timeline, .values, .team, .stats-grid, .contact-cards, .feature-list, .blog-grid, .info-cards';
    var SINGLE = 'main section:not(.hero):not(.page-hero) .intro, main .split-media, main .split-body, main .section-actions, main .form-card, main .map-card, main .cta-band > *, main .featured, main .legal-body';
    var marked = [];
    function mark(el, delay) {
      if (el.hasAttribute('data-reveal') || el.closest('.hero, .page-hero, dialog')) return;
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--rd', delay + 'ms');
      marked.push(el);
    }
    document.querySelectorAll(STAGGER_PARENTS).forEach(function (p) {
      if (p.closest('.hero, .page-hero, dialog')) return;
      [].slice.call(p.children).forEach(function (c, i) { mark(c, Math.min(i, 5) * 90); });
    });
    document.querySelectorAll(SINGLE).forEach(function (el) { mark(el, 0); });
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        rio.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    marked.forEach(function (el) { rio.observe(el); });
    /* Safety net: reveal everything after 4s whatever happens (e.g. printing, odd scroll containers) */
    setTimeout(function () { marked.forEach(function (el) { el.classList.add('is-in'); }); }, 4000);

    /* Count-up for numeric stats (final text is restored exactly) */
    var counters = [].slice.call(document.querySelectorAll('.stats strong, .home2-stats strong, [data-count]')).filter(function (el) {
      return /^\s*\d/.test(el.textContent) && el.textContent.indexOf('/7') === -1;
    });
    function countUp(el) {
      var final = el.textContent;
      var m = final.match(/^(\s*)(\d+(?:\.\d+)?)(.*)$/s);
      if (!m || final.indexOf('24/7') > -1) return;
      var target = parseFloat(m[2]); var dec = (m[2].split('.')[1] || '').length;
      var t0 = null, dur = 1400;
      el.style.fontVariantNumeric = 'tabular-nums';
      function step(ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min(1, (ts - t0) / dur); var e = 1 - Math.pow(1 - k, 3);
        el.textContent = m[1] + (target * e).toFixed(dec) + m[3];
        if (k < 1) requestAnimationFrame(step); else el.textContent = final;
      }
      requestAnimationFrame(step);
    }
    if (counters.length) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---- FAQ accordion: the card smoothly grows/shrinks to fit the answer; one open question per group ----
     Without motion the native <details name=""> behaviour is left untouched. */
  var faqItems = document.querySelectorAll('details.faq-item');
  if (MOTION && faqItems.length && 'animate' in Element.prototype) {
    var FAQ_EASE = 'cubic-bezier(.22, .61, .36, 1)';
    faqItems.forEach(function (d) {
      /* native name="" grouping closes the sibling instantly; take it over so the sibling slides shut too */
      var g = d.getAttribute('name');
      if (g) { d.setAttribute('data-faq-group', g); d.removeAttribute('name'); }
    });
    var faqRun = function (d, open) {
      var sum = d.querySelector('summary');
      var body = d.querySelector('.faq-answer');
      var from = d.offsetHeight;                       /* measured before cancelling, so a reversal starts where it is */
      if (d._faqAnim) { d._faqAnim.cancel(); d._faqAnim = null; }
      if (d._faqBody) { d._faqBody.cancel(); d._faqBody = null; }
      var border = d.offsetHeight - d.clientHeight;
      d.classList.toggle('is-closing', !open);
      d.style.overflow = 'hidden';
      if (open) d.open = true;
      var to = open ? d.offsetHeight : sum.offsetHeight + border;
      var dur = Math.min(460, Math.max(260, Math.abs(to - from) * 1.6));
      var a = d.animate({ height: [from + 'px', to + 'px'] }, { duration: dur, easing: FAQ_EASE });
      if (body) {
        d._faqBody = body.animate(
          open ? { opacity: [0, 1], transform: ['translateY(-8px)', 'none'] } : { opacity: [1, 0], transform: ['none', 'translateY(-8px)'] },
          { duration: open ? dur : dur * 0.7, easing: FAQ_EASE, fill: 'forwards' });
      }
      d._faqAnim = a;
      a.onfinish = function () {
        if (d._faqAnim !== a) return;
        d._faqAnim = null;
        if (d._faqBody) { d._faqBody.cancel(); d._faqBody = null; }
        if (!open) { d.open = false; d.classList.remove('is-closing'); }
        d.style.overflow = '';
      };
    };
    document.addEventListener('click', function (e) {
      var sum = e.target.closest('details.faq-item > summary');
      if (!sum) return;
      e.preventDefault();
      var d = sum.parentElement;
      var opening = !d.open || d.classList.contains('is-closing');
      var g = d.getAttribute('data-faq-group');
      if (opening && g) {
        document.querySelectorAll('details.faq-item[data-faq-group="' + g + '"]').forEach(function (o) {
          if (o !== d && o.open && !o.classList.contains('is-closing')) faqRun(o, false);
        });
      }
      faqRun(d, opening);
    });
  }
  root.motionClose = function (dlg) {
    if (!MOTION || !dlg.open || dlg.classList.contains('is-closing')) { if (dlg.open && !dlg.classList.contains('is-closing')) dlg.close(); return; }
    dlg.classList.add('is-closing');
    var fin = function () { if (!dlg.classList.contains('is-closing')) return; dlg.classList.remove('is-closing'); dlg.close(); };
    dlg.addEventListener('animationend', fin, { once: true });
    setTimeout(fin, 400);
  };
})();
