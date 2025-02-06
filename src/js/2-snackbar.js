import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо форму
const form = document.querySelector('.form');

// Обробка сабміту форми
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Запобігаємо стандартній поведінці форми

  // Отримуємо значення з форми
  const delayInput = document.querySelector('input[name="delay"]');
  const stateInputs = document.querySelectorAll('input[name="state"]');

  const delay = Number(delayInput.value);
  let state;

  // Отримуємо вибір стану
  stateInputs.forEach(input => {
    if (input.checked) {
      state = input.value;
    }
  });

  // Створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка результату промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
