'use strict';

function checkString(arg) {
  if (!arg.trim()) {
    alert("Вы ничего не ввели!");
    return 'Ничего не введено';
  } else {
    arg = arg.trim();
    
    if (arg.length <= 30) {
      return arg;
    }
    
    arg = arg.slice(0, 30);

    const lastSpace = arg.lastIndexOf(' ');
    if (lastSpace > 0) {
      arg = arg.slice(0, lastSpace);
    }

    return arg + '...';
  }
}

console.log(checkString(prompt("Введите текст")));