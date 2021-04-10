'use strict';
let isNumber = (n) => {
    console.log(n);
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let mission = 200000;// Какую сумму хотите накопить
//let period  = 12; //месяцев

let money;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пример: "Квартплата, проездной, кредит"');
let deposit = confirm('Есть ли у вас депозит в банке?');

const getTypeof = (data) => {
    console.log(data, typeof data);
};


do {
    money = +prompt('Ваш месячный доход', '50000');
} while (!isNumber(money));

//Добавить проверку что введённые данные являются числом, которые мы получаем
// на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
let expenses = [];
const getExpensesMonth = () => {
    let sum = 0;
    for(let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?', 'expenses1');
        //Такой способ используется для инкапсуляция когда хотим изолировать код от окружающих
        sum += (() =>{
            let sums = 0;
            do {
                sums = prompt('Во сколько это обойдется?', '6000');
            } while (!isNumber(sums));
            return +sums;
        })();
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money, expensesAmount) => {
    return money - expensesAmount;
};
const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
const getTargetMonth = (mission, accumulatedMonth) => {
    return mission / accumulatedMonth;
};

let getTargetMonthMoney = getTargetMonth(mission, accumulatedMonth);


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
console.log('расходов за месяц: ' + expensesAmount);

//- Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpenses.split(', '));

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