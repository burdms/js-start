'use strict';

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  today = new Date();

let list = '';

week.forEach((item, index) => {
  if (index === today.getDay()){
    list += (`<b>${item}</b>`);
  } else if (item === 'Sunday' || item === 'Saturday'){
    list += (`<i>${item}</i>`);
  } else {
    list += item;
  }
  list += '<br>';
});

document.querySelector('#weeklist').innerHTML = list;

 
