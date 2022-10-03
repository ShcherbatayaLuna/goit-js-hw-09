import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', startCreatePromise);

function startCreatePromise(event) {
  event.preventDefault();

  const { delay, step, amount } = event.target.elements;

  let delayFirst = Number(delay.value);
  let stepFirst = Number(step.value);
  let amountProm = Number(amount.value);

  for (let i = 1; i <= amountProm; i += 1) {
    createPromise(i, delayFirst).then(onSuccess).catch(onError);
    delayFirst += stepFirst;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
