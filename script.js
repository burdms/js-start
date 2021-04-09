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

const expenses = [],
      appData = {
        budget: start(),
        budgetDay: 0,
        budgetMonth: 0,
        budgetExpenses: 0,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        mission: 200000,
        period: 12,
        asking: function() {
          const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, комуналка');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
        },
        getExpensesMonth: function() {
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
        },
        getAccumulatedMonth: function (income, outcome) {
          return income - outcome;
        },
        getTargetMonth: function (target, budget) {
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
        },
        getStatusIncome: function (budget) {
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
        },
      },
      expensesAmount = appData.getExpensesMonth(),
      accumulatedMonth = appData.getAccumulatedMonth(appData.budget, expensesAmount),
      budgetDay = Math.floor(accumulatedMonth / 30);

appData.asking();

appData.period = appData.getTargetMonth(appData.mission, accumulatedMonth);

console.log(appData.budget);

console.log('Sum of all expenses: ', expensesAmount);

console.log(expenses);

console.log(appData.period);

console.log('Дневной бюджет: ' + budgetDay + ' рублей');

console.log(appData.getStatusIncome(budgetDay));


