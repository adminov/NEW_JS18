'use strict';

const myLesson = [
    {lesson: 1, type: 'basic', points: 2},
    {lesson: 2, type: 'additional', points: 4},
    {lesson: 3, type: 'basic', points: 6},
    {lesson: 4, type: 'additional', points: 3},
    {lesson: 5, type: 'basic', points: 4},
    {lesson: 6, type: 'basic', points: 2},
    {lesson: 7, type: 'additional', points: 2},
    {lesson: 8, type: 'basic', points: 6},
    {lesson: 9, type: 'basic', points: 4},
    {lesson: 10, type: 'basic', points: 6},
    {lesson: 11, type: 'additional', points: 5},
    {lesson: 12, type: 'basic', points: 2},
    {lesson: 13, type: 'additional', points: 2},
    {lesson: 14, type: 'basic', points: 4},
    {lesson: 15, type: 'additional', points: 1},
    {lesson: 16, type: 'additional', points: 7},
];

for (let i = myLesson.length - 1;  i >= 0; i-- ){
    const type = myLesson[i].type;
        if (type === 'additional'){
            myLesson.splice(myLesson.indexOf(myLesson[i]), 1);
        } else if (type === 'basic') {
            myLesson[i].points = myLesson[i].points / 2;
        }
}
console.log(myLesson);

//___________________________________________
//lesson 12 localStorage  setCookie
// function setCookie(key, value, year, moth, day, path, domain, secure) {
//     let cookieStr = encodeURI(key) + '=' + encodeURI(value);
//     if (year){
//         const expires = new Date(year, moth-1, day);
//         cookieStr += `; expires=` + expires.toUTCString();
//     }
//
//     cookieStr += path ? '; path=' + encodeURI(path) : '';
//     cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
//     cookieStr += secure ? '; secure=' : '';
//
//     document.cookie = cookieStr;
//     console.log(decodeURI(cookieStr));
// }
//
// setCookie('Привет', 'мир', 2022, 1, 1);

// const inputText = document.getElementById('myText'),
//     myBtn = document.getElementById('myBtn'),
//     text = document.getElementById('text');
//
// const showText = function(){
//   text.textContent = localStorage.myText;
// };
//
// myBtn.addEventListener('click', function () {
//     localStorage.myText = inputText.value;
//     showText();
// });
// showText();


//___________________________________________
//lesson 17 Date
// const date = new Date();
//
// console.log(date);



// const func = function (){
//     myLesson.forEach((item, index) => {
//         const type = item.type;
//         if (type === 'additional'){
//             console.log(item);
//             myLesson.splice(myLesson.indexOf(item), 1);
//             console.log(myLesson);
//         }
//     })
// };

// console.log(func());

//___________________________________________
//lesson 16 Коллекции Map и Set
// const map = new Map([
//     [2019, 'autumn'],
//     ['joker', 1]
// ]);
//
// map.set('car', {brand: 'mazda', model: 3})
//     .set(undefined, 'fine');
//
// const obj = {
//     name: 'Max',
//     age: 26
// };
//
// map.set(obj, 2123);
//
// const func = () => {
//     console.log('hello')
// };
//
// map.set(func, 'uaaa');
//
// console.log(map);
//
// const collectMap = new Map([
//     ['hello', 'world'],
//     ['year', 1812]
// ]);
//
// map.forEach((key, value) => {
//     console.log(`ключ: ${value} значение: ${key}`);
// });


//___________________________________________
//lesson 16 Rest, spread, Деструктуризация
// const transport = {
//     bike: "honda",
//     car: "bentley",
//     cycle: "bmx",
// };
//
// const newTransport = {
//     bike: 'suzuki',
//     quadBike: 'polaris'
// };
//
// // const current = Object.assign({}, transport, newTransport);
// const ship = 'Photinia';
//
// const curTrans = {
//     ...transport,
//     ...newTransport,
//     ship,
//     ride(){
//         console.log('go')
//     }
// };
//
// console.log(curTrans);
// curTrans.ride();


//___________________________________________
// const car = 'bentley';
// const cycle = 'bmx';
// const bike = 'honda';
//
// const transport = {
//   car,
//   cycle,
//   bike,
//   ride(){
//       console.log(this)
//   }
// };
//
// transport.ride();
// console.log(transport);

//___________________________________________
// const carsModel = {
//     brand: 'mazda',
//     models: {
//         sedan: ['s60', 's90'],
//         cross: ['v60', 'v90']
//     }
// };
//
// const {brand,
//     models: {
//         sedan: [...s],
//         cross: [...v]
//     }
// } = carsModel;
//
// console.log(brand, ...s, ...v);

//___________________________________________
// const cars = [['mazda'], ['bmw', 'honda'], 'audi'];
//
// const [[a], [...b], c, e = 'opel'] = cars;
// //const [a, , c] = cars;
//
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(e);

//___________________________________________
// const car = {
//     brand: 'mazda',
//     model: 3,
//     color: 'red',
//     abs: true
// };
//
// const {brand, ...all} = car;
//
// console.log(brand, all);

//___________________________________________
// const creatCar = ({
//                       brand = 'bmw',
//                       model = 5,
//                       color = 'black',
//                       colorInt = 'white'
//                   } = {}) => {
//     console.log(`
//     car: ${brand} ${model}
//     color car: ${color}
//     color inside: ${colorInt}
//   `)
// };
//
// creatCar();