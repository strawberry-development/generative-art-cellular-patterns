document.getElementById('cellSize').addEventListener('input', (e) => {
    updateCellSize(e.target.value);
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateCellSize(target) {
    CELL_SIZE = parseInt(target);
    document.getElementById('cellSizeValue').innerText = target;
}

document.getElementById('animationSpeed').addEventListener('input', (e) => {
    updateAnimationSpeed(e.target.value);
    document.getElementById('animationSpeedValue').innerText = e.target.value;
});

function updateAnimationSpeed(target) {
    animationSpeed = parseInt(target);
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
    const aspectRatioValue = target;
    ASPECT_RATIO = parseInt(aspectRatioValue[0]) / parseInt(aspectRatioValue[1]);
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
    surviveRules = parseRules(target);
}

document.getElementById('reset').addEventListener('click', () => {
    const seed = document.getElementById('seedValue').innerText;
    generationCount = 0;
    document.getElementById('generationCount').innerText = generationCount;
    updateCanvas(false, true, seed);
});


document.getElementById('startButton').addEventListener('click', () => {
    if (animationRunning) {
        animationRunning = false;
        document.getElementById('startButton').innerText = '▶️ Start';
    } else {
        animationRunning = true;
        animateOriginal();
        animateSlowed();
        document.getElementById('startButton').innerText = '🛑 Stop';
    }
});

document.getElementById('record').addEventListener('click', () => {
    animationRunning = true;
    animateOriginal();
    animateSlowed();
    recordAnimation(originalCanvas, 'generative_art_original');
    recordAnimation(slowedCanvas, 'generative_art_slowed');
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
    draw(slowedCtx);
}

document.getElementById('resetConfig').addEventListener('click', () => {
    reset();
});

function reset(){
    document.getElementById("seedInput").value = Number(config.seedValue);
    document.getElementById("cellSize").value = config.cellSize;
    document.getElementById("cellSizeValue").innerText = config.cellSize;
    document.getElementById("animationSpeed").value = config.animationSpeed;
    document.getElementById("animationSpeedValue").innerText = config.animationSpeed;
    document.getElementById("recordDuration").value = config.recordDuration;
    document.getElementById("recordDurationValue").innerText = config.recordDuration;
    document.getElementById("aspectRatio").value = config.aspectRatio;
    document.getElementById("aspectRatioValue").innerText = config.aspectRatio;
    document.getElementById("canvasWidth").value = config.canvasWidth;
    document.getElementById("canvasWidthValue").innerText = config.canvasWidth;
    document.getElementById("backgroundColor").value = config.backgroundColor;
    document.getElementById("colorPalette").value = config.colorPalette;
    document.getElementById("surviveRules").value = config.surviveRules;
    document.getElementById("birthRules").value = config.birthRules;

    updateCellSize(config.cellSize);
    updateAnimationSpeed(config.animationSpeed);
    updateRecordDuration(config.recordDuration);
    updateAspectRatio(config.aspectRatio.split('/'));

    updateCanvasWidth(config.canvasWidth);
    updateBackgroundColor(config.backgroundColor);
    updateColorPalette(config.colorPalette);
    updateSurviveRules(config.surviveRules);
    updateBirthRules(config.birthRules);

    updateCanvas(true);
}