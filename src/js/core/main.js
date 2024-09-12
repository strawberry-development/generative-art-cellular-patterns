const originalCanvas = document.getElementById('originalCanvas');
const originalCtx = originalCanvas.getContext('2d');

const aspectRatioValue = defaultConfig.aspectRatio.split('/');
let ASPECT_RATIO = parseInt(aspectRatioValue[0]) / parseInt(aspectRatioValue[1]);
let CANVAS_WIDTH = defaultConfig.canvasWidth;
let CANVAS_HEIGHT = CANVAS_WIDTH / ASPECT_RATIO;
let CELL_SIZE = defaultConfig.cellSize;
let GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
let GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
let recordDuration = defaultConfig.recordDuration * 100;
let generationCount = 0;
let cells = [];
let backgroundColor = defaultConfig.backgroundColor;
let surviveRules = defaultConfig.surviveRules;
let birthRules = defaultConfig.birthRules;
let colorPalette = defaultConfig.colorPalette;
let animationSpeed = defaultConfig.animationSpeed;
let apparitionFrequency = defaultConfig.apparitionFrequency;

const IntrinsicSizeElement = document.getElementById('IntrinsicSize');
const ActualSizeElement = document.getElementById('ActualSize');
const WidthRatioElement = document.getElementById('WidthRatio');
const HeightRatioElement = document.getElementById('HeightRatio');

function init(seed = generateRandomSeed()) {
    const rng = new MersenneTwister(seed);

    document.getElementById('seedValue').innerText = seed;

    cells = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
        cells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            cells[x][y] = rng.random() > apparitionFrequency ? 1 : 0;
        }
    }
    updateSizeInfo();
}

function updateCanvasSize() {
    CANVAS_WIDTH = parseInt(document.getElementById('canvasWidth').value);
    CANVAS_HEIGHT = CANVAS_WIDTH / ASPECT_RATIO;
    originalCanvas.width = CANVAS_WIDTH;
    originalCanvas.height = CANVAS_HEIGHT;
    updateGridDimensions();
    updateSizeInfo();
}

function updateGridDimensions() {
    GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
    GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
    init();
}

function parseRules(ruleString) {
    return String(ruleString).split(',').map(Number);
}

function updateSizeInfo() {
    const intrinsicWidth = originalCanvas.width;
    const intrinsicHeight = originalCanvas.height;

    const actualWidth = originalCanvas.clientWidth;
    const actualHeight = originalCanvas.clientHeight;

    const widthRatio = ((actualWidth / intrinsicWidth) * 100).toFixed(2);
    const heightRatio = ((actualHeight / intrinsicHeight) * 100).toFixed(2);

    IntrinsicSizeElement.textContent = `${intrinsicWidth}px x ${intrinsicHeight}px, `;
    ActualSizeElement.textContent = `${actualWidth}px x ${actualHeight}px, `;
    WidthRatioElement.textContent = `Width Ratio: ${widthRatio}%`;
    HeightRatioElement.textContent = `Height Ratio: ${heightRatio}%`;
}

window.addEventListener('resize', () => {
    updateSizeInfo();
});

document.addEventListener("DOMContentLoaded", (event) => {
    updateCanvasSize();
    init();
    draw(originalCtx);
});

resetConfig();