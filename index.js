'use strict';
let isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
//
// let isStr = (str, reg = false) => {
// 	const regexp = reg ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
// 	return regexp.test(str);
// };
let budgetMonth = document.getElementsByClassName('budget_month-value')[0];
let	budgetDay = document.getElementsByClassName('budget_day-value')[0];
let	expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let	additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let	additionalIncome = document.getElementsByClassName('additional_income-value')[0];
let	incomePeriod = document.getElementsByClassName('income_period-value')[0];
let	targetMonths = document.getElementsByClassName('target_month-value')[0];

//---------------------------------------------------------------------------------------
let incomeItems = document.querySelectorAll('.income-items');
let salaryAmount = document.querySelector('.salary-amount'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select');

//---------------------------------------------------------------------------------------
let start = document.getElementById('start');
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let btnPlus = document.getElementsByTagName('button'),
	incomePlus = btnPlus[0],
	expensesPlus = btnPlus[1],
	cancel = document.getElementById('cancel'),
	resetAddExpenses = document.querySelector('[placeholder="название"]'),
	btnPluses = document.querySelectorAll('.btn_plus');
let periodAmount = document.querySelector('.period-amount');
//----------------------------------------------------------------------------

const AppData = function () {
	this.income = {}; //доп доход
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = []; //допол, расходов
	this.deposit = false; //депозит в банке
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
	this.incomeMoth = 0;
	this.budget = 0; // Доход за месяц
	this.budgetDay = 0; // Доход за день
	this.budgetMonth = 0; //обязательных расходов за месяц
	this.expensesMonth = 0;
};

AppData.prototype.start = function() {
	if (salaryAmount.value.trim() !== '') {
		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.showResult();

		//Блокировать все input[type=text]
		let data = document.querySelectorAll('[type="text"]');
		data.forEach((i) => {
			i.disabled = true;
		});

		btnPluses.forEach((i) => {
			i.disabled = true;
		});

		depositCheck.disabled = true;
		periodSelect.disabled = true;

		if (start) {
			start.style.display = 'none';
			cancel.style.display = 'inline';
		}
	} else {alert('Ошибка, поле "Месячный доход" должно быть заполнено!');}
};

AppData.prototype.showResult = function() {
	const _this = this;
	budgetMonth.value = this.budgetMonth;
	budgetDay.value = Math.floor(this.budgetDay);
	expensesMonth.value = this.expensesMonth;
	additionalExpenses.value = this.addExpenses.join(', ');
	additionalIncome.value = this.addIncome.join(', ');
	targetMonths.value = Math.ceil(this.getTargetMonth());
	incomePeriod.value = this.calcPeriod();
	periodSelect.addEventListener('change', function() {
		incomePeriod.value = _this.calcPeriod();
	});
};

//Добавление блоков для Обязательные расходы
AppData.prototype.addExpensesBlock = function() {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
	expensesItems = document.querySelectorAll('.expenses-items');
	if (expensesItems.length === 3){
		expensesPlus.style.display = 'none';
	}
};

//Добавление блоков для Дополнительный доход
AppData.prototype.addIncomeBlock = function() {
	let cloneExpensesItem = incomeItems[0].cloneNode(true);
	incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomePlus);
	incomeItems = document.querySelectorAll('.income-items');
	if (incomeItems.length === 3){
		incomePlus.style.display = 'none';
	}
};
//получение данные из блоков Обязательные расходы наименование и значение
AppData.prototype.getExpenses = function() {
	const _this = this;
	expensesItems.forEach(function (item){
		let itemExpenses = item.querySelector('.expenses-title').value;
		let amountExpenses = item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && amountExpenses !== ''){
			_this.expenses[itemExpenses] = +amountExpenses;
		}
	});
};

// Дополнительный доход
AppData.prototype.getIncome = function() {
	const _this = this;
	incomeItems.forEach(function(item){
		let titleIncome = item.querySelector('.income-title').value;
		let amountIncome = item.querySelector('.income-amount').value;
		if (titleIncome !== '' && amountIncome !== ''){
			_this.income[titleIncome] = +amountIncome;
			_this.incomeMoth += +amountIncome;
		}
	});

	for (let key in this.income){
		this.incomeMoth += +this.income[key];
	}
};

// Получение данных от Возможные расходы
AppData.prototype.getAddExpenses = function() {
	const _this = this;
	let addExpense = additionalExpensesItem.value.split(',');
	addExpense.forEach( function(item){
		item = item.trim();
		if (item !== ''){
			_this.addExpenses.push(item);
		}
	});
};

// Получение данных от Возможный доход
AppData.prototype.getAddIncome = function() {
	const _this = this;
	additionalIncomeItem.forEach(function(item){
		let itemValue = item.value.trim();
		if (itemValue !== ''){
			_this.addIncome.push(itemValue);
		}
	});
};

AppData.prototype.changeRangeValue = function() {
	let itemPeriodSelect = periodSelect.value;
	periodAmount.textContent = itemPeriodSelect;
};

// Функция возвращает сумму всех обязательных расходов за месяц
AppData.prototype.getExpensesMonth = function() {
	this.expensesMonth = 0;
	for (let key in this.expenses){
		this.expensesMonth += this.expenses[key];
	}
};

// Функция возвращает Накопления за месяц (Доходы минус расходы)
AppData.prototype.getBudget = function() {
	this.budgetMonth = this.budget + this.incomeMoth - this.expensesMonth;
	this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

// Подсчитывает за какой период будет достигнута цель
AppData.prototype.getTargetMonth = function() {
	let num = 0;
	if (isNumber(targetAmount.value)){
		num = targetAmount.value / this.budgetMonth;
	}
	return num;
};

AppData.prototype.calcPeriod = function() {
	return this.budgetMonth * +periodSelect.value;
};

AppData.prototype.cancel = function () {
	let resetName = document.querySelectorAll('[placeholder="Наименование"]'),
		resetSalary = document.querySelectorAll('[placeholder="Сумма"]');

	budgetMonth.value = '';
	budgetDay.value = '';
	expensesMonth.value = '';
	additionalExpenses.value = '';
	additionalIncome.value = '';
	incomePeriod.value = '';
	targetMonths.value = '';

	//заблокировать все input[type=text]
	let data = document.querySelectorAll('[type="text"]');
	data.forEach(function(i){
		i.disabled = false;
	});

	resetName.forEach(function(i){
		i.value = '';
	});

	resetSalary.forEach(function(i){
		i.value = '';
	});

	btnPluses.forEach(function(i){
		i.disabled = false;
	});

	resetAddExpenses.value = '';

	periodSelect.value = '1';

	periodAmount.textContent = '1';

	if (cancel) {
		cancel.style.display = 'none';
		start.style.display = 'inline';
	}

	let expensesItems = document.querySelectorAll('.expenses-items');
	for (let i = 1; i < expensesItems.length; i++){
		expensesItems[i].parentNode.removeChild(expensesItems[i]);
		expensesPlus.style.display = '';
	}


	let incomeItems = document.querySelectorAll('.income-items');
	for (let i = 1; i < incomeItems.length; i++){
		incomeItems[i].parentNode.removeChild(incomeItems[i]);
		incomePlus.style.display = '';
	}


	depositCheck.disabled = false;
	periodSelect.disabled = false;

	this.income = {}; //доп доход
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = [];//допол, расходов
	this.deposit = false; //депозит в банке
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
	this.incomeMoth = 0;
	this.budget = 0; // Доход за месяц
	this.budgetDay = 0; // Доход за день
	this.budgetMonth = 0; //обязательных расходов за месяц
	this.expensesMonth = 0;

};

AppData.prototype.eventsListeners = function () {
	start.addEventListener('click', appData.start.bind(appData));
	expensesPlus.addEventListener('click', appData.addExpensesBlock);
	incomePlus.addEventListener('click', appData.addIncomeBlock);
	periodSelect.addEventListener('input', appData.changeRangeValue);
	cancel.addEventListener('click', appData.cancel);
};

const appData = new AppData();
appData.eventsListeners();

