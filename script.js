'use strict';

const num = 266219;

const array = num.toString().split('');

const multi = array.reduce((acc, value) => +acc * +value);
console.log(multi);

const power = multi ** 3;

const result = power.toString().slice(0, 2);

console.log(result);
