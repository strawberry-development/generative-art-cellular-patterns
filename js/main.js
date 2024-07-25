const originalCanvas = document.getElementById('originalCanvas');
const originalCtx = originalCanvas.getContext('2d');
const slowedCanvas = document.getElementById('slowedCanvas');
const slowedCtx = slowedCanvas.getContext('2d');

const aspectRatioValue = config.aspectRatio.split('/');
let ASPECT_RATIO = parseInt(aspectRatioValue[0]) / parseInt(aspectRatioValue[1]);
let CANVAS_WIDTH = config.canvasWidth;
let CANVAS_HEIGHT = CANVAS_WIDTH / ASPECT_RATIO;
let CELL_SIZE = config.cellSize;
let GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
let GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
let animationSpeed = config.animationSpeed;
let recordDuration = config.recordDuration * 100;
let generationCount = 0;
let animationRunning = false;
let cells = [];
let backgroundColor = config.backgroundColor;
let surviveRules = config.surviveRules;
let birthRules = config.birthRules;
let colorPalette = config.colorPalette;

function init(seed = generateRandomSeed()) {
    const rng = new MersenneTwister(seed);

    document.getElementById('seedValue').innerText = seed;

    cells = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
        cells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            cells[x][y] = rng.random() > 0.85 ? 1 : 0;
        }
    }
}

function updateCanvasSize() {
    CANVAS_WIDTH = parseInt(document.getElementById('canvasWidth').value);
    CANVAS_HEIGHT = CANVAS_WIDTH / ASPECT_RATIO;
    originalCanvas.width = slowedCanvas.width = CANVAS_WIDTH;
    originalCanvas.height = slowedCanvas.height = CANVAS_HEIGHT;
    updateGridDimensions();
}

function updateGridDimensions() {
    GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
    GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
    init();
}

function parseRules(ruleString) {
    return String(ruleString).split(',').map(Number);
}

document.addEventListener("DOMContentLoaded", (event) => {
    updateCanvasSize();
    init();
    draw(originalCtx);
    draw(slowedCtx);
});