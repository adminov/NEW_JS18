'use strict';

class First {
    constructor() {
    }
    hello(){
        console.log('Привет я метод родителя!');
    }
}

class Second extends First{
    constructor() {
        super();
    }

    hello() {
        super.hello();
        console.log('А я наследуемый метод!');
    }


}

const first1 = new First();
const second2 = new Second();

// first1.hello();
second2.hello();
console.log(first1);
console.log(second2);

//from video
// {
//     class CarWash {
//         constructor(brand, model = CarWash.noCarModel(), services = []) {
//             this.brand = brand;
//             this.model = model;
//             this.washed = false;
//             this._services = services;
//         }
//
//         get services(){
//             console.log(this._services);
//             return this._services.length > 0 ? 'есть' : 'нет';
//         }
//
//         set services(addServices){
//             return this._services.push(addServices)
//         }
//
//         static noCarModel(){
//             return 'none'
//         }
//
//         washReady() {
//             this.washed = true;
//             this.report();
//             CarWash.counter++;
//         }
//
//         report() {
//             console.log(this.brand, this.model, this.washed)
//         }
//     }
//
//     class PassCar extends CarWash{
//         constructor(brand, model, services, pass = 5) {
//             super(brand, model, services);
//             this.pass = pass;
//         }
//
//         washReady() {
//             super.washReady();
//             this.reportOffice();
//         }
//
//         reportOffice(){
//             console.log('На мойке для легковых была помыта машина');
//         }
//     }
//
//     CarWash.counter = 0;
//
//     const car1 = new CarWash('mazda', 3, ['black tires', 'wax']);
//     const car2 = new PassCar('bmw', 5);
//     car2.services = 'протирка стекол';
//
//     car1.washReady();
//     car2.washReady();
//     console.log(car1);
//     console.log(car2);
// }