
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";
const element_2 = {
    inputDate: document.querySelector('input#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    valueDays: document.querySelector('.value[data-days]'),
    valueHours: document.querySelector('.value[data-hours]'),
    valueMinutes: document.querySelector('.value[data-minutes]'),
    valueSeconds: document.querySelector('.value[data-seconds]'),
};

element_2.btnStart.addEventListener('click', handlerBtnStart);
element_2.btnStart.disabled = true;
let endDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        endDate = Number(selectedDates[0]);
        if (endDate < Date.now()) {
            Notify.failure('Please choose a date in the future');
        }
        else {
            element_2.btnStart.disabled = false;
        }
    },
};
let calendar = flatpickr(element_2.inputDate, options);

function handlerBtnStart(e) {

    calendar.destroy(element_2.inputDate, options);
    element_2.btnStart.disabled = true;
    const startTimer = setInterval(() => {
        const startDate = Date.now();
        const ms = endDate - startDate;
        const remainingTime = convertMs(ms);
        updateClockface(remainingTime);
    }, 1000);

    setTimeout(() => {
        Notify.success('Start sale)');
        clearInterval(startTimer)
    }, endDate - Date.now());


};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function updateClockface({ days, hours, minutes, seconds }) {

    element_2.valueDays.textContent = `${days}`;
    element_2.valueHours.textContent = `${hours}`;
    element_2.valueMinutes.textContent = `${minutes}`;
    element_2.valueSeconds.textContent = `${seconds}`;

};