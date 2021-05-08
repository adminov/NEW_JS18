'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.width = width;
    this.height = height;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.start = function(){
    let div;
    if (this.selector.substr(0, 1) === '.'){
      div = document.createElement('div');
      div.className = 'selector';
  } else if (this.selector.substr(0, 1) === '#') {
        div = document.createElement('p');
        div.className = 'selector';
    }

    div.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;`;
    document.body.append(div);

    let text = document.querySelector('.selector');
    text.textContent  = 'hello everyone';
};

let newDomElem = new DomElement('.bar', 100, 100, 'red', 35);

newDomElem.start();

//
// Car.prototype.ride = function(){
//   console.log(this.brand + ' ' +  this.model + ' lets go');
// };
//
// function Audi (country, options, model, type) {
//     Car.apply(this, arguments);
//     this.brand = 'Audi';
//     this.model = model;
//     this.type = type;
// }
//
// Audi.prototype = Object.create(Car.prototype);
// Audi.prototype.constructor = Audi;