'use strict';

function profile({id}) {
  const p = person(id), L = all().filter(d => d.author === id), own = U === id;
  app.innerHTML = '<div class="row"><span class="av" aria-hidden="true">' + esc(p.name[0]) + '</span><div><span class="tag">/ ' + esc(p.spec || 'дизайнер') + '</span><h1>' + esc(p.name) + '</h1><p>' + esc(p.bio || 'Пока без описания.') + '</p><p class="tag">Работ: ' + L.length + ' · Лайков: ' + L.reduce((a, d) => a + cnt(d), 0) + '</p>' + (own ? '<a href="#/settings">Редактировать профиль</a>' : '<button data-a="follow" data-id="' + id + '" aria-pressed="' + FOLLOW.includes(id) + '">' + (FOLLOW.includes(id) ? 'Отписаться' : 'Подписаться') + '</button>') + '</div></div><h2>Работы (' + L.length + ')</h2>' + grid(L, 'Пока нет публичных работ.') + more();
}
function settings() {
  const u = me();
  app.innerHTML = st('НАСТРОЙКИ') + '<div class="split"><form data-f="prof" class="box"><label for="n">Имя</label><input id="n" name="name" type="text" required maxlength="40" value="' + esc(u.name) + '"><label for="s">Специализация</label><input id="s" name="spec" type="text" maxlength="60" value="' + esc(u.spec) + '"><label for="b">О себе</label><textarea id="b" name="bio" rows="3" maxlength="300">' + esc(u.bio) + '</textarea><p class="ok" role="status" id="ok"></p><button class="pri">Сохранить</button></form>' + mosaic() + '</div>';
}
