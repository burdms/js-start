'use strict';

const money = +prompt('Ваш месячный доход?'),
  income = 'Freelance',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую'
  ),
  deposit = Boolean(
    prompt('Есть ли у вас депозит в банке? Если нет — оставьте поле пустым')
  ),
  expenses1 = prompt('Введите обязательную статью расходов №1'),
  expenses2 = prompt('Введите обязательную статью расходов №2'),
  amount1 = +prompt('Во сколько это обойдется? №1'),
  amount2 = +prompt('Во сколько это обойдется? №2'),
  budgetMonth = amount1 + amount2,
  mission = 200000,
  period = Math.ceil(mission / (money - budgetMonth)),
  budgetDay = Math.floor(budgetMonth / 30);

console.log('Typeof money: ', typeof money);
console.log('Typeof income: ', typeof income);
console.log('Typeof deposit: ', typeof deposit);

console.log('Length of addExpenses: ', addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

// Вывод в консоль из задания в уроке №3
console.log('Бюджет на месяц: ' + budgetMonth + ' рублей');
console.log('Цель будет достигнута за ' + period + ' месяца(-ев)');
console.log('Дневной бюджет: ' + budgetDay + ' рублей');

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}
