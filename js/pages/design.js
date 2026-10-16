'use strict';

const similar = d => {
  const rest = all().filter(x => x.id !== d.id);
  const near = rest.filter(x => x.type === d.type || x.style === d.style || x.color === d.color);
  return shuffle(near.length >= colCount() ? near : rest).slice(0, colCount());
};

function design({id}) {
  const d = all().find(x => x.id === id); if (!d) { app.innerHTML = '<div class="empty">Такой работы нет.</div>'; return }
  const u = me(), own = u && d.author === u.id, cm = COMM[id] || [], mine = COLS.filter(c => u && c.u === u.id);
  app.innerHTML = '<div class="det"><div class="cv" role="button" tabindex="0" data-a="zoom" data-id="' + id + '" aria-label="Открыть крупно" style="cursor:zoom-in">' + cover(d) + '</div><div><span class="tag">/ ' + esc(d.type) + ' · ' + esc(d.style) + ' · ' + esc(d.color) + '</span><h1>' + esc(d.t) + '</h1><p>Автор: <a href="#/profile/' + d.author + '">' + esc(person(d.author).name) + '</a></p><br><p>' + esc(d.d) + '</p>' +
    '<div class="row tags">' + d.tags.map(t => '<a class="chip" href="#/search?q=' + encodeURIComponent(t) + '">#' + esc(t) + '</a>').join('') + '</div>' +
    '<div class="row"><button data-a="copy" data-v="' + COLORS[d.color] + '"><i style="display:inline-block;width:14px;height:14px;background:' + COLORS[d.color] + ';border:1px solid;margin-right:8px"></i>' + COLORS[d.color] + '</button><button data-a="share">Скопировать ссылку</button></div>' + '<div class="row"><button data-a="like" data-id="' + id + '" data-v="1" aria-pressed="' + (LIKES[id] === 1) + '">♥ Лайк ' + cnt(d) + '</button><button data-a="like" data-id="' + id + '" data-v="-1" aria-pressed="' + (LIKES[id] === -1) + '">Дизлайк' + (LIKES[id] === -1 ? ' ✓' : '') + '</button></div>' +
    (u ? '<form data-f="addcol" data-id="' + id + '" class="row"><label for="cs" class="tag">В коллекцию</label><select id="cs" name="col">' + (mine.length ? mine.map(c => '<option value="' + c.id + '">' + esc(c.name) + '</option>').join('') : '<option value="">Нет коллекций</option>') + '</select><button class="pri">Добавить</button></form><p class="ok" id="cm"></p>' : '<p><a href="#/login">Войди</a>, чтобы сохранять и комментировать.</p>') +
    (own ? '<div class="row"><a class="btn" href="#/edit/' + id + '">Редактировать</a><button data-a="deldes" data-id="' + id + '">Удалить</button></div>' : '') + '</div></div>' +
    '<h2>Похожие работы</h2>' + grid(similar(d)) + '<h2>Комментарии (' + cm.length + ')</h2>' + cm.map((c, i) => '<div class="com"><small>' + esc(person(c.u).name) + '</small><p>' + esc(c.t) + '</p>' + (u && c.u === u.id ? '<button data-a="delc" data-id="' + id + '" data-i="' + i + '">Удалить</button>' : '') + '</div>').join('') +
    (u ? '<form data-f="comm" data-id="' + id + '"><label for="ct">Твой комментарий</label><textarea id="ct" name="t" rows="3" maxlength="500" required></textarea><div class="row"><button class="pri">Отправить</button></div></form>' : '');
}
