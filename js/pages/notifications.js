'use strict';

function notify(uid, text) { NOTIF.unshift({u:uid, t:text, at:Date.now(), read:false}); sv(); head(); toast('Новое уведомление') }
function simulate(id, uid) {
  const d = () => MY.find(x => x.id === id), refresh = () => { if (CUR.includes(id)) route() };
  setTimeout(() => { if (!d()) return; d().likes++; notify(uid, 'Анна Лис поставила лайк работе «' + d().t + '»'); refresh() }, 6000);
  setTimeout(() => { if (!d()) return; (COMM[id] ||= []).push({u:'u2', t:'Отличная сетка, сохранил в референсы!', at:Date.now()}); notify(uid, 'Максим Орлов прокомментировал «' + d().t + '»'); refresh() }, 12000);
}
function notifs() {
  const L = NOTIF.filter(x => x.u === U);
  app.innerHTML = st('УВЕДОМЛЕНИЯ') + (L.length ? L.map(n => '<div class="com' + (n.read ? '' : ' new') + '"><small>' + new Date(n.at).toLocaleString('ru') + '</small><p>' + esc(n.t) + '</p></div>').join('') + '<div class="row"><button data-a="clearn">Очистить</button></div>' : '<div class="empty">Пока тихо. Загрузи работу и посмотри, кто на неё отреагирует.</div>') + more();
  L.forEach(n => n.read = true); sv(); head();
}
