'use strict';

const colorValueText = document.querySelector('#color');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.querySelector('#change').addEventListener('click', () => {
  const color = getRandomColor();

  document.body.style.backgroundColor = color;
  colorValueText.textContent = color;
});

