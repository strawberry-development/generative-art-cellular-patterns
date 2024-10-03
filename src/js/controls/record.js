
let animationRunning = false;
let isRecording = false;

document.getElementById('recordDuration').addEventListener('input', (e) => {
    updateRecordDuration(e.target.value);
    document.getElementById('recordDurationValue').innerText = e.target.value;
});

function updateRecordDuration(target) {
    recordDuration = parseInt(target) * 1000;
}

document.getElementById('record').addEventListener('click', async () => {
    if (isRecording) return;

    if (!animationRunning) {
        animationRunning = true;
        document.getElementById('start-text').innerText = 'Pause';
        startTimer();
        animate();
    }

    isRecording = true;

    try {
        await recordAnimation(originalCanvas, 'original');
    } finally {
        isRecording = false;
    }

    // Stop the animations and reset the UI
    animationRunning = false;
    document.getElementById('start-text').innerText = 'Start';
});

document.getElementById('startButton').addEventListener('click', () => {
    startButtonLaunch();
});

function startButtonLaunch(){
    if (animationRunning) {
        animationRunning = false;
        document.getElementById('start-text').innerText = 'Start';
        stopTimer();
    } else {
        animationRunning = true;
        document.getElementById('start-text').innerText = 'Pause';
        startTimer();
        animate();
    }
}