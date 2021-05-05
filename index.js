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
	budget: 0, // Доход за месяц
	budgetDay: 0, // Доход за день
	budgetMonth: 0, //обязательных расходов за месяц
	expensesMonth: 0,
	start: () => {
		if (salaryAmount.value.trim() !== '') {
			appData.budget = +salaryAmount.value;
			appData.getExpenses();
			appData.getIncome();
			appData.getExpensesMonth();
			appData.getAddExpenses();
			appData.getAddIncome();
			appData.getBudget();
			appData.showResult();
		} else {alert('Ошибка, поле "Месячный доход" должно быть заполнено!');}
	},
	//вывод результаты на экран для пользователей
	showResult: () => {
		budgetMonth.value = appData.budgetMonth;
		budgetDay.value = Math.floor(appData.budgetDay);
		expensesMonth.value = appData.expensesMonth;
		additionalExpenses.value = appData.addExpenses.join(', ');
		additionalIncome.value = appData.addIncome.join(', ');
		targetMonths.value = Math.ceil(appData.getTargetMonth());
		incomePeriod.value = appData.calcPeriod();
	},

	//Добавление блоков для Обязательные расходы
	addExpensesBlock: () => {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3){
			expensesPlus.style.display = 'none';
		}
	},

	//Добавление блоков для Дополнительный доход
	addIncomeBlock: () => {
		let cloneExpensesItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3){
			incomePlus.style.display = 'none';
		}
	},
	//получение данные из блоков Обязательные расходы наименование и значение
	getExpenses: () => {
		expensesItems.forEach(function (item){
			let itemExpenses = item.querySelector('.expenses-title').value;
			let amountExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && amountExpenses !== ''){
				appData.expenses[itemExpenses] = +amountExpenses;
			}
		});
	},
	// Дополнительный доход
	getIncome: () => {
		incomeItems.forEach((item) => {
			let titleIncome = item.querySelector('.income-title').value;
			let amountIncome = item.querySelector('.income-amount').value;
			if (titleIncome !== '' && amountIncome !== ''){
				appData.income[titleIncome] = +amountIncome;
				appData.incomeMoth += +amountIncome;
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
		appData.expensesMonth = 0;
		for (let key in appData.expenses){
			appData.expensesMonth += appData.expenses[key];
		}
	},
	// Функция возвращает Накопления за месяц (Доходы минус расходы)
	getBudget: () => {
		appData.budgetMonth = appData.budget + appData.incomeMoth - appData.expensesMonth;
		appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
	},
	// Подсчитывает за какой период будет достигнута цель
	getTargetMonth: () => {
		let num = 0;
		if (isNumber(targetAmount.value)){
			num = targetAmount.value / appData.budgetMonth;
		}
		return num;
	},
	calcPeriod: () => {
		return appData.budgetMonth * +periodSelect.value;
	},
	// beforeStart: () => {
	// 	if (salaryAmount.value.trim() === ''){
	// 		alert('Введите сумма в (Месячный доход)');
	// 	}
	// 	return appData.start();
	// }
};
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changeRangeValue);
