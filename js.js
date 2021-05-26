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
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => {
            elem.addEventListener('click', handlerMenu)
        })
    };

    toggleMenu();

   //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
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

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopup();


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
