'use strict';

let oneArg = (arg) => {
    let res = 'число';
    if (typeof arg === 'string'){
        let maxlength = 30;
        if (arg.length > maxlength){
            res = arg.trim().substr(0, 30) + '...';
        } else {
            res = arg.trim();
        }
    }
    return res;
};

console.log('number: ' + oneArg(5));
console.log('before 30: ' + oneArg('    My name '));
console.log('...: ' + oneArg('   My name is Batish, he lives in Kyrgyzstan, city TashKumyr '));
