'use strict';

let IMG = '';
function up(p) {
  const d = p.id ? MY.find(x => x.id === p.id) : null; IMG = d?.img || '';
  if (p.id && !d) { app.innerHTML = '<div class="empty">Редактировать можно только свои работы.</div>'; return }
  app.innerHTML = st(d ? 'ПРАВКА' : 'ЗАГРУЗКА') + '<div class="split"><form data-f="save" data-id="' + (p.id || '') + '" class="box"><label for="file">Изображение (JPG, PNG, WebP, до 10 МБ)</label><input id="file" type="file" accept="image/jpeg,image/png,image/webp"><div class="cv" id="pv" style="margin-top:10px">' + (IMG ? '<img src="' + IMG + '" alt="Предпросмотр">' : '') + '</div>' +
    '<label for="t">Название *</label><input id="t" name="t" type="text" maxlength="80" required value="' + esc(d?.t) + '">' +
    '<label for="ty">Тип проекта *</label><select id="ty" name="type">' + opts(TYPES, d?.type) + '</select>' +
    '<label for="sy">Стиль</label><select id="sy" name="style">' + opts(STYLES, d?.style) + '</select>' +
    '<label for="co">Цветовая гамма</label><select id="co" name="color">' + opts(Object.keys(COLORS), d?.color) + '</select>' +
    '<label for="de">Описание</label><textarea id="de" name="d" rows="3" maxlength="600">' + esc(d?.d) + '</textarea>' +
    '<label for="tg">Теги через запятую</label><input id="tg" name="tags" type="text" value="' + esc(d?.tags.join(', ')) + '"><p class="err" role="alert"></p><button class="pri">Опубликовать</button></form>' + mosaic() + '</div>';
}
function pick(inp) {
  const f = inp.files[0], er = $('.err'); if (!f) return;
  if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { er.textContent = 'Нужен JPG, PNG или WebP'; return }
  if (f.size > 10 * 1048576) { er.textContent = 'Файл больше 10 МБ'; return }
  er.textContent = '';
  const im = new Image(); im.onload = () => {
    const k = Math.min(1, 1000 / Math.max(im.width, im.height)), c = document.createElement('canvas');
    c.width = im.width * k; c.height = im.height * k; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
    IMG = c.toDataURL('image/webp', .8); $('#pv').innerHTML = '<img src="' + IMG + '" alt="Предпросмотр">';
  }; im.src = URL.createObjectURL(f);
}
