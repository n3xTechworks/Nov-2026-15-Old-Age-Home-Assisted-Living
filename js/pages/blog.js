/* blog: page-specific behaviour (owned by the blog page builder).
   "Read article" opens an accessible <dialog> with the full text and the SAME author as the card.
   Deep links: blog.html#post-N opens that article. */
(function () {
  'use strict';

  /* Topic chips: filter the article grid by category badge */
  var chips = [].slice.call(document.querySelectorAll('.chips [data-filter]'));
  var status = document.querySelector('[data-filter-status]');
  var gridCards = [].slice.call(document.querySelectorAll('.blog-grid .blog-card'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter'); var shown = 0;
      var grid = document.querySelector('.blog-grid');
      if (grid) { grid.classList.remove('is-filtered'); void grid.offsetWidth; grid.classList.add('is-filtered'); }
      gridCards.forEach(function (c) { c.classList.add('is-in'); });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      gridCards.forEach(function (card) {
        var badge = card.querySelector('.badge');
        var match = f === 'all' || (badge && badge.textContent.trim() === f);
        card.hidden = !match; if (match) shown++;
      });
      if (status) status.textContent = f === 'all' ? 'Showing all ' + shown + ' articles' : 'Showing ' + shown + ' article' + (shown === 1 ? '' : 's') + ' about ' + f.toLowerCase();
    });
  });
})();

(function () {
  'use strict';

  var dialog = document.getElementById('post-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var slot = function (name) { return dialog.querySelector('[data-slot="' + name + '"]'); };
  var kicker = slot('kicker'), title = slot('title'), author = slot('author'), body = slot('body'), cover = slot('cover');
  var lastTrigger = null;
  var POST_RE = /^#post-[1-7]$/;

  function openPost(id, trigger) {
    var card = document.getElementById(id);
    var tpl = document.getElementById(id + '-full');
    if (!card || !tpl) return false;

    var k = card.querySelector('.card-kicker');
    kicker.replaceChildren.apply(kicker, k ? [].slice.call(k.children).map(function (n) { return n.cloneNode(true); }) : []);
    title.textContent = (card.querySelector('.card-title, .featured-title') || {}).textContent || '';
    var img = card.querySelector('img.blog-cover');
    if (cover) {
      if (img) {
        var c = img.cloneNode(true);
        c.removeAttribute('loading'); c.classList.remove('blog-cover'); c.classList.add('post-cover-img');
        c.setAttribute('sizes', '(min-width: 800px) 760px, 100vw');
        cover.replaceChildren(c);
      } else cover.replaceChildren();
      cover.hidden = !img;
    }
    var a = card.querySelector('.author');
    author.replaceChildren(a ? a.cloneNode(true) : document.createTextNode(''));
    body.replaceChildren(tpl.content.cloneNode(true));

    lastTrigger = trigger || card.querySelector('[data-open-post]');
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    return true;
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open-post]');
    if (!t) return;
    e.preventDefault();
    openPost(t.getAttribute('data-open-post'), t);
  });

  /* Animated close (fade/slide out) when motion is on; plain close otherwise */
  function closePost() {
    var r = document.documentElement;
    if (typeof r.motionClose === 'function') r.motionClose(dialog); else dialog.close();
  }
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.closest('[data-close-dialog]')) { e.preventDefault(); closePost(); }
  });
  dialog.addEventListener('cancel', function (e) { e.preventDefault(); closePost(); });

  dialog.addEventListener('close', function () {
    document.body.classList.remove('dialog-open');
    if (POST_RE.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
    if (lastTrigger) {
      var card = lastTrigger.closest('.blog-card');
      if (card) card.scrollIntoView({ block: 'nearest' });
      lastTrigger.focus({ preventScroll: true });
    }
  });

  function fromHash() {
    if (POST_RE.test(location.hash)) openPost(location.hash.slice(1));
  }
  window.addEventListener('hashchange', fromHash);
  if (POST_RE.test(location.hash)) {
    if (document.readyState === 'complete') setTimeout(fromHash, 150);
    else window.addEventListener('load', function () { setTimeout(fromHash, 150); });
  }
})();
