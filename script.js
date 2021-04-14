'use strict';

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const start = document.getElementById('start'),
  addIncomeButton = document.getElementsByTagName('button')[0],
  addExpensesButton = document.getElementsByTagName('button')[1],
  depositCheckbox = document.querySelector('#deposit-check'),
  additionalIncomes = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
//   incomeTitle = document.querySelector('.income-items > .income-title'),
//   incomeAmount = document.querySelector('.income-amount'),
//   expensesTitle = document.querySelector('.expenses-items > .expenses-title'),
//   expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    // mission: 200000,
    // period: 12,
    start: function() {
        // let value;

        // do{
        //     value = prompt('Ваш месячный доход?', "80000");
        // }while(!isNumber(value));

        if (salaryAmount.value.trim() === ''){
            alert('Поле "Ваш месячный доход" должно быть заполнено');
            return;
        }

        appData.budget = +salaryAmount.value.trim();

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
        // appData.asking();
        // appData.getTargetMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit();

        // return +value;
    },
    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        addExpensesButton.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            addExpensesButton.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        addIncomeButton.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            addIncomeButton.style.display = 'none';
        }
    },
    getExpenses: function (){
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-items > .expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-items > .income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
      additionalIncomes.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            appData.addIncome.push(itemValue);
        }
      });
    },
    // asking: function() {
    //   if (confirm('Есть ли у вас дополнительный источник заработка?')){
    //     let key, value;

    //     do{
    //       key = prompt('Какой у вас дополнительный заработок?', 'Фриланс').trim().toLowerCase();
    //     }while(isNumber(key) || key === '');

    //     do{
    //       value = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
    //     }while(!isNumber(value));

    //     appData.income[key] = +value;   
    //   }

    //   let addExpensesCheck;

    //   do{
    //     addExpensesCheck = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, комуналка').trim();
    //   }while(isNumber(addExpensesCheck) || addExpensesCheck === '');

    //   const addExpenses = addExpensesCheck;
    //   appData.addExpenses = addExpenses.toLowerCase().split(', ');

    //   appData.deposit = confirm('Есть ли у вас депозит в банке?');

    // //   for (let i = 0; i < 2; i++){
    // //     let key, value;
        
    // //     do{
    // //       key = prompt('Введите обязательную статью расходов').trim().toLowerCase();
    // //     }while(isNumber(key) || key === '');

    // //     do{
    // //       value = prompt('Во сколько это обойдется?');
    // //     }while(!isNumber(value));

    // //     appData.expenses[key] = +value;       
    // //   }
    // },
    getExpensesMonth: function() {
      for (let key in appData.expenses){
        appData.expensesMonth += +appData.expenses[key]; 
      }
    },
    getIncomeMonth: function() {
      for (let key in appData.income){
        appData.incomeMonth += +appData.income[key]; 
      }
    },
    getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
      return Math.ceil(targetAmount.value / appData.budgetMonth);

    //   if(isFinite(result)) {
    //     if (result > 0) {
    //       return ('Цель будет достигнута за ' + result + ' месяца(-ев)');
    //     } else {
    //       return ('Цель не будет достигнута');
    //     }
    //   } else {
    //     return ("Период невероятно большой. Цель никогда не будет достигнута");
    //   }
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
      return appData.budgetMonth * periodSelect.value;
    },
    showPeriodValue: function() {
        document.querySelector('.period-amount').textContent = periodSelect.value;
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
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
  };

  start.addEventListener('click', appData.start);
  addExpensesButton.addEventListener('click', appData.addExpensesBlock);
  addIncomeButton.addEventListener('click', appData.addIncomeBlock);
  periodSelect.addEventListener('input', appData.showPeriodValue);

/*
console.log('\nНаша программа включает в себя данные: ');
for (let key in appData){
  console.log(key + ': ' + appData[key]);
}
*/

console.log(appData);