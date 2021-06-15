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

export default togglePopup();