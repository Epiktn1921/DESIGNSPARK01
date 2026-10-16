'use strict';

let F = {q:'', type:[], style:[], color:[], age:'0', sort:'date'};
function search(_, P) {
  F = {q:P.get('q') || '', type:P.get('type') ? [P.get('type')] : [], style:[], color:[], age:'0', sort:'date'};
  const grp = (n, label, arr) => '<fieldset><legend>' + label + '</legend>' + arr.map(x => '<label><input type="checkbox" name="' + n + '" value="' + esc(x) + '"' + (F[n].includes(x) ? ' checked' : '') + '> ' + (n === 'color' ? '<i style="width:14px;height:14px;border:1px solid;background:' + COLORS[x] + '"></i>' : '') + esc(x) + '</label>').join('') + '</fieldset>';
  app.innerHTML = st('ПОИСК') + '<div class="side"><form id="flt" aria-label="Фильтры"><label for="fq">Название или описание</label><input id="fq" name="q" type="search" value="' + esc(F.q) + '">' +
    grp('type', 'Тип проекта', TYPES) + grp('style', 'Стиль', STYLES) + grp('color', 'Цветовая гамма', Object.keys(COLORS)) +
    '<label for="fa">Добавлено</label><select id="fa" name="age"><option value="0">За всё время</option><option value="7">За неделю</option><option value="30">За месяц</option></select>' +
    '<label for="fs">Сортировка</label><select id="fs" name="sort"><option value="date">По дате</option><option value="pop">По популярности</option><option value="likes">По лайкам</option></select>' +
    '<div class="row"><button type="button" data-a="reset">Сбросить фильтры</button></div></form><div><p class="tag" id="rc" aria-live="polite"></p><div id="res"></div></div></div>';
  res();
}
function filt(f) {
  const fd = new FormData(f);
  F = {q:fd.get('q').trim().toLowerCase(), type:fd.getAll('type'), style:fd.getAll('style'), color:fd.getAll('color'), age:fd.get('age'), sort:fd.get('sort')};
  res();
}
function res() {
  let L = all().filter(d => (!F.q || (d.t + ' ' + d.d + ' ' + d.tags.join(' ')).toLowerCase().includes(F.q.toLowerCase())) &&
    (!F.type.length || F.type.includes(d.type)) && (!F.style.length || F.style.includes(d.style)) && (!F.color.length || F.color.includes(d.color)) &&
    (F.age === '0' || d.date > Date.now() - F.age * DAY));
  L.sort((a, b) => F.sort === 'pop' ? pop(b) - pop(a) : F.sort === 'likes' ? cnt(b) - cnt(a) : b.date - a.date);
  $('#rc').textContent = 'Найдено: ' + L.length;
  $('#res').innerHTML = grid(L, 'Ничего не нашлось. Попробуй убрать часть фильтров.');
}
