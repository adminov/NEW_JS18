document.addEventListener('DOMContentLoaded', function (){
    'use strict';

    //timer
    function countTimer(deadLine) {
        let timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                second = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            //let day = Math.floor(timeRemaining / 60 / 60 /24);
            return {timeRemaining, hours, minutes, second}
        }

        function updateClock() {
            let timer = getTimeRemaining();

                timerHour.textContent = ('0' + timer.hours).slice(-9);
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.second;


            if (timer.timeRemaining > 0){
                setInterval(updateClock, 1000);
            } else {
                timerHour.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
    };

    countTimer('16 May 2021');
});