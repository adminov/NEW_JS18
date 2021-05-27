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
    countTimer('28 May 2021');

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
        let target = event.target.closest('[href^="#"]'),
            speed = 0.5;
        console.log(target);

        if (target) {
            const pageY = window.pageYOffset,
                hash = target.href.replace(/[^#]*(.*)/, '$1'),
                distTopPosition = document.querySelector(hash).getBoundingClientRect().top;

            let start = 0;
            const step = any => {
                console.log(any);
                if (!start) start = any;

                const progress = any - start;

                const r = (distTopPosition < 0 ?
                    Math.max(pageY - progress / speed, pageY + distTopPosition) :
                    Math.min(pageY + progress / speed, pageY + distTopPosition));

                window.scrollTo(0,r);
                if (r < pageY + distTopPosition) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);

        }
    };

    document.querySelector('main a').addEventListener('click', animateScroll);
});
