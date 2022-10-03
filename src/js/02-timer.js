import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimeEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const { defaultDate } = this.config;

    if (selectedDates[0] < defaultDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

startBtn.disabled = true;
let timerId = null;

flatpickr(dateTimeEl, options);

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const currentDate = new Date();
    const startTimerDate = new Date(dateTimeEl.value);
    const deltaTime = startTimerDate - currentDate;

    if (startTimerDate <= currentDate) {
      Notify.success('Time is up');
      clearInterval(timerId);

      return;
    }

    const timer = convertMs(deltaTime);

    daysEl.textContent = addLeadingZero(timer.days);
    hoursEl.textContent = addLeadingZero(timer.hours);
    minsEl.textContent = addLeadingZero(timer.minutes);
    secsEl.textContent = addLeadingZero(timer.seconds);
  }, 1000);

  startBtn.disabled = true;
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
