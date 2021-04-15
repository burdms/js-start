'use strict';

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function typeNumbers(event){
  const input = event.target;
  
  input.value = input.value.replace((/[^\d]/), '');
}

function typeNonNumbers(event){
  const input = event.target;
  
  input.value = input.value.replace((/[\d]/), '');
}

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
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
    typeCheck: function() {
        document.querySelectorAll('input[placeholder="Сумма"]').forEach(function(item) {
            item.addEventListener('input', typeNumbers);
        });
        document.querySelectorAll('input[placeholder="Наименование"]').forEach(function(item) {
            item.addEventListener('input', typeNonNumbers);
        });
    },
    start: function() {
        this.budget = +salaryAmount.value.trim();

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        document.querySelectorAll('input:not(.period-select)').forEach(item => item.disabled = true);
        start.style.display = 'none';
        cancel.style.display = 'inline-block';

        document.querySelectorAll('button:not(#cancel)').forEach(item => item.disabled = true);
    },
    reset: function() {
      salaryAmount.value = '';
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.incomeMonth = 0;
      this.income = {};
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;

      document.querySelectorAll('.result > input').forEach(item => {
        item.value = '';
      });

      periodSelect.value = 1;
      document.querySelector('.period-amount').textContent = '1';

      document.querySelectorAll('input:not(.period-select)').forEach(item => {
        item.disabled = false;
        item.value = '';
      });
      start.style.display = 'inline-block';
      cancel.style.display = 'none';

      document.querySelectorAll('button:not(#cancel)').forEach(item => item.disabled = false);

      expensesItems.forEach((item, index) => {
        if (index === 0) {
          return;
        }
        item.remove();
        addExpensesButton.style.display = 'inline-block';
      });

      incomeItems.forEach((item, index) => {
        if (index === 0) {
          return;
        }
        item.remove();
        addIncomeButton.style.display = 'inline-block';
      });

      this.checkEmpty();
    },
    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
            item.value = '';
        });

        addExpensesButton.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        this.typeCheck();

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

        this.typeCheck();

        if (incomeItems.length === 3) {
            addIncomeButton.style.display = 'none';
        }
    },
    getExpenses: function (){
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-items > .expenses-title').value.toLowerCase().trim(),
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                itemExpenses = this.capitalize(itemExpenses);
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-items > .income-title').value.toLowerCase().trim(),
                cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                itemIncome = this.capitalize(itemIncome);
                this.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        const addExpenses = additionalExpensesItem.value.toLowerCase().split(',');
        addExpenses.forEach((item, index) => {
            item = item.trim();
            if (item !== ''){
                if (index === 0) {
                    item = this.capitalize(item);
                }
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
      additionalIncomes.forEach((item, index) => {
        let itemValue = item.value.toLowerCase().trim();
        if (itemValue !== '') {
            if (index === 0) {
                itemValue = this.capitalize(itemValue);
            }
            this.addIncome.push(itemValue);
        }
      });
    },
    getExpensesMonth: function() {
      for (let key in this.expenses){
        this.expensesMonth += +this.expenses[key]; 
      }
    },
    getIncomeMonth: function() {
      for (let key in this.income){
        this.incomeMonth += +this.income[key]; 
      }
    },
    getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        let result = Math.ceil(targetAmount.value / this.budgetMonth);

        if(isFinite(result)) {
            if (result > 0) {
            return result;
            } else if (result === 0) {
            return ('Вы не указали цель');
            } else {
              return ('Цель не будет достигнута');
            }
        } else {
            return ("Цель никогда не будет достигнута");
        }
    },
    calcSavedMoney: function() {
      return this.budgetMonth * periodSelect.value;
    },
    showPeriodValue: function() {
        document.querySelector('.period-amount').textContent = periodSelect.value;
    },
    capitalize: function(item) {
      item = item.charAt(0).toUpperCase() + item.slice(1);

      return item;
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcSavedMoney());
    },
  };


appData.checkEmpty();
appData.typeCheck();

start.addEventListener('click', () => appData.start());
cancel.addEventListener('click', () => appData.reset());
addExpensesButton.addEventListener('click', () => appData.addExpensesBlock());
addIncomeButton.addEventListener('click', () => appData.addIncomeBlock());
periodSelect.addEventListener('input', () => appData.showPeriodValue());