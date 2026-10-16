'use strict';

function collections() {
  const u = me(), L = COLS.filter(c => c.u === u.id);
  app.innerHTML = st('КОЛЛЕКЦИИ') + '<form data-f="newcol" class="row"><label for="nc" class="tag">Новая папка</label><input id="nc" name="name" type="text" required maxlength="40" style="max-width:260px"><button class="pri">Создать</button></form>' +
    (L.length ? '<div class="cl">' + L.map(c => '<div><span class="tag">/ ' + (c.priv ? 'приватная' : 'публичная') + '</span><h3><a href="#/collections/' + c.id + '">' + esc(c.name) + '</a></h3>Работ: ' + c.items.length + '</div>').join('') + '</div>' : '<div class="empty">Создай первую коллекцию — и складывай туда всё вдохновляющее.</div>') + more();
}
function collection({id}) {
  const c = COLS.find(x => x.id === id && x.u === U); if (!c) { app.innerHTML = '<div class="empty">Коллекция не найдена.</div>'; return }
  app.innerHTML = '<a href="#/collections">← Все коллекции</a><br><br>' + st(c.name.toUpperCase()) +
    '<form data-f="rencol" data-id="' + id + '" class="row"><label for="rn" class="tag">Название</label><input id="rn" name="name" type="text" required maxlength="40" value="' + esc(c.name) + '" style="max-width:260px"><button>Переименовать</button></form>' +
    '<div class="row"><button data-a="priv" data-id="' + id + '" aria-pressed="' + c.priv + '">' + (c.priv ? 'Приватная: сделать публичной' : 'Публичная: сделать приватной') + '</button><button data-a="delcol" data-id="' + id + '">Удалить коллекцию</button><button data-a="print">Экспорт в PDF</button></div>' +
    (c.items.length ? '<div class="grid">' + c.items.map(i => all().find(d => d.id === i)).filter(Boolean).map(d => '<div>' + card(d) + '<div class="row"><button data-a="rmitem" data-c="' + id + '" data-id="' + d.id + '">Убрать из папки</button></div></div>').join('') + '</div>' : '<div class="empty">Папка пустая. Добавляй работы на их страницах.</div>') + more();
}
