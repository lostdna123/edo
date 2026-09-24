(function () {
  'use strict';

  // ---------------------------------------------------------------
  // Opening hours (Asia/Jakarta). One entry per weekday, Sunday = 0.
  // Each day is a list of [open, close] ranges, so a split shift like
  // [['10:00', '14:00'], ['17:00', '22:00']] also works.
  // ---------------------------------------------------------------
  var DAILY = [['10:00', '22:00']];
  var HOURS = [DAILY, DAILY, DAILY, DAILY, DAILY, DAILY, DAILY];

  // ---------------------------------------------------------------
  // Copy. English lives in the HTML; this swaps in Bahasa Indonesia.
  // ---------------------------------------------------------------
  var I18N = {
    id: {
      'skip': 'Langsung ke konten',
      'nav.broth': 'Kaldu Kami',
      'nav.menu': 'Menu',
      'nav.how': 'Cara Makan',
      'nav.visit': 'Lokasi',
      'hero.sub': 'Kaldu tulang babi yang direbus selama 24 jam, disajikan dengan nasi dan kimchi yang bisa di-refill sepuasnya. Spesialis gukbap Korea di Gading Serpong.',
      'hero.ctaMenu': 'Lihat menu',
      'hero.ctaVisit': 'Cari lokasi',
      'badge.broth': 'Kaldu 24 jam',
      'badge.refill': 'Free refill kimchi',
      'badge.halal': 'Non-halal · babi',
      'sticker.ring': 'SET GUKBAP MULAI ✺ SET GUKBAP MULAI ✺',
      'broth.kicker': 'Kaldu kami',
      'broth.title': 'Dua puluh empat jam.<br>Satu panci.',
      'broth.p1': 'Gukbap — 국밥, secara harfiah “nasi sup” — adalah makanan penghangat sehari-hari orang Korea. Kaldu kami dimulai dari tulang babi dan satu hari penuh di atas kompor. Api yang terus bergolak menarik semua sari dari tulang sampai kuahnya putih susu, lembut, dan gurih.',
      'broth.p2': 'Sengaja kami buat bersih. Kuahnya dibumbui ringan, seperti di Korea, supaya kamu bisa menyesuaikan rasanya sendiri di meja.',
      'broth.clock': 'direbus',
      'broth.start': 'Tulang masuk',
      'broth.end': 'Siap disajikan',
      'fact.hours': 'di atas kompor, setiap batch',
      'fact.kimchi': 'refill kimchi — gratis',
      'fact.price': 'harga set gukbap mulai dari',
      'uri.text': 'artinya <em>“kita.”</em> Panci kita, meja kita, semangkuk gukbap untuk tetangga — dan sekarang juga untukmu.',
      'menu.kicker': 'Menu',
      'menu.title': 'Menu singkat,<br>dibuat dengan benar.',
      'menu.lead': 'Set gukbap mulai <strong>Rp 70.000</strong>. Setiap meja dapat air putih dan refill kimchi gratis.',
      'menu.signature': 'Andalan',
      'menu.original': 'Dwaeji gukbap ala Busan: kaldu tulang babi 24 jam yang putih susu, irisan daging babi yang empuk dan daun bawang, dengan nasi di sampingnya. Sederhana, dan pas banget untuk malam hujan di Serpong.',
      'menu.hot': 'Pedas',
      'menu.spicy': 'Kaldu yang sama, dibuat lebih berani dengan cabai merah — pedasnya hangat dan nempel.',
      'menu.share': 'Untuk berbagi',
      'menu.bossam': 'Daging babi rebus yang empuk, diiris tebal, untuk dibungkus dengan kimchi. Ajak teman — atau habiskan sendiri.',
      'menu.must': 'Wajib coba',
      'menu.hotteok': 'Pancake jalanan Korea berisi gula merah yang meleleh, disajikan dengan satu scoop es krim dingin.',
      'menu.note': 'Menu dan harga dapat berubah — ikuti <a href="https://www.instagram.com/urigukbap/" target="_blank" rel="noopener">@urigukbap</a> untuk info terbaru.',
      'how.kicker': 'Cara makan gukbap',
      'how.title': 'Disempurnakan di meja.<br>Olehmu.',
      'how.lead': 'Di Korea, gukbap datang dengan bumbu ringan dan setiap orang meracik mangkuknya sendiri. Begini ritualnya.',
      'how.s1t': 'Cicipi dulu',
      'how.s1': 'Seruput kuahnya dulu tanpa tambahan apa pun. Rasanya memang lembut — itu titik awalmu.',
      'how.s2t': 'Bumbui sesukamu',
      'how.s2': 'Garam dan lada ada di setiap meja. Tambahkan sedikit demi sedikit sampai pas di lidahmu.',
      'how.s3t': 'Nasi masuk ke kuah',
      'how.s3': 'Tuang nasimu ke dalam mangkuk dan biarkan menyerap kuahnya. Itulah “bap” dalam gukbap.',
      'how.s4t': 'Kimchi di atasnya. Ulangi.',
      'how.s4': 'Taruh sepotong kimchi di setiap suapan. Habis? Refill gratis.',
      'visit.kicker': 'Lokasi',
      'visit.title': 'Datang dengan perut lapar.',
      'visit.where': 'Alamat',
      'visit.when': 'Jam buka',
      'visit.hours': 'Setiap hari · 10.00 – 22.00',
      'visit.soldout': 'Buka sampai habis. Kaldunya butuh satu hari penuh untuk dibuat — kalau panci hari ini sudah kosong, dapur kami tutup.',
      'visit.directions': 'Petunjuk arah',
      'visit.halal': '<strong>Non-halal.</strong> Kaldu dan daging kami menggunakan babi.',
      'footer.since': 'Melayani Gading Serpong sejak 14 Maret 2026.'
    }
  };

  var STATUS_TEXT = {
    en: {
      open: function (t) { return 'Open now · until ' + t; },
      later: function (t) { return 'Closed · opens at ' + t; },
      tomorrow: function (t) { return 'Closed · opens tomorrow ' + t; }
    },
    id: {
      open: function (t) { return 'Buka sekarang · sampai ' + t; },
      later: function (t) { return 'Tutup · buka pukul ' + t; },
      tomorrow: function (t) { return 'Tutup · buka besok ' + t; }
    }
  };

  var root = document.documentElement;
  root.classList.remove('no-js');

  // Remember the English originals so we can switch back.
  var translatable = document.querySelectorAll('[data-i18n]');
  translatable.forEach(function (el) { el.setAttribute('data-en', el.innerHTML); });

  var lang = 'en';

  function readStoredLang() {
    try { return localStorage.getItem('uri-lang'); } catch (e) { return null; }
  }
  function storeLang(value) {
    try { localStorage.setItem('uri-lang', value); } catch (e) { /* private mode */ }
  }

  function setLang(next) {
    lang = next === 'id' ? 'id' : 'en';
    root.setAttribute('lang', lang);
    translatable.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = lang === 'en' ? el.getAttribute('data-en') : I18N.id[key];
      if (text != null) el.innerHTML = text;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    updateStatus();
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.getAttribute('data-lang'));
      storeLang(lang);
    });
  });

  // ---------------------------------------------------------------
  // Open / closed, computed in Jakarta time regardless of visitor TZ.
  // ---------------------------------------------------------------
  function jakartaNow() {
    var parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return { day: days.indexOf(parts.weekday), minutes: (+parts.hour) * 60 + (+parts.minute) };
  }

  function toMinutes(hhmm) {
    var p = hhmm.split(':');
    return (+p[0]) * 60 + (+p[1]);
  }
  function pretty(hhmm) { return hhmm.replace(':', '.'); }

  function computeStatus() {
    var now = jakartaNow();
    var today = HOURS[now.day] || [];
    for (var i = 0; i < today.length; i++) {
      var o = toMinutes(today[i][0]);
      var c = toMinutes(today[i][1]);
      if (now.minutes >= o && now.minutes < c) return { open: true, kind: 'open', time: pretty(today[i][1]) };
      if (now.minutes < o) return { open: false, kind: 'later', time: pretty(today[i][0]) };
    }
    for (var d = 1; d <= 7; d++) {
      var next = HOURS[(now.day + d) % 7];
      if (next && next.length) return { open: false, kind: 'tomorrow', time: pretty(next[0][0]) };
    }
    return null;
  }

  var statusEls = document.querySelectorAll('[data-status]');
  function updateStatus() {
    var s;
    try { s = computeStatus(); } catch (e) { s = null; }
    if (!s) return; // keep the static fallback text
    statusEls.forEach(function (el) {
      el.classList.toggle('is-open', s.open);
      el.classList.toggle('is-closed', !s.open);
      el.querySelector('[data-status-text]').textContent = STATUS_TEXT[lang][s.kind](s.time);
    });
  }
  setInterval(updateStatus, 60 * 1000);

  // ---------------------------------------------------------------
  // Nav: solid background after scrolling, mobile menu.
  // ---------------------------------------------------------------
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
    updateClock();
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ---------------------------------------------------------------
  // Scroll reveal
  // ---------------------------------------------------------------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      // stagger siblings slightly
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------------------------------------------------------------
  // 24-hour broth clock: fills as you scroll through the section.
  // ---------------------------------------------------------------
  var clock = document.getElementById('clock');
  var fill = document.getElementById('clockFill');
  var num = document.getElementById('clockNum');
  var ticks = document.getElementById('clockTicks');
  var CIRC = 2 * Math.PI * 128;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  for (var h = 0; h < 24; h++) {
    var a = (h / 24) * Math.PI * 2 - Math.PI / 2;
    var major = h % 6 === 0;
    var r1 = major ? 100 : 106;
    var r2 = 114;
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 150 + Math.cos(a) * r1);
    line.setAttribute('y1', 150 + Math.sin(a) * r1);
    line.setAttribute('x2', 150 + Math.cos(a) * r2);
    line.setAttribute('y2', 150 + Math.sin(a) * r2);
    if (major) line.setAttribute('class', 'major');
    ticks.appendChild(line);
  }
  fill.style.strokeDasharray = CIRC;

  var lastHour = -1;
  function updateClock() {
    var progress;
    if (reduceMotion) {
      progress = 1;
    } else {
      var rect = clock.getBoundingClientRect();
      var vh = window.innerHeight;
      progress = (vh * 0.95 - rect.top) / (vh * 0.75);
      progress = Math.max(0, Math.min(1, progress));
    }
    fill.style.strokeDashoffset = CIRC * (1 - progress);
    var hour = Math.round(progress * 24);
    if (hour !== lastHour) {
      num.textContent = hour < 10 ? '0' + hour : String(hour);
      clock.classList.toggle('is-done', hour === 24);
      lastHour = hour;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateClock);

  // ---------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------
  var stored = readStoredLang();
  var browser = (navigator.language || '').toLowerCase();
  setLang(stored || (browser.indexOf('id') === 0 ? 'id' : 'en'));
  onScroll();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
