document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    function DomElement(selector, height, width, bg, fontSize, absolute) {
        this.selector = selector;
        this.width = width;
        this.height = height;
        this.bg = bg;
        this.fontSize = fontSize;
        this.absolute = absolute;
    }

    DomElement.prototype.start = function(){
        let div;
        if (this.selector.substr(0, 1) === '.') {
            div = document.createElement('div');
            div.className = this.selector;
        } else if (this.selector.substr(0, 1) === '#') {
            div = document.createElement('p');
            div.id = this.selector;
        }

        div.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;
        position: ${this.absolute}`;
        document.body.append(div);
        div.textContent = 'hello everyone';
    };

    // let text = document.querySelector('.bar');
    // text.textContent  = 'hello everyone';

    let newDomElem = new DomElement('.bar', 100, 100, 'red', 10, 'absolute');

    newDomElem.start();

    //Написать обработчик события для keydown, который будет принимать callback-функцию.
    // Данная функция будет отлавливать нажатие на стрелки клавиатуры. В зависимости от нажатой
    // кнопки(Вверх - стрелка вверх, Влево - стрелка влево, Вправо - стрелка вправо, Вниз - стрелка
    // вниз) наш квадрат будет перемещаться на 10 пикселей.


    let top = 0,
        left = 0;
    document.addEventListener('keydown', function () {
        let block = document.querySelector('div');
        switch (event.keyCode) {
            case 39: //вправо
                left = left + 10;
                block.style.left = left + 'px';
                break;
            case 37: //влево
                left = left - 10;
                block.style.left = left + 'px';
                break;
            case 38: //вверх
                top = top - 10;
                block.style.top = top + 'px';
                break;
            case 40: //вниз
                top = top + 10;
                block.style.top = top + 'px';
                break;
        }
    })


});