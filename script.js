let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lap-list');

function timeToString(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}.${milliseconds.toString().padStart(3,'0')}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = timeToString(elapsedTime);
    }, 10);
    startBtn.disabled = true;
}

function stop() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    recordLap();
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapList.innerHTML = '';
    startBtn.disabled = false;
}

function recordLap() {
    const li = document.createElement('li');
    li.textContent = timeToString(elapsedTime);
    lapList.appendChild(li);
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
