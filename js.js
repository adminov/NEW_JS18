'use strict';
let lang = 'en';

//через ив
    if (lang === 'ru') {
        console.log('пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
    } else {
        console.log('mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn');
    }

//через свитч
    switch (lang) {
        case 'ru':
            console.log('пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
            break;
        case 'en':
            console.log('mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn');
        default:
    }

//через многомерный массив:
let lan = {
    'ru': ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    'en': ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn']
};
console.log(lan[lang]);


let namePerson = 'Maxim';

console.log((namePerson === 'Max') ?
    'CEO' : (namePerson === 'Maxim') ?
        'teacher' : 'student');
