'use strict';

let mission = 200000;// Какую сумму хотите накопить
//let period  = 12; //месяцев

let money = prompt('Ваш месячный доход');
let moneyInt = Number(money);
console.log(typeof moneyInt);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пример: "Квартплата, проездной, кредит"');
let re = /\s*"";\s*/;
let deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);

//let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
//let expenses2 = +prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

//цель заработать
console.log('цель заработать: ' + mission);
//расходы за месяц
console.log('Расходы: ' + addExpenses.split('re'));
//Бюджет на месяц
let budgetMonth = moneyInt - (amount1 + amount2);
console.log('Бюджет на месяц: ' + Math.ceil(budgetMonth));
//Цель будет
console.log('цель будет достигнута: ' + Math.ceil(mission / budgetMonth) + ' мясяцев');
// бюджет на день
let budgetDay = budgetMonth / 30;
console.log('бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода')
} else if (budgetDay >= 600 || budgetDay <= 1200) {
    console.log('У вас средний уровень дохода')
} else if (budgetDay >= 0 || budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего')
} else if (budgetDay <= 0){
    console.log('Что то пошло не так')
}

