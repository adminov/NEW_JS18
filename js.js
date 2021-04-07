'use strict';

const num = 266219;

const numbig = (numStr) => {
    let res = 1;
    for (let i = 0; i < numStr.length; i++) {
        res = res * numStr[i];
    }
    return res;
};

const resNum = numbig(num.toString());
console.log(resNum);


const step = resNum ** 3;
console.log(step);

console.log(step.toString().substr(0, 2));