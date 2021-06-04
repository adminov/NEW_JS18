document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output'),
        db = './cars.json';

    const getData = urlDB => {
        return new Promise( (resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', urlDB);
            request.setRequestHeader('Content-type', 'application/json');
            request.send();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4){
                    return;
                }

                if (request.status === 200){
                    const response = JSON.parse(request.responseText);
                    resolve(response);
                } else {
                    reject(request.statusText);
                }
            });
        });
    };

    const showData = (data) => {
        data.cars.forEach((item) => {
            if (item.brand === select.value){
                output.innerHTML = `Car ${item.brand} <br> Model ${item.model} <br>
                                    Price ${item.price}`;
            }
        });
    };

    select.addEventListener('change', () => {
        getData(db)
            .then(showData)
            .catch(error => output.innerHTML = `have error ${error}`);
    });
});