/* MIMPERIO - production client script. No external dependencies (Google Translate loads separately). */
(function () {
  'use strict';

  // Year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) toggle.addEventListener('click', function () { menu.classList.toggle('open'); });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up
  function animateCount(el) {
    var to = parseFloat(el.getAttribute('data-to'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (to * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + to.toFixed(dec) + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-to]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var a = item.querySelector('.faq-a');
      var open = item.classList.contains('open');
      item.classList.toggle('open');
      a.style.maxHeight = open ? null : a.scrollHeight + 'px';
    });
  });

  // Tabs
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('.tab');
    var panels = group.querySelectorAll('.tab-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        panels.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-panel') === key); });
      });
    });
  });

  // Language switcher dropdown open/close
  var lang = document.querySelector('.lang');
  var langBtn = document.querySelector('.lang-btn');
  if (lang && langBtn) {
    langBtn.addEventListener('click', function (e) { e.stopPropagation(); lang.classList.toggle('open'); });
    document.addEventListener('click', function () { lang.classList.remove('open'); });
  }

  // Interactive terminal
  var term = document.getElementById('term-log');
  if (term) {
    var lines = [
      ['c', '› streaming GeoInsight satellite layers ...'],
      ['e', '✓ ingestion pipeline online'],
      ['c', '› validating PolicyFlow orchestration ...'],
      ['e', '✓ provenance layer verified'],
      ['w', '~ Foresight AI recalibrating scenario weights'],
      ['e', '✓ differential privacy active']
    ];
    var i = 0;
    function pushLine() {
      var l = lines[i % lines.length];
      var p = document.createElement('div');
      p.className = l[0];
      p.textContent = l[1];
      term.appendChild(p);
      while (term.children.length > 6) term.removeChild(term.firstChild);
      i++;
    }
    pushLine(); pushLine();
    var termTimer = setInterval(pushLine, 2600);
    var btn = document.getElementById('term-run');
    if (btn) btn.addEventListener('click', function () {
      var p = document.createElement('div');
      p.className = 'e';
      var ms = (1 + Math.random() * 1.8).toFixed(1);
      p.textContent = '✓ [' + new Date().toLocaleTimeString() + '] telemetry ping ok · ' + ms + 'ms';
      term.appendChild(p);
      while (term.children.length > 6) term.removeChild(term.firstChild);
    });
  }

  // Contact form (endpoint-swappable, mailto fallback)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var endpoint = form.getAttribute('data-endpoint') || '';
      var data = new FormData(form);
      function done(msg) { if (status) { status.textContent = msg; status.style.display = 'block'; } form.reset(); }
      if (endpoint && endpoint.indexOf('http') === 0) {
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { done(r.ok ? 'Message sent. We will reply within two business days.' : 'Could not send just now. Please email hello@mimperio.tech.'); })
          .catch(function () { done('Could not send just now. Please email hello@mimperio.tech.'); });
      } else {
        var subject = encodeURIComponent('Project enquiry via mimperio.tech');
        var body = encodeURIComponent('Name: ' + (data.get('name') || '') + '\nEmail: ' + (data.get('email') || '') + '\nInterest: ' + (data.get('interest') || '') + '\n\n' + (data.get('message') || ''));
        window.location.href = 'mailto:hello@mimperio.tech?subject=' + subject + '&body=' + body;
        done('Opening your email client. If nothing happens, email hello@mimperio.tech.');
      }
    });
  }
})();

/* ---- Google Translate integration (loaded via translate.google.com element script) ---- */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'en,fr,rw,sw,am', autoDisplay: false },
    'google_translate_element'
  );
}
function miSetLang(lang, label) {
  var tries = 0;
  var t = setInterval(function () {
    var sel = document.querySelector('#google_translate_element select') || document.querySelector('select.goog-te-combo');
    tries++;
    if (sel) {
      sel.value = lang;
      sel.dispatchEvent(new Event('change'));
      clearInterval(t);
      var cur = document.getElementById('lang-current');
      if (cur && label) cur.textContent = label;
      document.querySelectorAll('.lang-menu button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
      var lw = document.querySelector('.lang');
      if (lw) lw.classList.remove('open');
    } else if (tries > 40) {
      clearInterval(t);
    }
  }, 150);
}
