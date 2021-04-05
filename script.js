'use strict';

// *** Первое задание ***
console.group('Первое задание');

let lang = prompt('Укажите язык: ru или en');
const week = [];

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
  console.log(
    'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'
  );
} else {
  console.log('Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday');
}

console.groupEnd();

//  Решение через Switch.

console.group('Решение через Switch');

switch (lang) {
  case 'ru':
    console.log(
      'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'
    );
    break;
  case 'en':
    console.log(
      'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday'
    );
    break;
  default:
    console.log('Что-то пошло не так');
}

console.groupEnd();

// Решение через многомерный массив
console.group('Решение через многомерный массив');

/* week['ru'] = [ 
  jshint сказал, что лучше использовать 'dot notation'.
  Поэтому изменил на нее, но закомментировал изначальный вариант
*/
week.ru = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
// week['en'] = [
week.en = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
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
