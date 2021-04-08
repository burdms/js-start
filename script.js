'use strict';

const money = start(),
      income = 'Freelance',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, комуналка'),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      mission = 200000,
      expenses = [],
      expensesAmount = getExpensesMonth(),
      accumulatedMonth = getAccumulatedMonth(money, expensesAmount),
      budgetDay = Math.floor(accumulatedMonth / 30),
      period = getTargetMonth(mission, accumulatedMonth);

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

function getExpensesMonth() {
  let sum = 0, 
      value;

  for (let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов');
    
    do{
      value = prompt('Во сколько это обойдется?');
    }while(!isNumber(value));
    
    sum += +value; 
  }

  return sum;
}

function getAccumulatedMonth(income, outcome) {
  return income - outcome;
}

function  getTargetMonth(target, budget) {
  let result = Math.ceil(target / budget);

  if(isFinite(result)) {
    if (result > 0) {
      return ('Цель будет достигнута за ' + result + ' месяца(-ев)');
    } else {
      return ('Цель не будет достигнута');
    }
  } else {
    return ("Период невероятно большой. Цель никогда не будет достигнута");
  }
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

console.log(money);

console.log('Typeof money: ', showTypeOf(money));
console.log('Typeof income: ', showTypeOf(income));
console.log('Typeof deposit: ', showTypeOf(deposit));

console.log('Sum of all expenses: ', expensesAmount);

console.log(addExpenses.toLowerCase().split(', '));
console.log(expenses);

console.log(period);

// isFinite(period) ?
//   console.log('Период равен ' + period + ' месяцев')
//   : console.log("Период невероятно большой");

// isFinite(period) ?
//   console.log('Цель будет достигнута за ' + period + ' месяца(-ев)')
//   : console.log("Цель никогда не будет достигнута");

console.log('Дневной бюджет: ' + budgetDay + ' рублей');

console.log(getStatusIncome(budgetDay));


