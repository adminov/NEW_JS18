let money = 100000; //Доход за месяц
let income = 'фриланс'; //доп. доход
let addExpenses = 'свет, газ, мусор, бензин, продукты, налог'; // расходы
let deposit = true;
let mission = 70000;// Какую сумму хотите накопить
let period  = 12; //месяцев

let yearMoney = deposit * period;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log("\nрасходы: " + addExpenses.length);

console.log("Период и Цель заработать в год: " + period + ' * ' +  mission + ' = ' + yearMoney);

console.log(addExpenses.toUpperCase() + "\n");
console.log(addExpenses.split(', '));

let budgetDay = money / 30; //доход за день
console.log(budgetDay);