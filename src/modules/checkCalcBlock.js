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

export default checkCalcBlock;