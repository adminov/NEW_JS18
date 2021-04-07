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
    }

    console.log(lang);
}


let namePerson = {
    Jek : 'директор',
    Maxim : 'преподаватель',
    Noname : 'студент',
};

console.log(typeof namePerson.Jek);

let result = namePerson.Jek === namePerson.Jek ? 'директор' : 'error';
let result1 = namePerson.Maxim === namePerson.Maxim ? 'преподаватель' : 'error';
let result2 = namePerson.Noname !== namePerson.Noname ? 'error' : 'студент';

console.log(result);
console.log(result1);
console.log(result2);