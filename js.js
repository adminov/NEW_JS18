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
    countTimer('4 Jun 2021');

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

    //Наша команда
    const team = () => {
        const commandPhoto = document.querySelectorAll('.container')[7];
        const img = commandPhoto.querySelectorAll('img');

        const changingPhotos = (event) => {
            const target = event.target;
            if (target.classList.contains('command__photo')) {
                const lastSrc = target.src;

                target.src = target.dataset.img;
                target.dataset.img = lastSrc;
            }
        };

        img.forEach((image) => {
            image.addEventListener('mouseover', changingPhotos);
            image.addEventListener('mouseout', changingPhotos);
        })
    };
    team();

    // Валидация контактных данных
    const validateInputs = () => {
        const calcInputs = document.querySelectorAll('input.calc-item'),
            formName = document.querySelectorAll('[name=user_name]'),
            formMessage = document.querySelectorAll('[name=user_message]'),
            formEmail = document.querySelectorAll('[name=user_email]'),
            formPhone = document.querySelectorAll('[name=user_phone]');

        let error = new Set();

        const validateNumberInputs = () => {
            calcInputs.forEach(el => {
                el.value = el.value.replace(/[^\d]/g, '');
            })
        };

        const validateLetterInputs = (input) => {
            input.value = input.value.replace(/[^а-яё0-9\.\,\:\-\!\? ]/gi, '');
        };

        const inputsHandler = (e) => {
            if (e.target.matches('.calc-item')) {
                validateNumberInputs();
            }
            if (e.target.matches('[name=user_name]')) {
                e.target.value = e.target.value.replace(/[^а-яё\-\ ]/gi, '');
            }
            if (e.target.matches('#form2-message')) {
                validateLetterInputs(e.target);
            }
            if (e.target.matches('[name=user_email]')) {
                e.target.value = e.target.value.replace(/[^a-z\@\_\-\.\!\~\*\']/gi, '');
            }
            if (e.target.matches('[name=user_phone]')) {
                e.target.value = e.target.value.replace(/[^\d\(\)\-\+]/g, '');
            }
        };

        const trim = (input) => {
            input.value = input.value.replace(/\s+/g, ' ');
            input.value = input.value.replace(/\-+/g, '-');

            let inputToExp = new RegExp("ReGeX" + input.value + "ReGeX");
            if (/^[/ /-]/.test(inputToExp)) {
                input.value = input.value.replace(/^[/ /-]/, '')
            }
            if (/[/ /-]$/.test(inputToExp)) {
                input.value = input.value.replace(/[/ /-]$/, '')
            }
        };

        const capitalize = (input) => {
            let inputValue = input.value
            return inputValue.split(' ').map(item =>
                item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
        };

        const controlInputs = (input, exp, message = 'Введите корректные данные') => {
            if (!input.value.match(exp)) {
                error.add(input.value);
                input.value = '';
            }
        };

        formName.forEach(el => {
            el.addEventListener('blur', () => {
                trim(el);
                el.value = capitalize(el);
                controlInputs(el, /[а-яё]{2,}/gi);
            })
        });

        formMessage.forEach(el => {
            el.addEventListener('blur', () => {
                controlInputs(el, /[^а-яё0-9\.\,\:\-\!\? ]/gi);
                trim(el);
            })
        });

        formEmail.forEach(el => {
            el.addEventListener('blur', () => {
                controlInputs(el, /\w+@\w+\.\w{2,3}/g);
                trim(el);
            })
        });

        formPhone.forEach(el => {
            el.addEventListener('blur', () => {
                trim(el);
                controlInputs(el, /^\+?[78]([-()]*\d){10}$/g);
            })
        });

        window.addEventListener('input', inputsHandler);
    };
    validateInputs();

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        let total = 0;
        let timeout;

        const countSum = () => {
            let countValue = 1,
                dayValue = 1;

            const typeValue = calcType.value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            total = Math.floor(total);
        };

        const animateTotal = () => {
            const target = total;
            const count = +totalValue.textContent;
            const speed = 200;

            const inc = target / speed;

            if (count < target) {
                totalValue.textContent = Math.floor(count + inc);
                timeout = setTimeout(animateTotal, 5);
            } else {
                totalValue.textContent = target;
                clearTimeout(timeout);
            }
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
                animateTotal();
            }
        });

        calcType.addEventListener('change', () => {
            total = 0;
        });

    };
    calc(100);

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = ' Что-то пошло не так...',
            loadMessage = ' Загрузка...',
            successMessage = ' Спасибо! Мы скоро с вами свяжемся!',
            errorImg = './images/wait/error.png',
            loadImg = './images/wait/wait.gif',
            successImg = './images/wait/success.png';
//отправляем данных на сервер виде JSON.stringify
        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener('readystatechange', () => {
                    // если статус не равен к 4 то идем дальше на следующую условию
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });

                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(body));
            });
        };
//чистка инпутов после отправки данных
        const clearInput = idForm => {
            const form = document.getElementById(idForm);

            [...form.elements]
                .filter(item =>
                    item.tagName.toLowerCase() !== 'button' &&
                    item.type !== 'button')
                .forEach(item =>
                    item.value = '');
        };

        const removeDivSuccessError = () => {
            const successError = document.querySelector('.successError');
            setTimeout(() => {
                successError.remove();
            }, 2000);
        };

        const processingForm = idForm => {
            const form = document.getElementById(idForm);
            const statusMessage = document.createElement('div');
            const img = document.createElement('img');

            statusMessage.className = 'successError';
            statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
            img.height = 50;

            form.addEventListener('submit', event => {
                const formData = new FormData(form);
                const body = {};

                event.preventDefault();
                statusMessage.textContent = loadMessage;
                img.src = loadImg;
                statusMessage.insertBefore(img, statusMessage.firstChild);
                form.appendChild(statusMessage);

                formData.forEach((val, key) => {
                    body[key] = val;
                });


                postData(body)
                    .then(() => {
                        statusMessage.textContent = successMessage;
                        img.src = successImg;
                        statusMessage.insertBefore(img, statusMessage.firstChild);
                        clearInput(idForm);
                        removeDivSuccessError();
                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        img.src = errorImg;
                        statusMessage.insertBefore(img, statusMessage.firstChild);
                        console.error(error);
                    });
            });
        };

        processingForm('form1');
        processingForm('form2');
        processingForm('form3');
    };
    sendForm()

});