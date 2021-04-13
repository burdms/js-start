'use strict';

const books = document.querySelectorAll('.book'),
    thirdBookTitleText = books[4].querySelector('h2 > a'),
    adv = document.querySelector('.adv'),
    chaptersSecondBook = books[0].querySelectorAll('li'),
    chaptersFifthBook = books[5].querySelectorAll('li');

books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);

document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

thirdBookTitleText.textContent = `Книга 3. this и Прототипы Объектов`;

adv.remove();

chaptersSecondBook[9].after(chaptersSecondBook[2]);
chaptersSecondBook[3].after(chaptersSecondBook[6]);
chaptersSecondBook[6].after(chaptersSecondBook[8]);

chaptersFifthBook[1].after(chaptersFifthBook[9]);
chaptersFifthBook[5].after(chaptersFifthBook[2]);
chaptersFifthBook[7].after(chaptersFifthBook[5]);

console.log(books);
console.log(chaptersSecondBook);
console.log(chaptersFifthBook);