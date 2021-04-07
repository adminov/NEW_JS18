'use strict';

let mission = 200000;// Какую сумму хотите накопить
//let period  = 12; //месяцев

let money = +prompt('Ваш месячный доход', '50000');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пример: "Квартплата, проездной, кредит"');
let deposit = confirm('Есть ли у вас депозит в банке?');

const getTypeof = (data) => {
      console.log(data, typeof data);
};

let expenses1 = prompt('Введите обязательную статью расходов?', 'expenses1');
let amount1 = +prompt('Во сколько это обойдется?', '6000');
let expenses2 = prompt('Введите обязательную статью расходов?','expenses2');
let amount2 = +prompt('Во сколько это обойдется?', '5000');

//Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = (amount1, amount2) => {
    return amount1 + amount2;
};

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money, getExpensesMonth) => {
    return money - getExpensesMonth;
};
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));


//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
const getTargetMonth = (mission, accumulatedMonth) => {
    return mission / accumulatedMonth;
};


//budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = accumulatedMonth / 30;


//Почистить консоль логи и добавить недостающие, должны остаться:
//- вызовы функции showTypeOf
getTypeof(money);
getTypeof(addExpenses);
getTypeof(deposit);

//цель заработать
console.log('цель заработать: ' + mission);

//расходы за месяц
console.log('Расходы: ' + addExpenses.split(', '));

//- Расходы за месяц вызов getExpensesMonth
console.log('расходов за месяц: ' + getExpensesMonth(amount1, amount2));

//- Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpenses.split(', '));

// - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
console.log(' будет достигнута за месяцев: ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)));

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
