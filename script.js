'use strict';

let money = 700,
  income = 'Freelance',
  addExpenses = 'Rent, utilities, internet, software',
  deposit = true,
  mission = 3000,
  period = 8,
  budgetDay = +money / 30;

console.group('***1***');
console.log('Typeof money: ', typeof money);
console.log('Typeof income: ', typeof income);
console.log('Typeof deposit: ', typeof deposit);
console.groupEnd();

console.group('***2***');
console.log('Length of addExpenses: ', addExpenses.length);
console.groupEnd();

console.group('***3***');
console.log('%c“Период равен ' + period + ' месяцев”', 'font-weight: bold;');
console.log('“Цель заработать ' + mission + ' долларов”');
console.groupEnd();

console.group('***4***');
console.log(addExpenses.toLowerCase().split(', '));
console.groupEnd();

console.group('***5***');
console.log(
  'Дневной бюджет: ' + budgetDay + '. Или же ' + Math.round(budgetDay)
);
console.groupEnd();
