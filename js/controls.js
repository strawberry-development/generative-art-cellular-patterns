document.getElementById('cellSize').addEventListener('input', (e) => {
    CELL_SIZE = parseInt(e.target.value);
    document.getElementById('cellSizeValue').innerText = e.target.value;
    updateCanvasSize();
    init();
    draw(originalCtx);
    draw(slowedCtx);
});

document.getElementById('animationSpeed').addEventListener('input', (e) => {
    animationSpeed = parseInt(e.target.value);
    document.getElementById('animationSpeedValue').innerText = e.target.value;
});

document.getElementById('recordDuration').addEventListener('input', (e) => {
    recordDuration = parseInt(e.target.value) * 1000;
    document.getElementById('recordDurationValue').innerText = e.target.value;
});

document.getElementById('aspectRatio').addEventListener('change', (e) => {
    const aspectRatioValue = e.target.value.split('/');
    ASPECT_RATIO = parseInt(aspectRatioValue[0]) / parseInt(aspectRatioValue[1]);
    document.getElementById('aspectRatioValue').innerText = e.target.value;
    updateCanvasSize();
    init();
    draw(originalCtx);
    draw(slowedCtx);
});

document.getElementById('canvasWidth').addEventListener('input', (e) => {
    CANVAS_WIDTH = parseInt(e.target.value);
    document.getElementById('canvasWidthValue').innerText = e.target.value;
    updateCanvasSize();
    init();
    draw(originalCtx);
    draw(slowedCtx);
});

document.getElementById('backgroundColor').addEventListener('input', (e) => {
    backgroundColor = e.target.value;
    draw(originalCtx);
    draw(slowedCtx);
});

document.getElementById('colorPalette').addEventListener('change', (e) => {
    colorPalette = e.target.value;
    draw(originalCtx);
    draw(slowedCtx);
});

document.getElementById('surviveRules').addEventListener('input', (e) => {
    surviveRules = parseRules(e.target.value);
});

document.getElementById('birthRules').addEventListener('input', (e) => {
    birthRules = parseRules(e.target.value);
});

document.getElementById('startButton').addEventListener('click', () => {
    if (animationRunning) {
        animationRunning = false;
        document.getElementById('startButton').innerText = 'Start';
    } else {
        animationRunning = true;
        animateOriginal();
        animateSlowed();
        recordAnimation(originalCanvas, 'generative_art_original');
        recordAnimation(slowedCanvas, 'generative_art_slowed');
        document.getElementById('startButton').innerText = 'Stop';
    }
});

document.getElementById('randomizeButton').addEventListener('click', () => {
    init();
    draw(originalCtx);
    draw(slowedCtx);
});

function seedApply() {
    const seedInput = document.getElementById('seedInput').value.trim();

    if (seedInput === '') {
        alert('Seed value cannot be empty.');
        return;
    }
    document.getElementById('seedValue').innerText = seedInput;

    updateCanvasSize();
    init(seedInput);
    draw(originalCtx);
    draw(slowedCtx);
}