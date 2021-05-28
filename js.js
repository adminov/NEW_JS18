document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //timer
    function countTimer(deadLine) {
        const timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                second = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            //let day = Math.floor(timeRemaining / 60 / 60 /24);
            return { timeRemaining, hours, minutes, second };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            timerHour.textContent = ('0' + timer.hours).slice(-2);
            timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
            timerSeconds.textContent = ('0' + timer.second).slice(-2);


        }

        const timer = getTimeRemaining();
        if (timer.timeRemaining >= 0) {
            setInterval(updateClock, 1000);
        } else {
            timerHour.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }

        // updateClock();

    }
    countTimer('29 May 2021');

    //меню
    const toggleMenu = () =>{
        const menu = document.querySelector('menu');

        document.addEventListener('click', (event) => {
           let target = event.target;
            if (target.closest('.menu')){
                menu.classList.toggle('active-menu');
            } else if (target.closest('.close-btn') || target.closest('a') || !target.closest('.active-menu')){
                menu.classList.remove('active-menu');
            }
        });
    };

    toggleMenu();

   //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
        popupData = {
            count: 150,
            speed: 3,
            start: 150,
            end: 0
        };

        const showPopup = () => {
            popupData.start > popupData.end ?
                popupData.count -= popupData.speed :
                popupData.count += popupData.speed;
            popupContent.style.transform = `translateX(${popupData.count}px)`;

            if (popupData.start > popupData.end ?
            popupData.count > popupData.end :
            popupData.count < popupData.end){
                requestAnimationFrame(showPopup);
            }
        };

        popupBtn.forEach((elem) => {
           elem.addEventListener('click', () => {
               popup.style.display = 'block';
               if (screen.width > 768) {
                   popupData.count = popupData.start;
                   requestAnimationFrame(showPopup);
               }
           });
        });

        popup.addEventListener('click', (event) => {
            let target =event.target;

            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target){
                    popup.style.display = 'none';
                }
            }

        });
    };
    togglePopup();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
           let target = event.target;
           target = target.closest('.service-header-tab');
           if (target){
               tab.forEach((item, index) => {
                   if (item === target){
                       toggleTabContent(index)
                   }
               });
           }

        });

    };
    tabs();

// анимация для скролла
    const animateScroll = () => {
        const liClick = (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href');
            window.scrollTo({
               top: document.querySelector(targetId).offsetTop,
                behavior: 'smooth'
            });
        };

        const mainA = document.querySelectorAll('menu a');
        mainA.forEach((elem) => {
             elem.addEventListener('click', liClick);
         });
    };
    animateScroll();

    // слайдер
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        //ищем длину слайдера исходя этого добавляем точки
        slide.forEach((elem) => {
            portfolioDots.innerHTML += `<li class="dot"></li>`;
        });
        //добавляем еще одну класс для точки только на индексу ноль
        const dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');

        //currentSlide-это счетчик для слайдера
        let currentSlide = 0,
            interval;

        //ф-я удаления активний класс через её параметрам получаем классы
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        //ф-я добавления активний класс через её параметрам получаем классы
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        //
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        // старт слайдер и указываем параметре время переключение между слайдерам и вызваем ф-ю autoPlaySlide
        const startSlide = (time = 1500) => {
            interval = setInterval(autoPlaySlide, time);
        };
        // остановляем метод setInterval при наведение мышки на точки и стрелки
        const stopSlide = () => {
            clearInterval(interval);
        };

        // при клике на точки и на стрелки у слайдера меняются картинки
        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;
            // если есть такие классы то возвращаем return
            if (!target.matches('.portfolio-btn, .dot')){
                return;
            }
            // вызываем ф-ю и передаем параметры классы
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            if (currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        // при наведение мышки вызывается ф-я stopSlide
        slider.addEventListener('mouseover', (event) => {
           const target = event.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')){
               stopSlide()
           }
        });
        // при наведение мышки вызывается ф-я startSlide
        slider.addEventListener('mouseout', (event) => {
            const target = event.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')){
                startSlide();
            }
        });

        startSlide();
    };

    slider();
});