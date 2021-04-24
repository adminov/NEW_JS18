'use strict';

let budgetMonth = document.getElementsByClassName('budget_month-value')[0];
let	budgetDay = document.getElementsByClassName('budget_day-value')[0];
let	expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let	additionalIncome = document.getElementsByClassName('additional_income-value')[0];
let	additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let	incomePeriod = document.getElementsByClassName('income_period-value')[0];
let	targetMonths = document.getElementsByClassName('target_month-value')[0];
//---------------------------------------------------------------------------------------
let salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	incomeAmount = document.querySelector('.income-amount'),
	expensesTitle = document.querySelector('.expenses-title'),
	expensesAmount = document.querySelector('expenses-amount'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select');
//---------------------------------------------------------------------------------------
let Calculate = document.getElementById('start');
let depositCheck = document.querySelector('#deposit-check');
let btnPlus = document.getElementsByTagName('btn_plus');
let btnPlusTwo = document.getElementsByTagName('btn_plus');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
