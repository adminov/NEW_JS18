'use strict';

const hardTask = (arg) => {
        let res = '';
    if (typeof arg === 'string'){
        const lengthMax = 30;
        const str = arg.trim();
        if (str.length > lengthMax){
            res = str.substr(0, lengthMax) + '...';
        } else {
            res = str;
        }
    }
    return res;
};
console.log(hardTask(5));
console.log(hardTask(' my names is Batish '));
console.log(hardTask(' my names is Batish, he lives in Kyrgyzstan '));