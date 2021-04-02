'use strict';

let num = -266219;
let result = 0;

console.log('Initial num value: ', num);

if (num > 0) {
  result = 1;
  while (num > 0) {
    result *= num % 10;
    num = Math.floor(num / 10);
  }
} else if (num < 0) {
  result = -1;
  num = Math.abs(num);

  while (num > 0) {
    result *= num % 10;
    num = Math.floor(num / 10);
  }
}

console.log('Result value after multiplication: ', result);

result **= 3;

console.log('Result value in power 3: ', result);

if (result >= 0) {
  console.log(
    'Final result: ',
    Math.floor(result / 10 ** (result.toString().length - 2))
  );
} else {
  console.log(
    'Final result: ',
    Math.ceil(result / 10 ** (result.toString().length - 3))
  );
}
