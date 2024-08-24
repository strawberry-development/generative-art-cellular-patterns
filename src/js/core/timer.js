let timerInterval;
let startTime;
let storedElapsedTime = 0;

function startTimer() {
    startTime = Date.now() - storedElapsedTime;

    timerInterval = setInterval(updateTimer, 10);
}

function resetTimer() {
    document.getElementById('elapsedTime').innerText = '00:00:00';
    storedElapsedTime = 0;
    startTime = Date.now();
}

function stopTimer() {
    clearInterval(timerInterval);

    storedElapsedTime = Date.now() - startTime;
}

function updateTimer() {
    let minutes, seconds, milliseconds;

    const elapsedTime = Date.now() - startTime;
    minutes = Math.floor(elapsedTime / 60000);
    seconds = Math.floor((elapsedTime % 60000) / 1000);
    milliseconds = Math.floor((elapsedTime % 1000) / 10);

    storedElapsedTime = elapsedTime;

    document.getElementById('elapsedTime').innerText =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}