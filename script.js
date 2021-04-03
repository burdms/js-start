'use strict';

const num = 266219;

console.log(Array.from(String(num)).reduce((acc, value) => +acc * +value));

console.log(
  String(
    Array.from(String(num)).reduce((acc, value) => +acc * +value) ** 3
  ).slice(0, 2)
);
