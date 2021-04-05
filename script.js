'use strict';

const money = +prompt('Ваш месячный доход?', "80000"),
  income = 'Freelance',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, комуналка'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов №1', 'Квартира'),
  amount1 = +prompt('Во сколько это обойдется? №1', '20000'),
  expenses2 = prompt('Введите обязательную статью расходов №2', 'Комуналка'),
  amount2 = +prompt('Во сколько это обойдется? №2', '10000'),
  budgetMonth = money - (amount1 + amount2),
  mission = 200000,
  period = Math.ceil(mission / budgetMonth),
  budgetDay = Math.floor(budgetMonth / 30);

  console.log('Typeof money: ', typeof money);
  console.log('Typeof income: ', typeof income);
  console.log('Typeof deposit: ', typeof deposit);

  console.log('Length of addExpenses: ', addExpenses.length);

  console.log('Цель заработать ' + mission + ' рублей');
  
  console.log(addExpenses.toLowerCase().split(', '));
  
  isFinite(period) ?
    console.log('Период равен ' + period + ' месяцев')
    : console.log("Период невероятно большой");
  
  isFinite(period) ?
    console.log('Цель будет достигнута за ' + period + ' месяца(-ев)')
    : console.log("Цель никогда не будет достигнута");
  

  console.log('Бюджет на месяц: ' + budgetMonth + ' рублей');
  console.log('Дневной бюджет: ' + budgetDay + ' рублей');

  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay > 0 && budgetDay < 600) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');    
  } else if (budgetDay === 0) {
    console.log('Кажется, такими темпами вы будете очень долго копить ' + mission + ' рублей');
  } else {
    console.log('Что-то пошло не так');
  }


