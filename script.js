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

const appData = {
    budget: 80000,
    // budget: start(),
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 12,
    asking: function() {
      if (confirm('Есть ли у вас дополнительный источник заработка?')){
        let key, value;

        do{
          key = prompt('Какой у вас дополнительный заработок?', 'Фриланс').trim().toLowerCase();
        }while(isNumber(key) || key === '');

        do{
          value = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
        }while(!isNumber(value));

        appData.income[key] = +value;   
      }

      let addExpensesCheck;

      do{
        addExpensesCheck = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, комуналка').trim();
      }while(isNumber(addExpensesCheck) || addExpensesCheck === '');

      const addExpenses = addExpensesCheck;
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for (let i = 0; i < 2; i++){
        let key, value;
        
        do{
          key = prompt('Введите обязательную статью расходов').trim().toLowerCase();
        }while(isNumber(key) || key === '');

        do{
          value = prompt('Во сколько это обойдется?');
        }while(!isNumber(value));

        appData.expenses[key] = +value;       
      }
    },
    getExpensesMonth: function() {
      for (let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key]; 
      }
    },
    getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
      let result = Math.ceil(appData.mission / appData.budgetMonth);

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
    getStatusIncome: function () {
      if (appData.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
      } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');    
      } else if (appData.budgetDay === 0) {
        return ('Кажется, такими темпами вы будете очень долго копить указанную сумму');
      } else {
        return ('Что-то пошло не так');
      }
    },
    getInfoDeposit: function() {
      if (appData.deposit) {
        let percent, value;

        do{
          percent = prompt('Каков годовой процент?', '10');
        }while(!isNumber(percent));

        appData.percentDeposit = +percent; 

        do{
          value = prompt('Какая сумма заложена?', '10000');
        }while(!isNumber(value));

        appData.moneyDeposit = +value;
      }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    },
    showArray: function(arr) {
      let str = '';

      arr.forEach((item, index, array) => {
        str += item.charAt(0).toUpperCase() + item.slice(1);

        if (index !== array.length - 1){
          str += ', ';
        }
      });

      return str;
    }
  },
  calculateButton = document.getElementById('start'),
  addIncomeButton = document.querySelector('.income').getElementsByTagName('button')[0],
  addExpensesButton = document.querySelector('.expenses').getElementsByTagName('button')[0],
  depositCheckbox = document.querySelector('#deposit-check'),
  additionalIncomes = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-items').querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');

  console.log(calculateButton);
  console.log(addIncomeButton);
  console.log(addExpensesButton);
  console.log(depositCheckbox);
  console.log(additionalIncomes);
  console.log(budgetDayValue);
  console.log(expensesMonthValue);
  console.log(additionalIncomeValue);
  console.log(additionalExpensesValue);
  console.log(incomePeriodValue);
  console.log(targetMonthValue);
  console.log('***');
  console.log(salaryAmount);
  console.log(incomeTitle);
  console.log(incomeAmount);
  console.log(expensesTitle);
  console.log(expensesAmount);
  console.log(additionalExpensesItem);
  console.log(targetAmount);
  console.log(periodSelect);
/*
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('\nНаша программа включает в себя данные: ');
for (let key in appData){
  console.log(key + ': ' + appData[key]);
}

console.log(appData);

console.log(appData.showArray(appData.addExpenses));
*/