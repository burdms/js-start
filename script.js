'use strict';

let num = 266219;
let result = 0;

console.log('Initial num value: ', num);

if (num > 0) {
  result = 1;
} else if (num < 0) {
  result = -1;
  num = Math.abs(num);
}

num = Array.from(String(num));
num.reduce((acc, value) => {
  return (result = +acc * +value);
});

console.log('Result value after multiplication: ', result);

result **= 3;

console.log('Result value in a power of 3: ', result);

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
