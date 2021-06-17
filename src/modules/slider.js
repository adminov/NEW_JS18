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

export default slider;