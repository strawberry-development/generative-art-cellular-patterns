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

function init() {
    cells = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
        cells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            cells[x][y] = Math.random() > 0.85 ? 1 : 0;
        }
    }
}

function draw(ctx) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            if (cells[x][y] === 1) {
                ctx.fillStyle = getCellColor();
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function getCellColor() {
    switch (colorPalette) {
        case "blackWhite":
            return "#ffffff";
        case "grey":
            return "#888888";
        case "warm":
            return getRandomWarmColor();
        case "cold":
            return getRandomcoldColor();
        case "random":
        default:
            return getRandomColor();
    }
}

function getRandomWarmColor() {
    const hue = Math.floor(Math.random() * 60);
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function getRandomcoldColor() {
    const hue = Math.floor(Math.random() * 60) + 180;
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function update() {
    const nextCells = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
        nextCells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const neighbors = countNeighbors(x, y);
            if (cells[x][y] === 1) {
                nextCells[x][y] = surviveRules.includes(neighbors) ? 1 : 0;
            } else {
                nextCells[x][y] = birthRules.includes(neighbors) ? 1 : 0;
            }
        }
    }
    cells = nextCells;
    generationCount++;
    document.getElementById('generationCount').innerText = generationCount;
}

function countNeighbors(cx, cy) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const x = (cx + i + GRID_WIDTH) % GRID_WIDTH;
            const y = (cy + j + GRID_HEIGHT) % GRID_HEIGHT;
            if (cells[x][y] === 1 && !(i === 0 && j === 0)) {
                count++;
            }
        }
    }
    return count;
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
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