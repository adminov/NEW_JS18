//send-json and fetch and Promise
const sendForm = () => {
    const errorMessage = ' Что-то пошло не так...',
        loadMessage = ' Загрузка...',
        successMessage = ' Спасибо! Мы скоро с вами свяжемся!',
        errorImg = './images/wait/error.png',
        loadImg = './images/wait/wait.gif',
        successImg = './images/wait/success.png';

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
                .then((response) => {
                    if (response.status !== 200){
                        throw new Error('Status network no 200...');
                    }
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

    //отправляем данных на сервер виде fetch
    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
    //отправляем данных на сервер виде JSON.stringify
    // const postData = (body) => {
    //     return new Promise((resolve, reject) => {
    //         const request = new XMLHttpRequest();
    //
    //         request.addEventListener('readystatechange', () => {
    //             // если статус не равен к 4 то идем дальше на следующую условию
    //             if (request.readyState !== 4) {
    //                 return;
    //             }
    //             if (request.status === 200) {
    //                 resolve();
    //             } else {
    //                 reject(request.status);
    //             }
    //         });
    //
    //         request.open('POST', './server.php');
    //         request.setRequestHeader('Content-Type', 'application/json');
    //         request.send(JSON.stringify(body));
    //     });
    // };
};
export default sendForm();