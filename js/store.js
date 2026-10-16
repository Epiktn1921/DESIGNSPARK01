'use strict';

let USERS = load('ds_users', []), U = load('ds_user', null), MY = load('ds_mine', []);
let LIKES = load('ds_likes', {}), COMM = load('ds_comm', {}), COLS = load('ds_cols', []);
let NOTIF = load('ds_notif', []), FOLLOW = load('ds_follow', []), DARK = load('ds_dark', matchMedia('(prefers-color-scheme: dark)').matches);
const sv = () => { store('ds_users', USERS); store('ds_user', U); store('ds_mine', MY); store('ds_likes', LIKES); store('ds_comm', COMM); store('ds_cols', COLS); store('ds_notif', NOTIF); store('ds_follow', FOLLOW); store('ds_dark', DARK) };
const me = () => USERS.find(u => u.id === U);
const person = id => AUTH.find(u => u.id === id) || USERS.find(u => u.id === id) || {name:'Аноним', spec:'', bio:''};
const all = () => [...MY, ...BASE];
const cnt = d => d.likes + (LIKES[d.id] === 1 ? 1 : 0);
const pop = d => cnt(d) + (COMM[d.id] || []).length * 2;
const hash = async s => {
  if (!crypto.subtle) return btoa(unescape(encodeURIComponent(s)));
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
};
