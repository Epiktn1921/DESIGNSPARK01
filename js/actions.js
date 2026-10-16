'use strict';

const bad = (f, m) => { f.querySelector('.err').textContent = m };

const sb = async (path, body) => {
  const r = await fetch(SUPABASE.url + '/auth/v1/' + path, {method:'POST', headers:{'Content-Type':'application/json', apikey:SUPABASE.key}, body:JSON.stringify(body)});
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.msg || j.error_description || j.message || 'Ошибка сервера');
  return j;
};
const signIn = j => {
  const x = j.user, m = x.user_metadata || {};
  let u = USERS.find(v => v.id === x.id);
  if (!u) USERS.push(u = {id:x.id, email:x.email, name:m.name || x.email.split('@')[0], spec:m.spec || '', bio:'', h:''});
  U = u.id; sv(); toast('Добро пожаловать, ' + u.name + '!'); go('/');
};

const A = {
  more() { shown += colCount() * 2; feed() },
  gnew(d) { gstart(+d.n) },
  gflip(d) {
    const i = +d.i, c = G.cards[i]; if (G.lock || c.open || c.done) return;
    if (!G.t0) { G.t0 = Date.now(); GT = setInterval(gtick, 500) }
    c.open = true; gdraw(i);
    if (G.first === null) { G.first = i; return }
    const a = G.first, f = G.cards[a]; G.first = null; G.moves++;
    if (f.k === c.k) { f.open = c.open = false; f.done = c.done = true; gdraw(a); gdraw(i); if (++G.found === G.n) gwin() }
    else { G.lock = true; setTimeout(() => { f.open = c.open = false; gdraw(a); gdraw(i); G.lock = false }, 800) }
    gtick();
  },
  theme() { DARK = !DARK; applyTheme(); head(); toast(DARK ? 'Тёмная тема' : 'Светлая тема') },
  zoom(d) { const x = all().find(i => i.id === d.id), o = document.createElement('div'); o.id = 'lb'; o.tabIndex = -1; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', x.t); o.innerHTML = '<div class="cv">' + cover(x) + '</div>'; o.onclick = () => o.remove(); document.body.append(o); o.focus() },
  copy(d) { copyText(d.v); toast('Скопировано: ' + d.v) },
  share() { copyText(location.href); toast('Ссылка скопирована') },
  rnd() { const L = all(); go('/design/' + L[Math.floor(Math.random() * L.length)].id) },
  print() { window.print() },
  follow(d) { if (!me()) return go('/login'); const i = FOLLOW.indexOf(d.id); i < 0 ? FOLLOW.push(d.id) : FOLLOW.splice(i, 1); toast(i < 0 ? 'Подписка оформлена' : 'Подписка снята'); route() },
  clearn() { NOTIF = NOTIF.filter(x => x.u !== U); route() },
  async demo() { let u = USERS.find(x => x.email === 'demo@designspark.app'); if (!u) { u = {id:'udemo', email:'demo@designspark.app', name:'Демо Дизайнер', spec:'UI/UX', bio:'Тестовый аккаунт.', h:await hash('demodemo')}; USERS.push(u) } U = u.id; sv(); go('/') },
  reset() { const f = $('#flt'); f.reset(); filt(f) },
  out() { U = null; go('/') },
  like(d) { if (!me()) return go('/login'); LIKES[d.id] = LIKES[d.id] == d.v ? 0 : +d.v; toast(LIKES[d.id] === 1 ? 'Лайк поставлен' : LIKES[d.id] === -1 ? 'Дизлайк учтён' : 'Оценка снята'); const y = scrollY; route(); scrollTo(0, y) },
  qsave(d) { if (!me()) return go('/login'); let c = COLS.find(x => x.u === U && x.name === 'Избранное'); if (!c) COLS.push(c = {id:'c' + Date.now(), u:U, name:'Избранное', priv:false, items:[]}); if (c.items.includes(d.id)) return toast('Уже в «Избранном»'); c.items.push(d.id); toast('Сохранено в «Избранное»') },
  showpw(_, b) { $('#p').type = b.checked ? 'text' : 'password' },
  delc(d) { COMM[d.id].splice(+d.i, 1); route() },
  deldes(d) { if (!confirm('Удалить работу?')) return; MY = MY.filter(x => x.id !== d.id); COLS.forEach(c => c.items = c.items.filter(i => i !== d.id)); go('/') },
  priv(d) { const c = COLS.find(x => x.id === d.id); c.priv = !c.priv; route() },
  delcol(d) { if (confirm('Удалить коллекцию?')) { COLS = COLS.filter(x => x.id !== d.id); go('/collections') } },
  rmitem(d) { const c = COLS.find(x => x.id === d.c); c.items = c.items.filter(i => i !== d.id); route() },
  q(fd) { go('/search?q=' + encodeURIComponent(fd.get('q') || '')) },
  comm(fd, f) { const t = fd.get('t').trim(); if (t) (COMM[f.dataset.id] ||= []).push({u:U, t, at:Date.now()}); toast('Комментарий добавлен'); route() },
  addcol(fd, f) { const c = COLS.find(x => x.id === fd.get('col')); if (!c) { $('#cm').textContent = 'Сначала создай коллекцию'; return }
    if (!c.items.includes(f.dataset.id)) c.items.push(f.dataset.id); $('#cm').textContent = 'Сохранено в «' + c.name + '»'; toast('Сохранено в коллекцию') },
  newcol(fd) { COLS.push({id:'c' + Date.now(), u:U, name:fd.get('name').trim(), priv:false, items:[]}); route() },
  rencol(fd, f) { COLS.find(x => x.id === f.dataset.id).name = fd.get('name').trim(); route() },
  prof(fd) { Object.assign(me(), {name:fd.get('name').trim(), spec:fd.get('spec').trim(), bio:fd.get('bio').trim()}); $('#ok').textContent = 'Сохранено'; head() },
  save(fd, f) {
    const t = fd.get('t').trim(), id = f.dataset.id; if (!t) return bad(f, 'Введи название');
    if (!id && !IMG) return bad(f, 'Загрузи изображение');
    const d = {t, type:fd.get('type'), style:fd.get('style'), color:fd.get('color'), d:fd.get('d').trim(), tags:fd.get('tags').split(',').map(x => x.trim()).filter(Boolean).slice(0, 8), img:IMG};
    if (id) Object.assign(MY.find(x => x.id === id), d); else MY.unshift({id:'m' + Date.now(), author:U, likes:0, date:Date.now(), ...d});
    if (!id) simulate(MY[0].id, U);
    toast(id ? 'Изменения сохранены' : 'Работа опубликована');
    go('/design/' + (id || MY[0].id));
  },
  async reg(fd, f) {
    const email = fd.get('email').trim().toLowerCase(), pass = fd.get('pass'), name = fd.get('name').trim(), spec = fd.get('spec');
    if (!name) return bad(f, 'Введи имя');
    if (pass.length < 8) return bad(f, 'Пароль — минимум 8 символов');
    if (SUPABASE.url) {
      try {
        const j = await sb('signup', {email, password:pass, data:{name, spec}});
        if (!j.access_token) return f.insertAdjacentHTML('afterend', '<p class="ok box" role="status">Почти готово: подтверди email по ссылке из письма и войди.</p>');
        return signIn(j);
      } catch (e) { return bad(f, /already|registered/i.test(e.message) ? 'Такой email уже зарегистрирован' : e.message) }
    }
    if (USERS.some(u => u.email === email)) return bad(f, 'Такой email уже зарегистрирован');
    const u = {id:'u' + Date.now(), email, name, spec, bio:'', h:await hash(pass)}; USERS.push(u); U = u.id; sv(); toast('Добро пожаловать, ' + name + '!'); go('/');
  },
  async login(fd, f) {
    const email = fd.get('email').trim().toLowerCase();
    if (SUPABASE.url) { try { return signIn(await sb('token?grant_type=password', {email, password:fd.get('pass')})) } catch { return bad(f, 'Неверный email или пароль') } }
    const u = USERS.find(x => x.email === email);
    if (!u || u.h !== await hash(fd.get('pass'))) return bad(f, 'Неверный email или пароль');
    U = u.id; sv(); toast('С возвращением, ' + u.name + '!'); go('/');
  },
  forg(fd, f) { if (SUPABASE.url) sb('recover', {email:fd.get('email')}).catch(() => {}); f.insertAdjacentHTML('afterend', '<p class="ok box" role="status">Если такой email есть, ссылка уже летит к тебе (демо: письма не отправляются).</p>'); f.reset() }
};

document.addEventListener('click', e => {
  const l = e.target.closest('a[href^="#/"]'); if (l && !e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); go(decodeURI(l.getAttribute('href').slice(1))); return }
  const b = e.target.closest('[data-a]'); if (b) { A[b.dataset.a](b.dataset, b); sv() } });
document.addEventListener('submit', e => { if (e.target.id === 'flt') { e.preventDefault(); return } const f = e.target.closest('[data-f]'); if (f) { e.preventDefault(); Promise.resolve(A[f.dataset.f](new FormData(f), f)).then(sv) } });
document.addEventListener('input', e => {
  const f = e.target.closest('#flt'); if (f) filt(f);
  if (e.target.id === 'p' && e.target.form?.dataset.f === 'reg') { const v = e.target.value, n = (v.length >= 8) + (v.length >= 12) + /[A-ZА-Я]/.test(v) + /\d/.test(v) + /[^\wА-Яа-я]/.test(v); $('#pw').textContent = v ? 'Надёжность: ' + ['слабый', 'слабый', 'средний', 'хороший', 'сильный', 'отличный'][n] : '' }
});
document.addEventListener('change', e => { if (e.target.id === 'file') pick(e.target) });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') $('#lb')?.remove();
  const z = e.target.closest?.('[data-a="zoom"]'); if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); z.click() }
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) { e.preventDefault(); go('/search'); setTimeout(() => $('#fq')?.focus(), 50) }
});
