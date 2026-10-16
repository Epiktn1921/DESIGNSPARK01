'use strict';

let shown = 0;
function home() {
  shown = Math.max(shown, colCount() * 3);
  app.innerHTML = (me() ? '' : '<section class="hero"><div><span class="tag">/ платформа вдохновения</span>' + st('DESIGNSPARK') +
    '<p>Находи референсы, собирай идеи в папки и учись на разборах крутых работ.</p><form data-f="q" role="search"><label for="hq" class="tag">Что ищем?</label><input id="hq" type="search" placeholder="Например: кофейня, онбординг"> <div class="row"><button class="pri">Искать</button><a class="btn" href="#/trends">Тренды</a><a class="btn" href="#/about">О проекте</a><button data-a="rnd" type="button">Мне повезёт</button><a class="btn" href="#/game">Мини-игра</a></div></form></div><div class="lg2">' + LOGO + '</div></section>') +
    (me() && FOLLOW.length ? '<h2>Из твоих подписок</h2>' + grid(all().filter(d => FOLLOW.includes(d.author)).sort((a, b) => b.date - a.date).slice(0, colCount()), 'Новых работ пока нет.') : '') + '<h2>Категории</h2><div class="chips">' + TYPES.map(t => '<a href="#/search?type=' + encodeURIComponent(t) + '">' + t + '</a>').join('') + '</div>' +
    '<h2>Тренды недели</h2>' + grid([...all()].sort((a, b) => pop(b) - pop(a)).slice(0, colCount())) +
    '<h2>Свежая лента</h2><div id="feed"></div>';
  feed();
}
let io;
function feed() {
  const L = [...all()].sort((a, b) => b.date - a.date);
  $('#feed').innerHTML = grid(L.slice(0, shown)) + (shown < L.length ? '<div id="more" class="row"><button data-a="more">Показать ещё</button></div>' : '');
  io?.disconnect(); const m = $('#more');
  if (m && 'IntersectionObserver' in window) (io = new IntersectionObserver(e => { if (e[0].isIntersecting) A.more() }, {rootMargin:'300px'})).observe(m);
}
