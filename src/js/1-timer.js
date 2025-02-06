// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// npm i flatpickr --save     - Встановлення через NPM

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Налаштування flatpickr
// npm install izitoast --save

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]); // Перевірка вибору дати

    userSelectedDate = selectedDates[0];
    if (userSelectedDate && userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else if (userSelectedDate) {
      startBtn.disabled = false;
    }
  },
};

const datePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerFields = document.querySelectorAll('.timer .value');
let userSelectedDate = null;
let countdownInterval = null;

// Ініціалізація flatpickr з переданим об'єктом options
flatpickr(datePicker, options);

// Функція для перетворення мілісекунд у дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання нуля до значення, якщо менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Оновлення таймера
function updateTimer() {
  const now = new Date();
  const timeRemaining = userSelectedDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    timerFields.forEach(field => (field.textContent = '00'));
    startBtn.disabled = false;
    datePicker.disabled = false;
    iziToast.success({
      title: 'Success',
      message: "Time's up!",
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

// Запуск таймера
startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startBtn.disabled = true;
    datePicker.disabled = true;
    countdownInterval = setInterval(updateTimer, 1000);
  }
});
