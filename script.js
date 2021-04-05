'use strict';

// *** Первое задание ***
console.group('Первое задание');

let lang = prompt('Укажите язык: ru или en');
const week = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
};

// Проверка на ввод. Допустимые значения: ru или en
while (lang !== 'ru' && lang !== 'en') {
  lang = prompt('Укажите язык правильно: ru или en');
}
console.log('Выбранный язык: ', lang);

/*  Решение через if.
    Использован только else, т.к. выше есть проверка на язык.
    Если не русский, значит английский : )
*/

console.group('Решение через If');

if (lang === 'ru') {
  console.log(week.ru);
} else {
  console.log(week.en);
}

console.groupEnd();

//  Решение через Switch.

console.group('Решение через Switch');

switch (lang) {
  case 'ru':
    console.log(week.ru);
    break;
  case 'en':
    console.log(week.en);
    break;
  default:
    console.log('Что-то пошло не так');
}

console.groupEnd();

// Решение через многомерный массив
console.group('Решение через многомерный массив');

console.log(week[lang]);
console.groupEnd();

console.groupEnd();

// *** Второе задание ***
console.group('Второе задание');
const namePerson = 'Дмитрий';
namePerson === 'Артем'
  ? console.log('Директор')
  : namePerson === 'Максим'
  ? console.log('Преподаватель')
  : console.log('Студент');
console.groupEnd();
