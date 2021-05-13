'use strict';
const start = document.getElementById('start'),
	btnPlus = document.getElementsByTagName('button'),
	incomePlus = btnPlus[0], // + Дополнительный доход
	expensesPlus = btnPlus[1], // + Возможные расходы
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Возможный доход
	depositCheck = document.querySelector('#deposit-check'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0], // Накопления за период
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'), // Месячный доход
	additionalExpenses = document.querySelector('.additional_expenses'),
	periodSelect = document.querySelector('.period-select'), // range
	additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
	targetAmount = document.querySelector('.target-amount'); // Цель
let expensesItems = document.querySelectorAll('.expenses-items'), // Возможные расходы
	incomeItems = document.querySelectorAll('.income-items'); // Дополнительный доход

class AppData {
	constructor(budget = 0, budgetDay = 0, budgetMonth = 0, income = {}, incomeMonth = 0, addIncome = [], expenses = {}, expensesMonth = 0, addExpenses = [], deposit = false, precentDeposit = 0, moneyDeposit = 0) {
		this.budget = budget;
		this.budgetDay = budgetDay;
		this.budgetMonth = budgetMonth;
		this.income = income;
		this.incomeMonth = incomeMonth;
		this.addIncome = addIncome;
		this.expenses = expenses;
		this.expensesMonth = expensesMonth;
		this.addExpenses = addExpenses;
		this.deposit = deposit;
		this.precentDeposit = precentDeposit;
		this.moneyDeposit = moneyDeposit;
	}

	start () {
		if (start.textContent === 'Рассчитать') {
			this.getExpInc();
			this.getExpensesMonth();
			this.getAddIncomeExpenses();
			this.getBudget();
			this.showResult();
			this.blockage();
			start.textContent = 'Сбросить';
		} else {
			start.textContent = 'Рассчитать';
			this.reset();
		}
		console.dir(this);
	}

	//получение данные из блоков Обязательные расходы наименование и значение
	// Дополнительный доход
	getExpInc () {
		const count = item => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = +itemAmount;
				this.incomeMonth += startStr === 'income' ? +itemAmount : null;
			}
		};
		incomeItems.forEach(count);
		expensesItems.forEach(count);

		for (const key in this.income){
			this.incomeMonth += this.income[key];
		}
	}

	// Функция возвращает сумму всех обязательных расходов за месяц
	getExpensesMonth () {
		for (let elem in this.expenses) {
			this.expensesMonth += this.expenses[elem];
		}
	}

	// Получение данных от Возможные расходы
	// Получение данных от Возможный доход
	getAddIncomeExpenses () {
		const elem = item => {
			return item.map(el => el.trim()).filter(el => el !== '');
		};

		this.addExpenses = elem(additionalExpensesItem.value.split(','));
		this.addIncome = elem([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
	}

	// Функция возвращает Накопления за месяц (Доходы минус расходы)
	getBudget () {
		this.budget = +salaryAmount.value;
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = this.budgetMonth / 30;
	}

	// Подсчитывает за какой период будет достигнута цель
	getTargetMonth () {
		return targetAmount.value / this.budgetMonth;
	}

	showResult () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = targetAmount.value ? Math.ceil(this.getTargetMonth()) : '';
		incomePeriodValue.value = this.calcPeriod();
	}

	blockage (disabled = true) {
		document.querySelectorAll('.data input[type=text]').forEach(item => {
			item.disabled = disabled;
		});
		document.querySelector('.data input[type=checkbox]').disabled = disabled;
		incomePlus.disabled = disabled;
		expensesPlus.disabled = disabled;
	}

	reset () {
		for (let i = incomeItems.length - 1; i > 0; i--) {
			incomeItems[0].parentNode.removeChild(incomeItems[i]);
		}
		for (let i = expensesItems.length - 1; i > 0; i--) {
			expensesItems[0].parentNode.removeChild(expensesItems[i]);
		}
		incomePlus.style.display = '';
		expensesPlus.style.display = '';
		this.blockage(false);
		document.querySelectorAll('input[type=text]').forEach(item => {
			item.value = '';
		});
		periodSelect.value = document.querySelector('.period-amount').textContent = 1;

		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.expensesMonth = 0;
		this.addExpenses = [];
		this.deposit = false;
		this.precentDeposit = 0;
		this.moneyDeposit = 0;

		this.blockStart();
	}

	//Добавление блоков для Дополнительный доход
	//Добавление блоков для Обязательные расходы
	addBlocks () {
		const target = event.target;
		const startStr = target.parentNode.className;
		const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
		cloneItem.querySelector(`.${startStr}-title`).value = '';
		cloneItem.querySelector(`.${startStr}-amount`).value = '';
		target.parentNode.insertBefore(cloneItem, target);
		if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
			target.style.display = 'none';
		}
	}

	calcPeriod () {
		return this.budgetMonth * periodSelect.value;
	}

	changePeriodSelect () {
		document.querySelector('.period-amount').textContent = event.target.value;
		incomePeriodValue.value = this.calcPeriod();
	}

	blockStart () {
		start.disabled = !salaryAmount.value.trim();
	}

	check () {
		let tmpValue = event.target.value.trim();
		let target = event.target;

		const changeInputNumber = event => {
			let condition = /.+/,
				textAlert;
			if (target.placeholder === 'Наименование') {
				condition = /^[,. а-яА-ЯёЁ]+$/;
				textAlert = 'Доупускается ввод только русских букв, пробела, точки и запятой!';
			}
			if (target.placeholder === 'Сумма') {
				condition = /^[\d]+$/;
				textAlert = 'Доупускается ввод только цифр!';
			}
			if (!condition.test(event.target.value.trim()) && event.target.value.trim() !== '') {
				alert(textAlert);
				event.target.value = tmpValue;
				event.target.removeEventListener('change', changeInputNumber);
			}
			tmpValue = event.target.value.trim();
		};
		event.target.addEventListener('change', changeInputNumber);
	}

	eventsListeners () {
		this.blockStart();
		start.addEventListener('click', this.start.bind(this));
		expensesPlus.addEventListener('click', this.addBlocks);
		incomePlus.addEventListener('click', this.addBlocks);
		periodSelect.addEventListener('input', this.changePeriodSelect.bind(this));
		salaryAmount.addEventListener('input', this.blockStart);
		document.querySelectorAll('.data input').forEach(input => {
			input.addEventListener('focus', this.check);
		});
	}


}

const appData = new AppData();

appData.eventsListeners();