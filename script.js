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
  periodSelect = document.querySelector('.period-select'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

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
    document.querySelectorAll('input[placeholder="Сумма"], input[placeholder="Процент"]').forEach((item) => {
        item.addEventListener('input', this.typeNumbers);
    });
    document.querySelectorAll('input[placeholder="Наименование"]').forEach((item) => {
        item.addEventListener('input', this.typeNonNumbers);
    });
  }

  start () {
    this.budget = +salaryAmount.value.trim();

    if (this.percentChecker()) {
      this.getExpInc();
      this.getExpIncMonth();
      this.getAddExpInc();
      this.getInfoDeposit();
      this.getBudget();

      this.showResult();

      document.querySelectorAll('input:not(.period-select)').forEach(item => item.disabled = true);
      start.style.display = 'none';
      cancel.style.display = 'inline-block';

      document.querySelectorAll('button:not(#cancel)').forEach(item => item.disabled = true);

      depositBank.disabled = true;
    } else {
      this.checkWrongPercent();
    }
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
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');

    const deleteLists = (elem, btn) =>  {
      elem.forEach((item, index) => {
        if (index === 0) {
          return;
        }
        item.remove();
      });
      btn.style.display = 'inline-block';
    };

    deleteLists(expensesItems, addExpensesButton);
    deleteLists(incomeItems, addIncomeButton);

    depositBank.disabled = false;

    depositCheckbox.checked = false;
    this.depositUnchecker();

    this.checkEmpty();
  }

  addExpIncBlock (elem, selector, btn) {
    const cloneExpensesItem = elem[0].cloneNode(true);

    cloneExpensesItem.querySelectorAll('input').forEach((item) => {
        item.value = '';
    });

    btn.before(cloneExpensesItem);
    elem = document.querySelectorAll(selector);

    this.typeCheck();

    if (elem.length === 3) {
        btn.style.display = 'none';
    }
  }

  getExpInc () {
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');

    const count = item => {
      const strBegin = item.className.split('-')[0],
        itemAmount = item.querySelector(`.${strBegin}-amount`).value;

      let itemTitle = item.querySelector(`.${strBegin}-title`).value.toLowerCase().trim();

      if (itemTitle !== '' && itemAmount !== '') {
        itemTitle = this.capitalize(itemTitle);
        this[strBegin][itemTitle] = +itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);
  }

  getAddExpInc () {
    const addExpenses = additionalExpensesItem.value.toLowerCase().split(', '),
      addIncome = [],
      pushItems = (array, appArray) => {
        array.forEach((item, index) => {
          if (item) {
            index === 0 ? item = this.capitalize(item) : false;
            appArray.push(item);
          }
        });
      };

    additionalIncomes.forEach(item => item.value.trim() && addIncome.push(item.value.toLowerCase().trim()));
    pushItems(addExpenses, this.addExpenses);
    pushItems(addIncome, this.addIncome);
  }

  getExpIncMonth () {
    const calcMonth = (item) => {
      let total = 0;
      for (let key in item) {
        total += +item[key]; 
      }

      return total;
    };

    this.expensesMonth = calcMonth(this.expenses);
    this.incomeMonth = calcMonth(this.income);
  }

  getBudget () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + this.moneyDeposit * (this.percentDeposit / 100);
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
    return item.charAt(0).toUpperCase() + item.slice(1);
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

  getInfoDeposit () {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent () {
    const selectValue = this.value;

    if (selectValue === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = selectValue;
    }
  }

  depositHandler () {
    if (depositCheckbox.checked) {
      this.deposit = true;

      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';

      depositBank.addEventListener('change', this.changePercent);
    } else {
      this.depositUnchecker();
    }
  }

  depositUnchecker () {
    this.deposit = false;

    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';

    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';

    depositBank.removeEventListener('change', this.changePercent);
  }

  eventListeners () {
    this.checkEmpty();
    this.typeCheck();

    start.addEventListener('click', () => this.start());
    cancel.addEventListener('click', () => this.reset());
    addExpensesButton.addEventListener('click', () => this.addExpIncBlock(expensesItems, '.expenses-items', addExpensesButton));
    addIncomeButton.addEventListener('click', () => this.addExpIncBlock(incomeItems, '.income-items', addIncomeButton));
    periodSelect.addEventListener('input', () => this.showPeriodValue());
    depositCheckbox.addEventListener('change', () => this.depositHandler());
  }

  isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  percentChecker () {
    if(depositPercent.value < 0 || depositPercent.value > 100) {
      alert('Введите значение процента от 0 до 100');
      return false;
    }
    return true;
  }

  checkWrongPercent () {
    start.disabled = true;
    start.style.cursor = 'not-allowed';
    depositPercent.addEventListener('input', () => {
      if (depositPercent.value >= 0 && depositPercent.value <= 100) {
          start.disabled = false;
          start.style.cursor = 'pointer';
      } else {
          start.disabled = true;
          start.style.cursor = 'not-allowed';
      }
    });
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