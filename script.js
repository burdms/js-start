'use strict';

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function start() {
  let value;

  do{
    value = prompt('Ваш месячный доход?', "80000");
  }while(!isNumber(value));

  return +value;
}

function getExpensesMonth(value1, value2) {
  return value1 + value2;
}

function getAccumulatedMonth(income, outcome) {
  return income - outcome;
}

function  getTargetMonth(target, budget) {
  return Math.ceil(target / budget);
}

function showTypeOf(data) {
  return typeof data;
}

function getStatusIncome(budget) {
  if (budget >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budget >= 600 && budget < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budget > 0 && budget < 600) {
    return ('К сожалению, у вас уровень дохода ниже среднего');    
  } else if (budget === 0) {
    return ('Кажется, такими темпами вы будете очень долго копить указанную сумму');
  } else {
    return ('Что-то пошло не так');
  }
}


const money = start(),
  income = 'Freelance',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, комуналка'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов №1', 'Квартира'),
  amount1 = +prompt('Во сколько это обойдется? №1', '20000'),
  expenses2 = prompt('Введите обязательную статью расходов №2', 'Комуналка'),
  amount2 = +prompt('Во сколько это обойдется? №2', '10000'),
  mission = 200000,
  accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)),
  budgetDay = Math.floor(accumulatedMonth / 30),
  period = getTargetMonth(mission, accumulatedMonth);


console.log(money);

console.log('Typeof money: ', showTypeOf(money));
console.log('Typeof income: ', showTypeOf(income));
console.log('Typeof deposit: ', showTypeOf(deposit));

console.log('Sum of all expenses: ', getExpensesMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));

isFinite(period) ?
  console.log('Период равен ' + period + ' месяцев')
  : console.log("Период невероятно большой");

isFinite(period) ?
  console.log('Цель будет достигнута за ' + period + ' месяца(-ев)')
  : console.log("Цель никогда не будет достигнута");

console.log('Дневной бюджет: ' + budgetDay + ' рублей');

console.log(getStatusIncome(budgetDay));


