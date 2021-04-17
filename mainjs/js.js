'use strict';
let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход', '50000');
        } while (!isNumber(money));
        appData.budget = money;
    };
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 200000,
    period: 5,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пример: "Квартплата, проездной, кредит"');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }
};

//Добавить проверку что введённые данные являются числом, которые мы получаем
// на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
let expenses = [];
const getExpensesMonth = () => {
    let sum = 0;
    let sums;
    for(let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?', 'expenses1');
        do {
            sums = prompt('Во сколько это обойдется?', '6000');
        }
        while (isNaN(sums) || sums === ' ' || sums === null)

        sum += +sums
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
const getTargetMonth = function() {
    return appData.mission / getAccumulatedMonth;
};

let getTargetMonthMoney = getTargetMonth();


//budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = getAccumulatedMonth() / 30;


//цель заработать
console.log('цель заработать: ' + appData.mission);

//расходы за месяц
console.log('Расходы: ' + appData.addExpenses);

//- Расходы за месяц вызов getExpensesMonth
console.log('расходов за месяц: ' + expensesAmount);

// - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
// 3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”
(Math.ceil(getTargetMonthMoney) >= 0) ?
    console.log('будет достигнута за месяцев: ' + Math.ceil(getTargetMonthMoney)) :
    console.log('Цель не будет достигнута');

//- Бюджет на день (budgetDay)
console.log('бюджет на день: ' + Math.floor(budgetDay));

const getStatusIncome = () => {
    if (budgetDay >= 1200){
        console.log('У вас высокий уровень дохода')
    } else if (budgetDay >= 600) {
        console.log('У вас средний уровень дохода')
    } else if (budgetDay >= 0){
        console.log('К сожалению у вас уровень дохода ниже среднего')
    } else {
        console.log('Что то пошло не так')
    }
};

getStatusIncome();