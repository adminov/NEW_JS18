'use strict';

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import animateScroll from "./modules/animateScroll";
import slider from "./modules/slider";
import checkCalcBlock from "./modules/checkCalcBlock";
import team from "./modules/team";
import validateInputs from "./modules/validateInputs";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

//timer
countTimer();
//меню
toggleMenu();
//popup
togglePopup();
//табы табы
tabs();
// анимация для скролла
animateScroll();
// слайдер
slider();
checkCalcBlock();
//Наша команда. при наведение курсора меняется фото
team();
// Валидация контактных данных
validateInputs();
//калькулятор
calc();
//send-ajax-form
sendForm();