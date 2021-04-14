'use strict';

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function typeNumbers(event){
    const key = event.keyCode;

    if (key === 8 || key === 9 || key === 46 || key === 37 || key === 39) {
        event.returnValue = true;
    } else if (key < 48 || key > 57) {
        event.returnValue = false;
    } else {
        event.returnValue = true;
    }

    console.log(key);
    console.log(event.returnValue);
}

function typeNonNumbers(event){
    const key = event.keyCode;

    if (key < 48 || key > 57) {
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }
    
    console.log(key);
    console.log(event.returnValue);
}

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelectorAll('.income-items > .income-title'),
    incomeAmount = document.querySelectorAll('.income-amount'),
    expensesTitle = document.querySelectorAll('.expenses-items > .expenses-title'),
    expensesAmount = document.querySelectorAll('.expenses-amount');

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
    checkEmpty: function(){
        start.disabled = true;
        start.style.cursor = 'not-allowed';
        salaryAmount.addEventListener('keyup', function() {
            if (salaryAmount.value.trim() !== '') {
                start.disabled = false;
                start.style.cursor = 'pointer';
            } else {
                start.disabled = true;
                start.style.cursor = 'not-allowed';
            }
        });
    },
    start: function() {
        appData.budget = +salaryAmount.value.trim();

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
        // appData.getTargetMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit();
    },
    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
            item.value = '';
        });

        addExpensesButton.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesTitle = document.querySelectorAll('.expenses-items > .expenses-title').forEach(function(item) {
            item.addEventListener('keydown', typeNonNumbers);
        });
        expensesAmount = document.querySelectorAll('.expenses-amount').forEach(function(item) {
            item.addEventListener('keydown', typeNumbers);
        });

        if (expensesItems.length === 3) {
            addExpensesButton.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);

        cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
            item.value = '';
        });
        
        addIncomeButton.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        incomeTitle = document.querySelectorAll('.income-items > .income-title').forEach(function(item) {
            item.addEventListener('keydown', typeNonNumbers);
        });
        incomeAmount = document.querySelectorAll('.income-amount').forEach(function(item) {
            item.addEventListener('keydown', typeNumbers);
        });

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
        const addExpenses = additionalExpensesItem.value.toLowerCase().split(',');
        addExpenses.forEach(function(item, index) {
            item = item.trim();
            if (item !== ''){
                if (index === 0) {
                    item = item.charAt(0).toUpperCase() + item.slice(1);
                }
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
      additionalIncomes.forEach(function(item, index) {
        let itemValue = item.value.toLowerCase().trim();
        if (itemValue !== '') {
            if (index === 0) {
                item = item.charAt(0).toUpperCase() + item.slice(1);
            }
            appData.addIncome.push(itemValue);
        }
      });
    },
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
        let result = Math.ceil(targetAmount.value / appData.budgetMonth);

        if(isFinite(result)) {
            if (result > 0) {
            return result;
            } else {
            return ('Цель не будет достигнута');
            }
        } else {
            return ("Цель никогда не будет достигнута");
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
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
  };

salaryAmount.addEventListener('keydown', typeNumbers);
incomeTitle.forEach(function(item) {
    item.addEventListener('keydown', typeNonNumbers);
});
incomeAmount.forEach(function(item) {
    item.addEventListener('keydown', typeNumbers);
});
additionalIncomes.forEach(function(item) {
    item.addEventListener('keydown', typeNonNumbers);
});
expensesTitle.forEach(function(item) {
    item.addEventListener('keydown', typeNonNumbers);
});
expensesAmount.forEach(function(item) {
    item.addEventListener('keydown', typeNumbers);
});
additionalExpensesItem.addEventListener('keydown', typeNonNumbers);
targetAmount.addEventListener('keydown', typeNumbers);

appData.checkEmpty();
start.addEventListener('click', appData.start);
addExpensesButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.showPeriodValue);