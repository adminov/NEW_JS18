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

export default toggleMenu;