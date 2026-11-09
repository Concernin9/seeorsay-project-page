/* SeeOrSay project page: language toggle, character-art hero, videos, decoding demo, gallery, lightbox. No dependencies. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var LANG = 'en';

  /* ---------------- language ---------------- */
  function setLang(l) {
    LANG = l;
    $$('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = l === 'zh' ? el.dataset.zh : el.dataset.en;
    });
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    $('#lang').textContent = l === 'zh' ? 'EN' : '中文';
    try { localStorage.setItem('sos-lang', l); } catch (e) {}
    if (window.__demoRefresh) window.__demoRefresh();
  }
  $('#lang').addEventListener('click', function () { setLang(LANG === 'zh' ? 'en' : 'zh'); });
  try { if (localStorage.getItem('sos-lang') === 'zh') setLang('zh'); } catch (e) {}
  function T(en, zh) { return LANG === 'zh' ? zh : en; }

  /* ---------------- nav + reveal ---------------- */
  var nav = $('#nav');
  window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });
  if ('IntersectionObserver' in window && !reduce) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { ro.observe(el); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------------- lightbox ---------------- */
  var lb = $('#lb');
  function openLB(html) { lb.innerHTML = html; lb.classList.add('on'); document.body.style.overflow = 'hidden'; }
  function closeLB() { lb.classList.remove('on'); lb.innerHTML = ''; document.body.style.overflow = ''; }
  lb.addEventListener('click', closeLB);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });
  $$('.fig img').forEach(function (img) { img.addEventListener('click', function () { openLB('<img src="' + img.getAttribute('src') + '" alt="">'); }); });

  /* ---------------- gallery tabs ---------------- */
  $$('#gtabs .tab').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('#gtabs .tab').forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('.gpane').forEach(function (p) { p.classList.toggle('on', p.id === b.dataset.g); });
    });
  });

  /* ---------------- videos ---------------- */
  var VIDS = [
    ['q1_08', 'k-ans', ['Answer · identification · day snow', '回答 · 识别 · 白天雪'], ['Which numbered pickup is blue? SeeOrSay answers and tracks it over five frames.', '哪辆编号皮卡是蓝色的？SeeOrSay 回答，并在 5 帧里跟住它。']],
    ['m8_1_06', 'k-dec', ['Decline · target absent · night snow', '拒答 · 目标消失 · 夜间雪'], ['The van has left the view: the verifier overrules the draft and declines.', '面包车已经离开画面：验证器否决草稿，选择拒答。']],
    ['c3_01', 'k-rev', ['Revise · existence · day snow', '修正 · 存在 · 白天雪'], ['The draft “no” contradicts the cited snowplow and is revised to “yes”.', '草稿“no”与引用的扫雪车矛盾，被改成“yes”。']],
    ['c3_04', 'k-rev', ['Revise · occluder · day snow', '修正 · 遮挡物 · 白天雪'], ['The draft “ego pillar” contradicts its own evidence and is revised to “wiper”.', '草稿“A 柱”与自己的证据矛盾，被改成“雨刮”。']],
    ['c6_02', 'k-dec', ['Decline · ambiguous · night snow', '拒答 · 有歧义 · 夜间雪'], ['Two white SUVs match: SeeOrSay cites both and declines instead of guessing.', '两辆白色 SUV 都符合：SeeOrSay 把两辆都框出来，选择拒答而不是猜。']],
    ['c2_03', 'k-ans', ['Answer · counting · rain–snow', '回答 · 计数 · 雨夹雪'], ['Counts all four SUVs at t = 2, including the partly hidden ones.', '数出 t = 2 的全部 4 辆 SUV，包括被部分遮挡的。']],
    ['c4_01', 'k-ans', ['Answer · last visible frame · fog', '回答 · 最后可见帧 · 雾'], ['Finds the last sliver of the SUV at t = 5 and writes none for t = 6.', '找到 t = 5 时只剩一条边的 SUV，并在 t = 6 写 none。']],
    ['c7_07', 'k-dec', ['Decline · target absent · day snow', '拒答 · 目标消失 · 白天雪'], ['The Jeep has left by t = 6: its evidence ends at t = 5, and SeeOrSay declines.', '吉普车在 t = 6 已经驶离：证据止于 t = 5，SeeOrSay 拒答。']]
  ];
  var vg = $('#vgrid');
  VIDS.forEach(function (v) {
    var c = document.createElement('div'); c.className = 'vcard rv';
    c.innerHTML = '<video muted loop playsinline preload="none" poster="static/videos/' + v[0] + '.jpg"><source src="static/videos/' + v[0] + '.mp4" type="video/mp4"></video>' +
      '<div class="meta"><div class="kind ' + v[1] + '" data-i18n data-zh="' + esc(v[2][1]) + '">' + esc(v[2][0]) + '</div>' +
      '<div class="ttl" data-i18n data-zh="' + esc(v[3][1]) + '">' + esc(v[3][0]) + '</div></div>';
    vg.appendChild(c);
    var vid = $('video', c);
    vid.addEventListener('click', function () {
      openLB('<video src="static/videos/' + v[0] + '.mp4" autoplay loop muted playsinline controls></video>');
      var big = $('video', lb); if (big) big.addEventListener('click', function (e) { e.stopPropagation(); });
    });
  });
  if (LANG === 'zh') setLang('zh');
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && e.intersectionRatio > 0.35 && !reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: [0, 0.35, 0.6] });
    $$('#vgrid video').forEach(function (v) { vo.observe(v); });
  }
  if ('IntersectionObserver' in window && !reduce) {
    var ro2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro2.unobserve(e.target); } }); });
    $$('#vgrid .rv').forEach(function (el) { ro2.observe(el); });
  } else { $$('#vgrid .rv').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------------- hero: wall of real clips ---------------- */
  (function wall() {
    var w = $('#wall'); if (!w) return;
    var rev = parseFloat(w.dataset.reveal || '2.6');
    $$('.tile', w).forEach(function (t, i) {
      var v = $('video', t);
      var off = function () { try { if (v.duration) v.currentTime = (i * 0.7) % v.duration; } catch (e) {} };   /* stagger the loops */
      if (v.readyState >= 1) off(); else v.addEventListener('loadedmetadata', off, { once: true });
      v.addEventListener('timeupdate', function () { t.classList.toggle('revealed', v.currentTime >= rev - 0.05); });
      if (reduce) { v.removeAttribute('autoplay'); v.pause(); t.classList.add('revealed'); }
    });
    if ('IntersectionObserver' in window && !reduce) {
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (e) { var v = $('video', e.target); if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
      }, { threshold: 0.15 });
      $$('.tile', w).forEach(function (t) { o.observe(t); });
    }
  })();

  /* ---------------- decoding demo ---------------- */
  (function demo() {
    var D = window.SOS_DEMO; if (!D || !D.length) return;
    var tabs = $('#dtabs'), q = $('#dq'), main = $('#dmain'), tl = $('#dtl'), th = $('#dthumbs'), con = $('#dcon'), dec = $('#ddec'), note = $('#dnote');
    var LBL = { 'Answer': '回答', 'Ambiguous': '有歧义', 'Revise': '修正', 'Not visible': '看不见' };
    var NOTE = {
      'Q1_08': '草稿与证据一致：SeeOrSay 直接回答。', 'C6_02': '两个候选都符合问题：SeeOrSay 拒答。',
      'C3_01': '草稿与引用的证据矛盾：SeeOrSay 修正答案。', 'M8_1_06': '目标已经离开画面：SeeOrSay 拒答。'
    };
    var cur = 0, timers = [], userTouched = false, started = false;
    var host = main.parentNode;
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function boxDiv(b, cls) {
      var d = document.createElement('div'); d.className = 'bx ' + (cls || '');
      d.style.cssText = 'position:absolute;left:' + b[0] + '%;top:' + b[1] + '%;width:' + (b[2] - b[0]) + '%;height:' + (b[3] - b[1]) + '%;' +
        'border:2px solid #C47A3D;background:rgba(240,169,107,.20);border-radius:3px;opacity:0;transition:opacity .25s, box-shadow .45s;box-shadow:0 0 0 6px rgba(240,169,107,.45)';
      return d;
    }
    function renderTabs() {
      tabs.innerHTML = '';
      D.forEach(function (d, i) {
        var b = document.createElement('button'); b.className = 'tab' + (i === cur ? ' on' : '');
        b.textContent = LANG === 'zh' ? LBL[d.label] : d.label;
        b.addEventListener('click', function () { userTouched = true; cur = i; load(); });
        tabs.appendChild(b);
      });
    }
    function load() {
      clear(); renderTabs();
      var d = D[cur];
      var gold = d.gold === 'not visible' ? T('not visible', '看不见') + (d.reason ? ' (' + T(d.reason, { absent: '目标消失', ambiguous: '有歧义', hidden: '被遮挡' }[d.reason] || d.reason) + ')' : '') : d.gold;
      q.innerHTML = '<span>' + esc(d.q) + '</span><span class="chip gold">' + esc(T('ground truth: ', '标准答案：')) + esc(gold) + '</span>';
      main.src = d.imgs[d.t - 1];
      tl.textContent = 't = ' + d.t + T(' · asked', ' · 被问帧');
      $$('.bx,.mk', host).forEach(function (x) { x.remove(); });
      (d.marks || []).forEach(function (m) {
        var s = document.createElement('span'); s.className = 'mk';
        s.style.cssText = 'position:absolute;left:' + (m.b[0] * 100) + '%;top:' + (m.b[1] * 100) + '%;background:rgba(42,39,51,.78);color:#fff;font:600 12px Inter,sans-serif;border-radius:4px;padding:1px 6px;transform:translate(2px,2px)';
        s.textContent = m.n; host.appendChild(s);
      });
      th.innerHTML = '';
      for (var k = 1; k <= 6; k++) {
        var t = document.createElement('div'); t.className = 'thumb' + (k === d.t ? ' asked' : ''); t.dataset.t = k;
        t.innerHTML = '<img src="' + d.imgs[k - 1] + '" alt="" loading="lazy"><span class="n">t=' + k + '</span><span class="none">none</span>';
        th.appendChild(t);
      }
      con.innerHTML = ''; dec.className = 'decision'; dec.innerHTML = '';
      note.textContent = T(d.note, NOTE[d.id] || '');
      play();
    }
    function play() {
      clear();
      var d = D[cur], delay = 250;
      con.innerHTML = '';
      $$('.bx', host).forEach(function (x) { x.remove(); });
      $$('.thumb .bx', th).forEach(function (x) { x.remove(); });
      $$('.thumb .none', th).forEach(function (x) { x.classList.remove('show'); });
      dec.className = 'decision';
      var caret = document.createElement('span'); caret.className = 'caret';
      d.tokens.forEach(function (tk) {
        var span = document.createElement('span'); span.className = 'tok';
        var txt = '', br = false;
        if (tk.k === 'tag') { txt = tk.v; span.className += ' ' + tk.tag; br = tk.v.charAt(1) === '/'; }
        else if (tk.k === 'word') { txt = ' ' + tk.v + ' '; span.className += ' word'; }
        else if (tk.k === 'box') { txt = ' t=' + tk.t + ' [' + tk.b.map(function (v) { return Math.round(v); }).join(' ') + ']'; span.className += ' box'; }
        else if (tk.k === 'none') { txt = ' t=' + tk.t + ' none'; span.className += ' none'; }
        else if (tk.k === 'sep') { txt = ';'; }
        span.textContent = txt;
        var at = delay;
        timers.push(setTimeout(function () {
          con.appendChild(span); if (br) con.appendChild(document.createElement('br'));
          con.appendChild(caret);
          requestAnimationFrame(function () { span.classList.add('show'); });
          if (tk.k === 'box') {
            var tdiv = $('.thumb[data-t="' + tk.t + '"]', th);
            if (tdiv) { var b1 = boxDiv(tk.b); tdiv.appendChild(b1); b1.style.borderWidth = '1.5px'; b1.style.boxShadow = 'none'; requestAnimationFrame(function () { b1.style.opacity = 1; }); }
            if (tk.t === d.t) { var b2 = boxDiv(tk.b); host.appendChild(b2); requestAnimationFrame(function () { b2.style.opacity = 1; setTimeout(function () { b2.style.boxShadow = '0 0 0 0 rgba(240,169,107,0)'; }, 30); }); }
          }
          if (tk.k === 'none') { var nd = $('.thumb[data-t="' + tk.t + '"] .none', th); if (nd) nd.classList.add('show'); }
        }, at));
        delay += tk.k === 'box' ? 420 : (tk.k === 'tag' ? 170 : 230);
      });
      timers.push(setTimeout(function () { if (caret.parentNode) caret.remove(); showDecision(); }, delay + 250));
      if (!userTouched) timers.push(setTimeout(function () { if (!userTouched) { cur = (cur + 1) % D.length; load(); } }, delay + 5200));
    }
    function showDecision() {
      var d = D[cur], v = d.verify, rule, cls, ans;
      if (v === 'consistent' || v === 'unsupported') { rule = T('answer with the draft', '采用草稿答案'); cls = 'ans'; ans = d.final; }
      else if (v === 'contradicted') { rule = T('answer with the revision', '采用修正后的答案'); cls = 'ans'; ans = d.final; }
      else { rule = T('decline', '拒答'); cls = 'decl'; ans = T('not visible', '看不见'); }
      dec.innerHTML = '<div class="lbl">' + T('Decision', '决定') + '</div><div class="rule"><code>' + esc(v) + '</code> → ' + rule + '</div>' +
        '<span class="chip ' + cls + '"><span class="ok">' + (d.ok ? '✓' : '✗') + '</span> ' + esc(ans) + '</span> <span class="muted" style="font-size:13.5px;margin-left:6px">' +
        T(d.ok ? 'matches the ground truth' : 'does not match the ground truth', d.ok ? '与标准答案一致' : '与标准答案不一致') + '</span>';
      requestAnimationFrame(function () { dec.classList.add('show'); });
    }
    $('#dreplay').addEventListener('click', function () { userTouched = true; play(); });
    window.__demoRefresh = function () { if (started) load(); };
    var sec = $('#demo');
    function begin() { if (started) return; started = true; load(); }
    if ('IntersectionObserver' in window) {
      var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { begin(); o.disconnect(); } }, { threshold: 0.25 });
      o.observe(sec);
    } else begin();
    renderTabs();
  })();
})();
