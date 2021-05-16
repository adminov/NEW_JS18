'use strict';
// 6) В отдельной папке создать html и js
// Вывести текущий день и время  на страницу в таком формате
//
// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время:12:05:15 PM
// До нового года осталось 175 дней

const date = new Date();
let h = date.getHours();

if (h > 23 || h <7){
    h = 'ночь!';
} else if (h > 6 && h < 12){
    h = 'утро!'
} else if (h > 11 && h < 19){
    h = 'день!';
} else if (h > 18 && h < 24){
    h = 'вечер!';
}

console.log('Добрый: ' + h);

function getDays(){
    let days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    return days[date.getDay()]
};

console.log('Сегодня: ' + getDays(date));
console.log('Текущее время: ' + date.toLocaleTimeString('en'));

function countDay(deadLine){
        let stopTime = new Date(deadLine).getTime(),
            timeRemaining = (stopTime - date) / 1000,
            day = Math.ceil(timeRemaining / 60 / 60 / 24);

    console.log('До нового года осталось: ' + day + ' дней');
}

countDay('31 December 2021');

