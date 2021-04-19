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

    this.getExpInc();
    this.getExpIncMonth();
    // this.getAddExpenses();
    // this.getAddIncome();
    this.getAddExpInc();
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

  addExpIncBloc (button, elem) {
    const clonedItem = elem[0].cloneNode(true),
      cls = elem[0].className;

    // Первая проверка
    console.log(`1: ${elem === incomeItems}`);

    clonedItem.querySelectorAll('input').forEach(item => {
      item.value = '';
    });

    button.before(clonedItem);

    // Вторая проверка
    console.log(`2: ${elem === incomeItems}`);

    elem = document.querySelectorAll(`.${cls}`);

    if (cls === 'income-items') {
      incomeItems = document.querySelectorAll(`.${cls}`);

      console.log(incomeItems);
    }
    if (cls === 'expenses-items') {
      expensesItems = document.querySelectorAll(`.${cls}`);

      console.log(expensesItems);
    }

    // Третья проверка
    console.log(elem);
    console.log(incomeItems);
    console.log(`3. ${elem === incomeItems}`);

    this.typeCheck();

    if(elem.length === 3) {
      button.style.display = 'none';
    }
  }

  getExpInc () {
    const count = (item) => {
      const strBegin = item.className.split('-')[0],
        itemAmount = item.querySelector(`.${strBegin}-amount`).value;

      let itemTitle = item.querySelector(`.${strBegin}-items > .${strBegin}-title`).value.toLowerCase().trim();

      if (itemTitle !== '' && itemAmount !== '') {
            itemTitle = this.capitalize(itemTitle);
            this[strBegin][itemTitle] = +itemAmount;
        }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);
  }

  // getAddExpenses () {
  //   const addExpenses = additionalExpensesItem.value.toLowerCase().split(',');
  //   addExpenses.forEach((item, index) => {
  //       item = item.trim();
  //       if (item !== ''){
  //           if (index === 0) {
  //               item = this.capitalize(item);
  //           }
  //           this.addExpenses.push(item);
  //       }
  //   });
  // }

  // getAddIncome () {
  //   additionalIncomes.forEach((item, index) => {
  //     let itemValue = item.value.toLowerCase().trim();
  //     if (itemValue !== '') {
  //         if (index === 0) {
  //             itemValue = this.capitalize(itemValue);
  //         }
  //         this.addIncome.push(itemValue);
  //     }
  //   });
  // }

  getAddExpInc () {
    const addExpenses = additionalExpensesItem.value.toLowerCase().split(',');

    const pushItems = (item, index, array) => {
      let f = 0;
      if (array === addExpenses) {
        item = item.trim();
        f = 1;
      }
      if (array === additionalIncomes) {
        item = item.value.toLowerCase().trim();
        f = 2;
      }

      if (item !== '') {
        if (index === 0) {
            item = this.capitalize(item);
        }

        if (f === 1){
          this.addExpenses.push(item);
        }
        if (f === 2) {
          this.addIncome.push(item);
        }
      }
    };

    addExpenses.forEach(pushItems);
    additionalIncomes.forEach(pushItems);
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
    addExpensesButton.addEventListener('click', () => this.addExpIncBloc(addExpensesButton, expensesItems));
    addIncomeButton.addEventListener('click', () => this.addExpIncBloc(addIncomeButton, incomeItems));
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
