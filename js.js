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
        if (timer.timeRemaining > 0) {
            setInterval(updateClock, 1000);
        } else {
            timerHour.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }

        updateClock();

    }
    countTimer('19 May 2021');

    //меню
    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('close-btn');

        btnMenu.addEventListener('click', () => {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }

        });

        closeBtn.addEventListener('click', () => {
            menu.style.transform = `translate(-100%)`;
        })
    };

    toggleMenu();
});
