'use strict';

const $ = s => document.querySelector(s);
const app = $('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} };
const shuffle = a => [...a].sort(() => Math.random() - .5);
// число колонок ленты (те же пороги, что в css/components.css)
const colCount = () => innerWidth >= 1500 ? 6 : innerWidth >= 1200 ? 5 : innerWidth >= 900 ? 4 : innerWidth >= 600 ? 3 : 2;
