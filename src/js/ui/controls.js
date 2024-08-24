document.getElementById('cellSize').addEventListener('input', (e) => {
    updateCellSize(e.target.value);
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateCellSize(target) {
    CELL_SIZE = parseInt(target);
    document.getElementById('cellSizeValue').innerText = target;
}

document.getElementById('recordDuration').addEventListener('input', (e) => {
    updateRecordDuration(e.target.value);
    document.getElementById('recordDurationValue').innerText = e.target.value;
});

function updateRecordDuration(target) {
    recordDuration = parseInt(target) * 1000;
}

document.getElementById('aspectRatio').addEventListener('change', (e) => {
    updateAspectRatio(e.target.value.split('/'));
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateAspectRatio(target) {
    ASPECT_RATIO = parseInt(target[0]) / parseInt(target[1]);
    document.getElementById('aspectRatioValue').innerText = target;
}

document.getElementById('canvasWidth').addEventListener('input', (e) => {
    updateCanvasWidth(e.target.value);
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateCanvasWidth(target) {
    CANVAS_WIDTH = parseInt(target);
    document.getElementById('canvasWidthValue').innerText = target;
}

document.getElementById('backgroundColor').addEventListener('input', (e) => {
    updateBackgroundColor(e.target.value);
    updateCanvas();
});

function updateBackgroundColor(target) {
    backgroundColor = target;
}

document.getElementById('colorPalette').addEventListener('change', (e) => {
    updateColorPalette(e.target.value);
    updateCanvas();
});

function updateColorPalette(target) {
    colorPalette = target;
}

document.getElementById('surviveRules').addEventListener('input', (e) => {
    updateSurviveRules(e.target.value);
});

function updateSurviveRules(target) {
    surviveRules = parseRules(target);
}

document.getElementById('birthRules').addEventListener('input', (e) => {
    updateBirthRules(e.target.value);
});

function updateBirthRules(target) {
    birthRules = parseRules(target);
}

document.getElementById('apparitionFrequency').addEventListener('input', (e) => {
    updateApparitionFrequency(e.target.value);
});

function updateApparitionFrequency(target) {
    const seed = document.getElementById('seedValue').innerText;
    document.getElementById('apparitionFrequencyValue').innerText = target;
    apparitionFrequency = parseRules(target);
    updateCanvas(false, true, seed);
}

document.getElementById('reset').addEventListener('click', () => {
    resetLaunch();
});

function resetLaunch(){
    const seed = document.getElementById('seedValue').innerText;
    generationCount = 0;
    resetTimer();
    document.getElementById('generationCount').innerText = generationCount;
    updateCanvas(false, true, seed);
}

document.getElementById('startButton').addEventListener('click', () => {
    startButtonLaunch();
});

function startButtonLaunch(){
    if (animationRunning) {
        animationRunning = false;
        document.getElementById('startButton').innerText = 'Start';
        stopTimer();
    } else {
        animationRunning = true;
        document.getElementById('startButton').innerText = 'Pause';
        startTimer();
        animate();
    }
}

document.getElementById('record').addEventListener('click', async () => {
    if (!animationRunning) {
        animationRunning = true;
        document.getElementById('startButton').innerText = 'Pause';
        startTimer();
        animate();
    }

    // Record the original canvas
    await recordAnimation(originalCanvas, 'original');

    // Stop the animations and reset the UI
    animationRunning = false;
    document.getElementById('startButton').innerText = 'Start';
});

document.getElementById('randomizeButton').addEventListener('click', () => {
    updateCanvas(false, true);
});

function seedApply() {
    const seedInput = document.getElementById('seedInput').value.trim();

    if (seedInput === '') {
        alert('Seed value cannot be empty.');
        return;
    }
    document.getElementById('seedValue').innerText = seedInput;

    updateCanvas(true, true, seedInput);
}

function updateCanvas(size = false, initFlag = false, seed = null) {
    if (size) {
        updateCanvasSize();
    }

    if (initFlag) {
        if (seed) {
            init(seed);
        } else {
            init();
        }
    }

    draw(originalCtx);
}

document.getElementById('refreshLink').addEventListener('click', function (event) {
    event.preventDefault();
    location.reload();
});

document.getElementById('animationSpeed').addEventListener('input', (event) => {
    updateAnimationSpeed(parseFloat(event.target.value));
});

function updateAnimationSpeed(target) {
    animationSpeed = target;
    document.getElementById('animationSpeedValue').innerText = `${target}x`;
}

document.getElementById('resetConfig').addEventListener('click', () => {
    resetConfig();
});

function resetConfig() {
    document.getElementById('seedValue').innerText = defaultConfig.seedValue;
    document.getElementById("seedInput").value = Number(defaultConfig.seedValue);
    document.getElementById("cellSize").value = defaultConfig.cellSize;
    document.getElementById("cellSizeValue").innerText = defaultConfig.cellSize;
    document.getElementById("recordDuration").value = defaultConfig.recordDuration;
    document.getElementById("recordDurationValue").innerText = defaultConfig.recordDuration;
    document.getElementById("aspectRatio").value = defaultConfig.aspectRatio;
    document.getElementById("aspectRatioValue").innerText = defaultConfig.aspectRatio;
    document.getElementById("canvasWidth").value = defaultConfig.canvasWidth;
    document.getElementById("canvasWidthValue").innerText = defaultConfig.canvasWidth;
    document.getElementById("backgroundColor").value = defaultConfig.backgroundColor;
    document.getElementById("colorPalette").value = defaultConfig.colorPalette;
    document.getElementById("surviveRules").value = defaultConfig.surviveRules;
    document.getElementById("birthRules").value = defaultConfig.birthRules;
    document.getElementById("animationSpeed").value = defaultConfig.animationSpeed;

    updateCellSize(defaultConfig.cellSize);
    updateRecordDuration(defaultConfig.recordDuration);
    updateAspectRatio(defaultConfig.aspectRatio.split('/'));
    updateCanvasWidth(defaultConfig.canvasWidth);
    updateBackgroundColor(defaultConfig.backgroundColor);
    updateColorPalette(defaultConfig.colorPalette);
    updateSurviveRules(defaultConfig.surviveRules);
    updateBirthRules(defaultConfig.birthRules);
    updateAnimationSpeed(defaultConfig.animationSpeed);

    updateCanvas(true);
}