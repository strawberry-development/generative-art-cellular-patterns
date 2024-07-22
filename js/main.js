const originalCanvas = document.getElementById('originalCanvas');
const originalCtx = originalCanvas.getContext('2d');
const slowedCanvas = document.getElementById('slowedCanvas');
const slowedCtx = slowedCanvas.getContext('2d');

let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 450;
let CELL_SIZE = 12;
let ASPECT_RATIO = 16 / 9;
let GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
let GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
let animationSpeed = 1;
let recordDuration = 10000; // Default to 10 seconds
let generationCount = 0;
let animationRunning = false;
let cells = [];
let backgroundColor = '#1f1f1f';
let surviveRules = [2, 3];
let birthRules = [3];
let colorPalette = "blackWhite";

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
    GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
    GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
}

function parseRules(ruleString) {
    return ruleString.split(',').map(Number);
}

updateCanvasSize();
init();
draw(originalCtx);
draw(slowedCtx);