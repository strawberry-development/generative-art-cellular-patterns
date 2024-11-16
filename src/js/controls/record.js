
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
        startTimer();
        animate();
    }

    isRecording = true;

    try {
        await recordAnimation(canvasElement, 'original');
    } finally {
        isRecording = false;
    }

    // Stop the animations and reset the UI
    animationRunning = false;
});

document.getElementById('startButton').addEventListener('click', () => {
    startButtonLaunch();
});

function startButtonLaunch(){
    if (animationRunning) {
        animationRunning = false;
        stopTimer();
    } else {
        animationRunning = true;
        startTimer();
        animate();
    }
}