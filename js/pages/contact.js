/* contact: page-specific behaviour (owned by the contact page builder). */
(function () {
  'use strict';
  /* Booking date: never in the past (validation.js also sets min; this covers the first paint). */
  var date = document.getElementById('bk-date');
  if (date) {
    var d = new Date();
    var iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    if (!date.min) date.min = iso;
  }
  /* After a successful booking, move focus to the confirmation so it is announced and visible. */
  var form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('form:success', function () {
      var ok = form.querySelector('[data-form-success]');
      if (ok) { ok.setAttribute('tabindex', '-1'); ok.focus({ preventScroll: true }); ok.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    });
  }
})();
