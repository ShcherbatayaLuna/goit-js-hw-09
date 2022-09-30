const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  if (startBtn.hasAttribute('disabled')) {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
