'use strict';

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  today = new Date();

let list = '';

week.forEach((item, index) => {
  let temp = item,
    dateIndex = index + 1;
  if (index === 6) {
    dateIndex = 0;
  }

  if (dateIndex === today.getDay()){
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
