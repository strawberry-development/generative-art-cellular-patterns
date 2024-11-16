const canvasElement = document.getElementById('canvasElement');
const canvasCtx = canvasElement.getContext('2d');

function resetCanvasSize() {
    canvasElement.width = canvasElement.getBoundingClientRect().width;
    canvasElement.height = canvasElement.getBoundingClientRect().height;
    draw(canvasCtx);
}

const aspectRatioValue = defaultConfig.aspectRatio.split('/');
let ASPECT_RATIO = parseInt(aspectRatioValue[0]) / parseInt(aspectRatioValue[1]);

let RENDER_WIDTH = defaultConfig.canvasWidth;
let RENDER_HEIGHT = RENDER_WIDTH / ASPECT_RATIO;
let CELL_SIZE = defaultConfig.cellSize;
let GRID_WIDTH = Math.floor(RENDER_WIDTH / CELL_SIZE);
let GRID_HEIGHT = Math.floor(RENDER_HEIGHT / CELL_SIZE);
let recordDuration = defaultConfig.recordDuration * 100;
let generationCount = 0;
let aliveCount = 0;
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
    document.getElementById('aliveCount').innerText = countAliveCells().toString();
}

function updateDrawSize() {
    RENDER_WIDTH = Math.floor(RENDER_WIDTH / CELL_SIZE) * CELL_SIZE;
    RENDER_HEIGHT = Math.floor(RENDER_HEIGHT / CELL_SIZE) * CELL_SIZE;

    updateGridDimensions();
    updateSizeInfo();
}

function updateGridDimensions() {
    GRID_WIDTH = Math.floor(RENDER_WIDTH / CELL_SIZE);
    GRID_HEIGHT = Math.floor(RENDER_HEIGHT / CELL_SIZE);

    init();
}

function parseRules(ruleString) {
    return String(ruleString).split(',').map(Number);
}

function updateSizeInfo() {
    const intrinsicWidth = canvasElement.width;
    const intrinsicHeight = canvasElement.height;

    const actualWidth = canvasElement.clientWidth;
    const actualHeight = canvasElement.clientHeight;

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
    updateDrawSize();
    init();
    draw(canvasCtx);
});

// Start
resetConfig();
resetCanvasSize();
window.addEventListener('resize', resetCanvasSize);
