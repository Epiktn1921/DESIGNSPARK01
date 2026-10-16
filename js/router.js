'use strict';

const R = [['/', home], ['/search', search], ['/trends', trends], ['/game', game], ['/about', about], ['/notifications', notifs, 1], ['/design/:id', design], ['/upload', up, 1], ['/edit/:id', up, 1], ['/profile/:id', profile],
  ['/settings', settings, 1], ['/collections', collections, 1], ['/collections/:id', collection, 1], ['/login', login], ['/register', register], ['/forgot-password', forgot]];
function head() {
  const u = me(), n = NOTIF.filter(x => x.u === U && !x.read).length;
  $('#nav').innerHTML = '<a href="#/">Главная</a><a href="#/search">Поиск</a><a href="#/trends">Тренды</a><a href="#/about">О проекте</a><a href="#/game">Игра</a>' + (u ?
    '<a href="#/collections">Коллекции</a><a href="#/notifications">Уведомления' + (n ? ' (' + n + ')' : '') + '</a><a class="btn" href="#/upload">+ Загрузить</a><a href="#/profile/' + u.id + '">' + esc(u.name) + '</a><button data-a="out">Выйти</button>' :
    '<a href="#/login">Войти</a><a class="btn" href="#/register">Регистрация</a>') + '<button data-a="theme" aria-pressed="' + DARK + '">' + (DARK ? 'Светлая' : 'Тёмная') + ' тема</button>';
}
function route() {
  const [path, qs] = CUR.split('?'), P = new URLSearchParams(qs || ''), b = path.split('/');
  head(); clearInterval(GT);
  for (const [p, fn, prot] of R) {
    const a = p.split('/'), prm = {};
    if (a.length === b.length && a.every((x, i) => x[0] === ':' ? (prm[x.slice(1)] = decodeURIComponent(b[i]), true) : x === b[i])) {
      if (prot && !me()) { go('/login'); return }
      fn(prm, P); scrollTo(0, 0); return;
    }
  }
  app.innerHTML = '<div class="empty">Такой страницы нет. <a href="#/">На главную</a></div>';
}
const sync = () => { const h = location.hash.slice(1) || '/'; if (h !== CUR) { CUR = h; route() } };
addEventListener('hashchange', sync); addEventListener('popstate', sync);
applyTheme();
route();
