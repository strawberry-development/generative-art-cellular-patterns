function draw(ctx) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            if (cells[x] && cells[x][y] === 1) {
                ctx.fillStyle = getCellColor();
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
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
            if (cells[x] && cells[x][y] === 1 && !(i === 0 && j === 0)) {
                count++;
            }
        }
    }
    return count;
}