'use strict';

const LOGO = '<img src="assets/logo.svg" alt="Логотип DesignSpark">';
const st = t => '<h1 class="ph">' + esc(t) + '</h1>';

const cover = d => '<img src="' + d.img + '" alt="' + esc(d.t) + '"' + (d.w ? ' width="' + d.w + '" height="' + d.h + '"' : '') + ' loading="lazy">';
const card = d => '<article class="card"><a href="#/design/' + d.id + '" aria-label="' + esc(d.t) + '"><div class="cv">' + cover(d) + '</div></a><div class="qa"><button data-a="like" data-id="' + d.id + '" data-v="1" aria-label="Лайк">♥</button><button data-a="qsave" data-id="' + d.id + '">Сохранить</button></div><div class="ci"><a href="#/design/' + d.id + '"><b>' + esc(d.t) + '</b></a><span>' + esc(person(d.author).name) + ' · ♥ ' + cnt(d) + '</span></div></article>';
const grid = (list, msg = 'Здесь пока пусто') => list.length ? '<div class="grid">' + list.map(card).join('') + '</div>' : '<div class="empty">' + msg + '</div>';
const mosaic = () => '<div class="mos" aria-hidden="true">' + shuffle(all()).slice(0, 4).map(d => '<img src="' + d.img + '" alt="" loading="lazy">').join('') + '</div>';
const strip = n => '<div class="strip">' + shuffle(all()).slice(0, n).map(d => '<a href="#/design/' + d.id + '"><img src="' + d.img + '" alt="' + esc(d.t) + '" loading="lazy"></a>').join('') + '</div>';
const more = () => '<h2>Ещё вдохновения</h2>' + grid(shuffle(all()).slice(0, colCount()));
const opts = (arr, sel) => arr.map(x => '<option' + (x === sel ? ' selected' : '') + '>' + esc(x) + '</option>').join('');
let CUR = location.hash.slice(1) || '/', GT;
const go = h => { CUR = h; try { if (location.hash.slice(1) !== h) history.pushState(null, '', '#' + h) } catch {} route() };
const applyTheme = () => { document.documentElement.dataset.theme = DARK ? 'dark' : 'light' };
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2200) };
const copyText = t => navigator.clipboard?.writeText(t).catch(() => {});
