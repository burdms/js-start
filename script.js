'use strict';

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  today = new Date();

let list = '';

week.forEach((item, index) => {
  let temp = item;

  if (index === today.getDay()){
    temp = (`<b>${temp}</b>`);
  }
  
  if (item === 'Sunday' || item === 'Saturday'){
    temp = (`<i>${temp}</i>`);
  } 
  
  if (index === week.length - 1){
    list += temp;
  } else {
    list += `${temp}<br>`;
  }
});

document.querySelector('#weeklist').innerHTML = list;
