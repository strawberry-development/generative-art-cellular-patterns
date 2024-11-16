function draw(ctx) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.save();

    ctx.translate(canvasElement.width / 2, canvasElement.height / 2);

    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(panX, panY);

    // Drawing the grid/cells
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            ctx.fillStyle = cells[x][y] ? getCellColor() : backgroundColor;
            ctx.fillRect(
                x * CELL_SIZE - (GRID_WIDTH * CELL_SIZE) / 2,
                y * CELL_SIZE - (GRID_HEIGHT * CELL_SIZE) / 2,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.restore();
}

function update() {
    const nextCells = [];
    aliveCount = 0;
    for (let x = 0; x < GRID_WIDTH; x++) {
        nextCells[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const neighbors = countNeighbors(x, y);
            if (cells[x][y] === 1) {
                nextCells[x][y] = surviveRules.includes(neighbors) ? 1 : 0;
            } else {
                nextCells[x][y] = birthRules.includes(neighbors) ? 1 : 0;
            }

            // Count alive cells in the new grid
            if (nextCells[x][y] === 1) {
                aliveCount++;
            }
        }
    }
    cells = nextCells;
    generationCount++;

    // Update generation count and alive cells count in the DOM
    document.getElementById('generationCount').innerText = generationCount;
    document.getElementById('aliveCount').innerText = aliveCount;
}

function countAliveCells() {
    let aliveCount = 0;
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            if (cells[x][y] === 1) {
                aliveCount++;
            }
        }
    }
    return aliveCount;
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