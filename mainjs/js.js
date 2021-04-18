'use strict';
let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isStr = (str, reg = false) => {
    const regexp = reg ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
    return regexp.test(str);
};

let appData = {
    income: {}, //доп доход
    addIncome: [],
    expenses: {},
    addExpenses: [],//допол, расходов
    deposit: false, //депозит в банке
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 5,
    budget: 0, // Доход за месяц
    budgetDay: 0, // Доход за день
    budgetMonth: 0, //обязательных расходов за месяц
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка')){
            let itemIncome = '';
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
            }while (!isStr(itemIncome));

            let cashIncome = '';
            do {
                cashIncome = prompt('Сколько в месяц вы зарабатываете', '10000');
                appData.income[itemIncome] = cashIncome;
            }while (!isNumber(cashIncome))
        }
        let addExpenses = '';
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
        } while (!isStr(addExpenses, true));
        appData.addExpenses = addExpenses.charAt(0).toUpperCase() + addExpenses.substring(1);

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        //------------------------------------------------------------------
        for (let i = 0; i < 2; i++){
            //Ананимная функция может вызвать само себя (() => {})
            //такой способ используется для инкапсуляция когда хотим изолировать код от окружающих
            let exp = '';
            do {
                exp = prompt('Введите обязательную статью расходов?', 'exp1')
            } while (!isStr(exp));
            appData.expenses[exp] = (() => {
                let price = 0;
                do {
                    price = prompt('Во сколько это обойдется?', '4000');
                } while (!isNumber(price));
                //+price чтобы было число
                return +price;
            })();
        }
    },
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: () => {
        for (let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: () => {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // Подсчитывает за какой период будет достигнута цель
    getTargetMonth: () => {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: () => {
        if (appData.budgetDay >= 1200){
            console.log('У вас высокий уровень дохода')
        } else if (appData.budgetDay >= 600) {
            console.log('У вас средний уровень дохода')
        } else if (appData.budgetDay >= 0){
            console.log('К сожалению у вас уровень дохода ниже среднего')
        } else {
            console.log('Что то пошло не так')
        }
    },
    getInfoDeposit: () => {
        if (appData.deposit){
            appData.percentDeposit = prompt('Какой годовой процент', '10');
            appData.moneyDeposit = prompt('Какая сумма заложена', '10000');
        }
    },
    calcSavedMoney: () => {
        return appData.budgetMonth * appData.period;
    }
};
//----------------------------------------------------------------------------
let money,
    start = () => {
        do {
            money = +prompt('Ваш месячный доход', '50000');
        } while (!isNumber(money));
        appData.budget = money;
    };
//----------------------------------------------------------------------------
start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

let targetMonth = appData.getTargetMonth();

console.log('ЗП в месяц: ' + appData.budget);

//цель заработать
console.log('цель заработать: ' + appData.mission);

//- Расходы за месяц вызов getExpensesMonth
console.log('расходов за месяц: ' + appData.expensesMonth);

// 3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”
(Math.ceil(targetMonth) >= 0) ?
    console.log('будет достигнута за месяцев: ' + Math.ceil(targetMonth)) :
    console.log('Цель не будет достигнута');

//- Бюджет на день (budgetDay)
console.log('бюджет на день: ' + Math.floor(appData.budgetDay));
appData.getStatusIncome();

//Используя цикл for in для объекта (appData), вывести в консоль сообщение "Наша программа включает в себя данные: " (вывести все свойства и значения)
// console.log('Наша программа включает в себя данные:');
// for (let key in appData){
//     console.log(key, appData[key]);
// }

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
console.log(appData.addExpenses);