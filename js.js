'use strict';
let lang = prompt('Напишите: ru или en');
{
//через многомерный массив:
    let lan = {
        'ru': ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        'en': ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn']
    };
    console.log(lan[lang]);
}

{
//через ив
    if (lang === 'ru') {
        lang = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    } else {
        lang = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
    }

    console.log(lang);
}

{
//через свитч
    switch (lang) {
        case 'ru':
            lang = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
            break;
        case 'en':
            lang = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
        default:
    }

    console.log(lang);
}


let namePerson = 'Maxim';

console.log((namePerson === 'Max') ?
    'CEO' : (namePerson === 'Maxim') ?
        'teacher' : 'student');
