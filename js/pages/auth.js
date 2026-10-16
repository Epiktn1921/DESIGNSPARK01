'use strict';

const authForm = (title, act, fields, btn, extra = '') => app.innerHTML = st(title) + '<div class="split"><div><form data-f="' + act + '" class="box">' + fields + '<p class="err" role="alert"></p><button class="pri">' + btn + '</button></form>' + extra + '</div>' + mosaic() + '</div>';
const fE = '<label for="e">Email</label><input id="e" name="email" type="email" required autocomplete="email">';
const fP = '<label for="p">Пароль</label><input id="p" name="pass" type="password" required minlength="8" autocomplete="current-password">';
const login = () => authForm('ВХОД', 'login', fE + fP, 'Войти', '<div class="box"><br><button data-a="demo">Войти как демо-пользователь</button><p><br><a href="#/forgot-password">Забыл пароль?</a> · <a href="#/register">Регистрация</a></p></div>');
const register = () => authForm('РЕГИСТРАЦИЯ', 'reg', '<label for="n">Имя</label><input id="n" name="name" type="text" required maxlength="40" autocomplete="name"><label for="sp">Чем занимаешься?</label><select id="sp" name="spec">' + opts(['Студент', 'UI/UX дизайнер', 'Графический дизайнер', 'Иллюстратор', 'Арт-директор', 'Другое']) + '</select>' + fE + '<label for="p">Пароль (от 8 символов)</label><input id="p" name="pass" type="password" required minlength="8" autocomplete="new-password"><label class="shw"><input type="checkbox" data-a="showpw"> Показать пароль</label><div id="pw" aria-live="polite"></div>', 'Создать аккаунт', '<p class="box"><br>Уже есть аккаунт? <a href="#/login">Войти</a></p>');
const forgot = () => authForm('ПАРОЛЬ', 'forg', fE, 'Прислать ссылку');
