'use strict';

console.log(
  String(
    Array.from(String(266219)).reduce((acc, value) => +acc * +value) ** 3
  ).slice(0, 2)
);
