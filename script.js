(function () {
  'use strict';

  // Scroll-reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Nav turns dark over dark sections
  var nav = document.getElementById('nav');
  var darkSections = document.querySelectorAll('.stats, .section--dark');
  function updateNav() {
    var y = 24; // just under the nav bar
    var overDark = Array.prototype.some.call(darkSections, function (s) {
      var r = s.getBoundingClientRect();
      return r.top <= y && r.bottom >= y;
    });
    nav.classList.toggle('is-dark', overDark);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form: validate, then open the user's mail client
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (input) {
      var ok = input.value.trim() !== '' && (input.type !== 'email' || /\S+@\S+\.\S+/.test(input.value));
      input.parentElement.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      note.textContent = 'Please fill in the highlighted fields.';
      return;
    }
    var d = new FormData(form);
    var subject = 'Inquiry from ' + d.get('name') + (d.get('company') ? ' (' + d.get('company') + ')' : '');
    var body = d.get('message') + '\n\n— ' + d.get('name') + '\n' + d.get('email');
    window.location.href = 'mailto:info@indocomniaga.co.id?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Opening your email app…';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
