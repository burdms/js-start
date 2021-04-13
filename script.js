'use strict';

const books = document.querySelectorAll('.book'),
    thirdBookTitleText = books[4].querySelector('h2 > a'),
    adv = document.querySelector('.adv');

books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);

document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

thirdBookTitleText.textContent = `Книга 3. this и Прототипы Объектов`;

adv.remove();