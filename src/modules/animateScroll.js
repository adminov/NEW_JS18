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
export default animateScroll();