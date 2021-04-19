'use strict';

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
  periodSelect = document.querySelector('.period-select');

class AppData {
  constructor() {
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
  }

  checkEmpty () {
    start.disabled = true;
    start.style.cursor = 'not-allowed';
    salaryAmount.addEventListener('keyup', () => {
        if (salaryAmount.value.trim() !== '') {
            start.disabled = false;
            start.style.cursor = 'pointer';
        } else {
            start.disabled = true;
            start.style.cursor = 'not-allowed';
        }
    });
  }

  typeCheck () {
    document.querySelectorAll('input[placeholder="Сумма"]').forEach((item) => {
        item.addEventListener('input', this.typeNumbers);
    });
    document.querySelectorAll('input[placeholder="Наименование"]').forEach((item) => {
        item.addEventListener('input', this.typeNonNumbers);
    });
  }

  start () {
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
  }

  reset () {
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

    periodSelect.value = 1;
    document.querySelector('.period-amount').textContent = '1';

    document.querySelectorAll('input:not(.period-select)').forEach(item => {
      if (!item.closest('.result')){
        item.disabled = false;
      }
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
    });
    addExpensesButton.style.display = 'inline-block';

    incomeItems.forEach((item, index) => {
      if (index === 0) {
        return;
      }
      item.remove();
    });
    addIncomeButton.style.display = 'inline-block';

    this.checkEmpty();
  }

  addExpensesBlock () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelectorAll('input').forEach((item) => {
        item.value = '';
    });

    addExpensesButton.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');

    this.typeCheck();

    if (expensesItems.length === 3) {
        addExpensesButton.style.display = 'none';
    }
  }

  addIncomeBlock () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);

    cloneIncomeItem.querySelectorAll('input').forEach((item) => {
        item.value = '';
    });
    
    addIncomeButton.before(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');

    this.typeCheck();

    if (incomeItems.length === 3) {
        addIncomeButton.style.display = 'none';
    }
  }

  getExpenses () {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-items > .expenses-title').value.toLowerCase().trim(),
            cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            itemExpenses = this.capitalize(itemExpenses);
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
  }

  getIncome () {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-items > .income-title').value.toLowerCase().trim(),
            cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            itemIncome = this.capitalize(itemIncome);
            this.income[itemIncome] = +cashIncome;
        }
    });
  }

  getAddExpenses () {
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
  }

  getAddIncome () {
    additionalIncomes.forEach((item, index) => {
      let itemValue = item.value.toLowerCase().trim();
      if (itemValue !== '') {
          if (index === 0) {
              itemValue = this.capitalize(itemValue);
          }
          this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth () {
    for (let key in this.expenses){
      this.expensesMonth += +this.expenses[key]; 
    }
  }

  getIncomeMonth () {
    for (let key in this.income){
      this.incomeMonth += +this.income[key]; 
    }
  }

  getBudget () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth () {
    let result = Math.ceil(targetAmount.value / this.budgetMonth);

    if(isFinite(result)) {
        if (result > 0) {
        return result;
        } else if (targetAmount.value === '') {
        return ('Вы не указали цель');
        } else {
          return ('Цель не будет достигнута');
        }
    } else {
        return ("Цель никогда не будет достигнута");
    }
  }

  calcSavedMoney () {
    return this.budgetMonth * periodSelect.value;
  }

  showPeriodValue () {
    document.querySelector('.period-amount').textContent = periodSelect.value;
  }

  capitalize (item) {
    item = item.charAt(0).toUpperCase() + item.slice(1);

    return item;
  }

  showResult () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcSavedMoney());
  }

  eventListeners () {
    this.checkEmpty();
    this.typeCheck();

    start.addEventListener('click', () => this.start());
    cancel.addEventListener('click', () => this.reset());
    addExpensesButton.addEventListener('click', () => this.addExpensesBlock());
    addIncomeButton.addEventListener('click', () => this.addIncomeBlock());
    periodSelect.addEventListener('input', () => this.showPeriodValue());
  }

  isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  typeNumbers (event) {
    const input = event.target;
    
    input.value = input.value.replace((/[^\d]/), '');
  }

  typeNonNumbers (event) {
    const input = event.target;
    
    input.value = input.value.replace((/[\d]/), '');
  }
}

const appData = new AppData();
appData.eventListeners();
