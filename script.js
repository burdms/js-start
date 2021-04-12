'use strict';   

function currentTime() {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    monthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    date = new Date();

  let outputA = 'Сегодня ', 
    outputB,
    hourWord,
    minuteWord,
    secondWord,
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
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

    outputA += `${days[date.getDay()]}, ${date.getDate()} ${monthes[date.getMonth()]} ${year} года, `;

    hourWord = getTimeNoun(hours, 'час', 'часа', 'часов');
    minuteWord = getTimeNoun(minutes, 'минута', 'минуты', 'минут');
    secondWord = getTimeNoun(seconds, 'секунда', 'секунды', 'секунд');

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    outputA += `${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;
    outputB = `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
    
    document.getElementById('js-date_a').innerHTML = outputA;
    document.getElementById('js-date_b').innerHTML = outputB;
}

setInterval(currentTime, 1000);