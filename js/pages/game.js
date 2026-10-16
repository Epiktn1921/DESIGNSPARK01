'use strict';

let G = null, BEST = load('ds_best', {});
function game() {
  app.innerHTML = st('ИГРА') + '<p style="max-width:34em">Найди пары работ из ленты. Чем меньше ходов и времени, тем круче рекорд.</p><div class="row"><button data-a="gnew" data-n="6">Легко</button><button class="pri" data-a="gnew" data-n="8">Средне</button><button data-a="gnew" data-n="10">Сложно</button></div><p class="tag" id="gs" aria-live="polite"></p><div id="gb" class="gb"></div><div id="gm" role="status"></div>' + more();
  gstart(8);
}
function gstart(n) {
  clearInterval(GT);
  const pool = all().filter(d => d.img).sort(() => Math.random() - .5).slice(0, n);
  const cards = [...pool, ...pool].map(d => ({k:d.id, d})).sort(() => Math.random() - .5).map(c => ({...c, open:false, done:false}));
  G = {n, cards, first:null, lock:false, moves:0, t0:0, found:0};
  $('#gm').innerHTML = '';
  $('#gb').style.gridTemplateColumns = 'repeat(' + (n === 10 ? 5 : 4) + ',minmax(0,140px))';
  $('#gb').innerHTML = cards.map((c, i) => '<button class="gc" data-a="gflip" data-i="' + i + '" aria-label="Карта ' + (i + 1) + ', закрыта"><span class="gf"><span class="gk">?</span><span class="gv"><img src="' + c.d.img + '" alt=""></span></span></button>').join('');
  gtick();
}
function gdraw(i) {
  const c = G.cards[i], el = $('#gb').children[i]; if (!el) return;
  el.classList.toggle('on', c.open || c.done); el.classList.toggle('ok', c.done);
  el.setAttribute('aria-label', c.open || c.done ? c.d.t : 'Карта ' + (i + 1) + ', закрыта');
}
function gtick() {
  const el = $('#gs'); if (!el || !G) return;
  const b = BEST[G.n];
  el.textContent = 'Ходы: ' + G.moves + ' · Время: ' + (G.t0 ? Math.floor((Date.now() - G.t0) / 1000) : 0) + ' с · Пары: ' + G.found + '/' + G.n + (b ? ' · Рекорд: ' + b.moves + ' ходов, ' + b.time + ' с' : '');
}
function gwin() {
  clearInterval(GT);
  const time = Math.floor((Date.now() - G.t0) / 1000), b = BEST[G.n], rec = !b || G.moves < b.moves || (G.moves === b.moves && time < b.time);
  if (rec) { BEST[G.n] = {moves:G.moves, time}; store('ds_best', BEST) }
  $('#gm').innerHTML = '<p class="ok">Победа! ' + G.moves + ' ходов за ' + time + ' с' + (rec ? ' — новый рекорд!' : '') + '</p><div class="row"><button class="pri" data-a="gnew" data-n="' + G.n + '">Играть ещё</button><a class="btn" href="#/">В ленту</a></div>';
  toast(rec ? 'Новый рекорд!' : 'Победа!'); gtick();
}
