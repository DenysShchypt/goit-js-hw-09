

// Додав стилізацію на кнопки

const elements_1 = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    bodyBgColor: document.querySelector('body'),
}

let bgBodyColor = null;
elements_1.btnStart.classList.add('btn-js');
elements_1.btnStop.classList.add('btn-js');
elements_1.btnStart.addEventListener('click', handlerStartBtn);
elements_1.btnStop.addEventListener('click', handlerStopBtn);

function handlerStartBtn() {
    if (!bgBodyColor) {
        bgBodyColor = setInterval(() => {
            elements_1.bodyBgColor.style.backgroundColor = getRandomHexColor();
        }, 1000)
    }
}
function handlerStopBtn() {
    clearInterval(bgBodyColor)
    bgBodyColor = false;
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
