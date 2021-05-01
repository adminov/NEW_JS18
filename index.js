'use strict';
// let isNumber = (n) => {
// 	return !isNaN(parseFloat(n)) && isFinite(n);
// };
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
	expensesPlus = btnPlus[1];
//----------------------------------------------------------------------------

let appData = {
	income: {}, //доп доход
	addIncome: [],
	expenses: {},
	addExpenses: [],//допол, расходов
	deposit: false, //депозит в банке
	percentDeposit: 0,
	moneyDeposit: 0,
	incomeMoth: 0,
	//mission: 200000,
	//period: 5,
	budget: 0, // Доход за месяц
	budgetDay: 0, // Доход за день
	budgetMonth: 0, //обязательных расходов за месяц
	expensesMonth: 0,
	beforeStart: () => {
		if (salaryAmount.value === ''){
			alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
			return;
		}
	},
	start: () => {
		if (!appData.beforeStart()) {
			appData.budget = +salaryAmount.value;
			appData.getExpenses();
			appData.getIncome();
			appData.getExpensesMonth();
			appData.getAddExpenses();
			appData.getAddIncome();
			appData.getBudget();
			appData.showResult();
		}
	},

	//вывод результаты на экран для пользователей
	showResult: () => {
		budgetMonth.value = appData.budgetMonth;
		budgetDay.value = appData.budgetDay;
		expensesMonth.value = appData.expensesMonth;
		additionalExpenses.value = appData.addExpenses.join(', ');
		additionalIncome.value = appData.addIncome.join(', ');
		incomePeriod.value = appData.calcPeriod();
		targetMonths.value = appData.getTargetMonth();
	},

	//Добавление блоков для Обязательные расходы
	addExpensesBlock: () => {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		cloneExpensesItem.querySelector('.expenses-title').value = '';
		cloneExpensesItem.querySelector('.expenses-amount').value = '';
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3){
			expensesPlus.style.display = 'none';
		}
	},
	//получение данные из блоков Обязательные расходы наименование и значение
	getExpenses: () => {
		expensesItems.forEach(function (item){
			let itemExpenses = item.querySelector('.expenses-title').value;
			let amountExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && amountExpenses !== ''){
				appData.expenses[itemExpenses] = amountExpenses;
			}
		});
	},
	//Добавление блоков для Дополнительный доход
	addIncomeBlock: () => {
		let cloneExpensesItem = incomeItems[0].cloneNode(true);
		cloneExpensesItem.querySelector('.income-title').value = '';
		cloneExpensesItem.querySelector('.income-amount').value = '';
		incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3){
			incomePlus.style.display = 'none';
		}
	},
	// Дополнительный доход
	getIncome: () => {
		incomeItems.forEach((item) => {
			let titleIncome = item.querySelector('.income-title').value;
			let amountIncome = item.querySelector('.income-amount').value;
			if (titleIncome !== '' && amountIncome !== ''){
				appData.income[titleIncome] = amountIncome;
			}
		});

		for (let key in appData.income){
			appData.incomeMoth += +appData.income[key];
		}
	},
	// Получение данных от Возможные расходы
	getAddExpenses: () => {
		let addExpense = additionalExpensesItem.value.split(',');
		addExpense.forEach((item) => {
			item = item.trim();
			if (item !== ''){
				appData.addExpenses.push(item);
			}
		});

	},
	// Получение данных от Возможный доход
	getAddIncome: () => {
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== ''){
				appData.addIncome.push(itemValue);
			}
		});
	},
	changeRangeValue: () => {
		let itemPeriodSelect = periodSelect.value;
		let periodAmount = document.querySelector('.period-amount');
		periodAmount.textContent = itemPeriodSelect;
		incomePeriod.value = appData.calcPeriod();
	},
	// Функция возвращает сумму всех обязательных расходов за месяц
	getExpensesMonth: () => {
		for (let key in appData.expenses){
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	// Функция возвращает Накопления за месяц (Доходы минус расходы)
	getBudget: () => {
		appData.budgetMonth = appData.budget + appData.incomeMoth - appData.expensesMonth;
		appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
	},
	// Подсчитывает за какой период будет достигнута цель
	getTargetMonth: () => {
		return Math.ceil(targetAmount.value / appData.budgetMonth);
	},
	calcPeriod: () => {
		return appData.budgetMonth * +periodSelect.value;
	}
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changeRangeValue);

//проверка только на число
const isNumber = (e) =>{
	let tmpVal = e.target.value;
	const changeInputNum = (event) =>{
		if (!/^[\d]+$/.test(e.target.value)){
			alert('Ввод только цифр!');
			event.target.value = tmpVal;
			event.target.removeEventListener('change', changeInputNum);
		}
		tmpVal = event.target.value;
	};
	e.target.addEventListener('change', changeInputNum);
};

document.querySelectorAll('[placeholder="Сумма"]').forEach((i) => {
	i.addEventListener('focus', isNumber);
});

//проверка на букв, пробел, точки и запятой
const isString = (e) => {
	let tmpStr = e.target.value;
	const changeInputStr = (event) => {
		if (!/^[,. а-яА-ЯёЁ]+$/.test(event.target.value)){
			alert('Ввод только русских букв, пробелы, точки и запятой!');
			event.target.value = tmpStr;
			event.target.removeEventListener('change', changeInputStr);
		}
		tmpStr = event.target.value;
	};
	e.target.addEventListener('change', changeInputStr);
};

document.querySelectorAll('[placeholder="Наименование"]').forEach((i) => {
	i.addEventListener('focus', isString);
});