'use strict';

function checkString(arg){
  if (!arg) {
    alert("Вы ничего не ввели!");
    return 'Ничего не введено';
  } else {
    arg.trim();
    if (arg.length > 30) {
      arg = arg.slice(0, 30) + '...';
    }
    return arg;
  }
}

console.log(checkString(prompt("Введите текст")));