import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formBox: document.querySelector('.form'),
}

refs.formBox.classList.add('js-container');
refs.formBox.addEventListener('submit', hadlerBtnPromis);

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

};

function hadlerBtnPromis(e) {

  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  const positionPromis = Number(amount.value) + 1;
  const stepTimeValue = Number(step.value)
  let stepTimePromis = Number(delay.value);
  numberChallengePromises(stepTimePromis, stepTimeValue, positionPromis)

};

function numberChallengePromises(stepTimePromis, stepTimeValue, positionPromis) {

  challengePromises(1, stepTimePromis);
  for (let i = 2; i < positionPromis; i += 1) {
    stepTimePromis += stepTimeValue;
    challengePromises(i, stepTimePromis);

  };
};

function challengePromises(numberPromis, time) {

  createPromise(numberPromis, time)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

};
