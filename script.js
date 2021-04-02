'use strict';

let num = 266219;
let result = 0;

console.log(
  String(
    Array.from(String(num)).reduce((acc, value) => +acc * +value) ** 3
  ).slice(0, 2)
);
