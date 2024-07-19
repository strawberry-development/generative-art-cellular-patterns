const originalCanvas = document.getElementById('originalCanvas');
const originalCtx = originalCanvas.getContext('2d');
const slowedCanvas = document.getElementById('slowedCanvas');
const slowedCtx = slowedCanvas.getContext('2d');

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight * 0.7;

const ASPECT_RATIO = 9 / 16;
const CANVAS_HEIGHT = HEIGHT;
const CANVAS_WIDTH = HEIGHT * ASPECT_RATIO;

originalCanvas.width = slowedCanvas.width = CANVAS_WIDTH;
originalCanvas.height = slowedCanvas.height = CANVAS_HEIGHT;

let CELL_SIZE = 12;
let GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
let GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
let animationSpeed = 1;
let recordDuration = 10000;
let generationCount = 0;
let animationRunning = false;

const cells = [];

function init() {
    for (let x = 0; x < GRID_WIDTH; x++) {
        cells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            cells[x][y] = Math.random() > 0.85 ? 1 : 0;
        }
    }
    generationCount = 0;
    document.getElementById('generationCount').innerText = generationCount;
}

function draw(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            if (cells[x][y] === 1) {
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function update() {
    const nextCells = [];
    generationCount++;

    for (let x = 0; x < GRID_WIDTH; x++) {
        nextCells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const neighbors = countNeighbors(x, y);
            if (cells[x][y] === 1) {
                nextCells[x][y] = neighbors < 2 || neighbors > 3 ? 0 : 1;
            } else {
                nextCells[x][y] = neighbors === 3 ? 1 : 0;
            }
        }
    }

    cells.splice(0, cells.length, ...nextCells);
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

function animateOriginal() {
    if (!animationRunning) return;
    update();
    draw(originalCtx);
    setTimeout(animateOriginal, 1000 / animationSpeed);
}

function animateSlowed() {
    if (!animationRunning) return;
    update();
    draw(slowedCtx);
    setTimeout(animateSlowed, 100);
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '70%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

async function recordAnimation(canvas, prefix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${prefix}_${timestamp}.mp4`;
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
    const chunks = [];

    mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    };

    mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    await new Promise(resolve => setTimeout(resolve, recordDuration));
    mediaRecorder.stop();
}

document.getElementById('cellSize').addEventListener('input', (e) => {
    CELL_SIZE = parseInt(e.target.value);
    GRID_WIDTH = Math.floor(CANVAS_WIDTH / CELL_SIZE);
    GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / CELL_SIZE);
    init();
    document.getElementById('cellSizeValue').innerText = CELL_SIZE;
});

document.getElementById('animationSpeed').addEventListener('input', (e) => {
    animationSpeed = parseInt(e.target.value);
    document.getElementById('animationSpeedValue').innerText = animationSpeed;
});

document.getElementById('recordDuration').addEventListener('input', (e) => {
    recordDuration = parseInt(e.target.value) * 1000;
    document.getElementById('recordDurationValue').innerText = e.target.value;
});

document.getElementById('startButton').addEventListener('click', () => {
    if (!animationRunning) {
        animationRunning = true;
        init();
        animateOriginal();
        animateSlowed();
        recordAnimation(originalCanvas, 'generative_art_original');
        recordAnimation(slowedCanvas, 'generative_art_slowed');
    }
});

document.getElementById('randomizeButton').addEventListener('click', () => {
    init();
    draw(originalCtx);
    draw(slowedCtx);
});