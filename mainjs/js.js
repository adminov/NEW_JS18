'use strict';

let mission = 200000;// Какую сумму хотите накопить
//let period  = 12; //месяцев

let money = +prompt('Ваш месячный доход', '50000');

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пример: "Квартплата, проездной, кредит"');

let deposit = confirm('Есть ли у вас депозит в банке?');

const getTypeof = (data) => {
      console.log(data, typeof data);
};

getTypeof(money);
getTypeof(addExpenses);
getTypeof(deposit);

//let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?', '6000');
//let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?', '5000');

//цель заработать
console.log('цель заработать: ' + mission);
//расходы за месяц
console.log('Расходы: ' + addExpenses.split(', '));

//Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = (amount1, amount2) => {
    return amount1 + amount2;
};
console.log('расходов за месяц: ' + Math.ceil(getExpensesMonth(amount1, amount2)));

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money, getExpensesMonth) => {
    return money - getExpensesMonth;
};
console.log(getAccumulatedMonth(money, getExpensesMonth));


//Цель будет
console.log('цель будет достигнута: ' + Math.ceil(mission / getExpensesMonth) + ' мясяцев');
// бюджет на день
let budgetDay = getExpensesMonth / 30;
console.log('бюджет на день: ' + Math.floor(budgetDay));


const getStatusIncome = () => {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода')
    } else if (budgetDay >= 600 || budgetDay <= 1200) {
        return ('У вас средний уровень дохода')
    } else if (budgetDay >= 0 || budgetDay <= 600) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else if (budgetDay <= 0){
        return ('Что то пошло не так')
    }
};


console.log(getStatusIncome());
