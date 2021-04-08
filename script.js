'use strict';

let arr = ['23', '7', '13', '123', '42', '76', '20'], result = [], k = 0;

for (let i = 0; i < arr.length; i++){
  if (+(arr[i].toString().slice(0, 1)) === 2 || +(arr[i].toString().slice(0, 1)) === 4) {
    result[k] = arr[i];
    k++;
  }
}

console.log('Задание #1: ', result);

console.group('Задание #2:');

for (let i = 1; i <= 100; i++) {
  let isPrime = true;

  for (let j = 2; j < i; j++) {
      if (i % j === 0) {
          isPrime = false;
          break;
      }
  }

  if (isPrime) {
    if (i === 1) {
      console.log(i + ' — The divisor of this prime number is: ' + i);
    }else{
      console.log(i + ' — The divisors of this prime number are: 1 and ' + i);
    }
  } 
}