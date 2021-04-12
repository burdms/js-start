'use strict';   

function currentTimeA() {
    const date = new Date(),
        options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
        getTimeNoun = (number, var1, var2, var3) => {
          if (number >= 5 && number <= 20) {
            return var3;
          }

          number %= 10;
          if (number === 1) {
            return var1;
          }
          if (number >= 2 && number <= 4) {
            return var2;
          }

          return var3;
        };
    
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        hourWord = getTimeNoun(hours, 'час', 'часа', 'часов'),
        minuteWord = getTimeNoun(minutes, 'минута', 'минуты', 'минут'),
        secondWord = getTimeNoun(seconds, 'секунда', 'секунды', 'секунд'),
        resultString,
        timeString,
        dateString = date.toLocaleString('ru-RU', options);

    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1).replace('.', 'ода');
    
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    timeString = `${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;

    resultString = `Сегодня ${dateString}, ${timeString}`;

    document.getElementById('js-date_a').innerHTML = resultString;
}

function currentTimeB() {
  const date = new Date();
  let resultString = date.toLocaleString('ru-RU').replace(',', ' - ');

  document.getElementById('js-date_b').innerHTML = resultString;
}

setInterval(() => {
  currentTimeA();
  currentTimeB();
}, 1000);