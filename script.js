'use strict';   

function getDate(){
    const date = new Date(),
        options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
    
    (function () {
        const getTimeNoun = (number, var1, var2, var3) => {
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
            }, 
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            hourWord = getTimeNoun(hours, 'час', 'часа', 'часов'),
            minuteWord = getTimeNoun(minutes, 'минута', 'минуты', 'минут'),
            secondWord = getTimeNoun(seconds, 'секунда', 'секунды', 'секунд'),
            timeString = `${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;

        let dateString = date.toLocaleString('ru-RU', options);

        dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1).replace('.', 'ода');

        document.getElementById('js-date_a').textContent = `Сегодня ${dateString}, ${timeString}`;
    })();

    (function() {

      document.getElementById('js-date_b').textContent = date.toLocaleString('ru-RU').replace(',', ' - ');
    })();
}

setInterval(getDate, 1000);

/*
function declOfNum(number, words) {  
   return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}
*/