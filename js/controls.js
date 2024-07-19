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