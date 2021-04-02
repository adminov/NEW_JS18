let money = 100000; //Доход за месяц
let Income = 'фриланс'; //доп. доход
let addExpenses = 'свет, газ, мусор, бензин, продукты, налог'; // расходы
let deposit = 50000;
let mission = 70000;// Какую сумму хотите накопить
let period  = 12; //месяцев

let yearMoney = deposit * period;

console.log("Доход за месяц: " + money, "\nдоп. доход: " + Income, "\ndeposit: " + deposit);

console.log("\nрасходы: " + addExpenses.length);

console.log("Период и Цель заработать в год: " + period + ' * ' +  mission + ' = ' + yearMoney);

console.log(addExpenses.toUpperCase() + "\n");
console.log(addExpenses.split(', '));

let budgetDay = 80000; //доход за месяц / 30
console.log(budgetDay);