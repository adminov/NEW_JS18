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

    //проверка на цифр в блоке калькулятор
    const checkCalcBlock = () => {
        const calcBlock = document.querySelector('.calc-block');
        const input = calcBlock.querySelectorAll('input');
        input.forEach((element) => {
           element.addEventListener('blur', (event) =>{
               if (event.target.type === 'text') {
                   event.target.value = event.target.value.replace(/\D/g, '');
               }
           })
        });
    };
    checkCalcBlock();

    //проверка на Name Email Phone
    const checkEmailAll = () => {
        const formName = document.querySelectorAll('.form-name'),
            form1Email = document.querySelectorAll('.form-email'),
            form1Phone = document.querySelectorAll('.form-phone');

        // const reg = new RegExp(/[78]([-()]*\d){10}/g);
        // const string = `8(960)-260-20-20`;
        // const number = reg.test(string);
        // console.log(number);

        form1Phone.forEach((elem) => {
            elem.addEventListener('blur', (event) => {
                if (event.target.type === 'tel'){
                    const str = event.target.value;
                    event.target.value = str.match(/(^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(\+[0-9]{1,3}\([0-9]{1,3}\)[0-9]{1}([-0-9]{0,8})?([0-9]{0,1})?)$)|(^[0-9]{1,4}$)/);
                }
            })
        });

        // const string = `bA~t*i-sh_naz!i'k@gmail.com`;
        // const email = string.match(/[Aa-zZ]\w+~\w+\*\w+-\w+\w+_\w+!\w+'\w+@\w+\.\w{2,4}/g);
        // console.log(email);

        form1Email.forEach((elem) => {
           elem.addEventListener('blur', (event) => {
               if (event.target.type === 'email'){
                   event.target.value = event.target.value.replace(/[Aa-zZ]\w+~\w+\*\w+-\w+\w+_\w+!\w+'\w+@\w+\.\w{2,4}/g, '');
               }
           })
        });

        formName.forEach((elem) => {
            elem.addEventListener('blur', (event) => {
                if (event.target.type === 'text'){
                    const reg = event.target.value.replace(/(^[A-Z]{1}[a-z]{1,14}[A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/g, '');
                    event.target.value = reg;
                }
            })
        });


    };
    checkEmailAll();

    //калькулятор

    const calc = (price = 100) => {
      const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

      const countSum = () => {
          let total = 0,
            countValue = 1,
            dayValue = 1;
          let step = 50;
          const typeValue = calcType.options[calcType.selectedIndex].value,
              squareValue = +calcSquare.value;

          if (calcCount.value > 1){
              countValue += (calcCount.value - 1) / 10;
          }
          if (calcDay.value && calcDay.value < 5){
              dayValue *= 2;
          } else if (calcDay.value && calcDay.value < 10){
              dayValue *= 1.5;
          }

          if (typeValue && squareValue){
              total = price * typeValue * squareValue * countValue * dayValue;
          }

          if (totalValue.textContent != total) {
              if (totalValue.textContent > total) {
                  step = -1;
              }

              let timer = setInterval(() => {
                  totalValue.textContent = +totalValue.textContent + step;
                  if ((total - totalValue.textContent) * step < 1) {
                      clearInterval(timer);
                      totalValue.textContent = Math.round(total);
                  }
              }, 0);
          }
      };

      calcBlock.addEventListener('change', (event) => {
         const target = event.target;

         if (target.matches('select') || target.matches('input')){
             countSum();
         }
      });

    };

    calc(100);
});