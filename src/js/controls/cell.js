document.getElementById('cellSize').addEventListener('input', (e) => {
    updateCellSize(e.target.value);
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateCellSize(target) {
    CELL_SIZE = parseInt(target);
    document.getElementById('cellSizeValue').innerText = target;
}

document.getElementById('colorPalette').addEventListener('change', (e) => {
    updateColorPalette(e.target.value);
    updateCanvas();
});

function updateColorPalette(target) {
    colorPalette = target;
}

document.getElementById('surviveRules').addEventListener('input', (e) => {
    updateSurviveRules(e.target.value);
});

function updateSurviveRules(target) {
    surviveRules = parseRules(target);
}

document.getElementById('birthRules').addEventListener('input', (e) => {
    updateBirthRules(e.target.value);
});

function updateBirthRules(target) {
    birthRules = parseRules(target);
}

document.getElementById('apparitionFrequency').addEventListener('input', (e) => {
    updateApparitionFrequency(e.target.value);
});

function updateApparitionFrequency(target) {
    const seed = document.getElementById('seedValue').innerText;
    document.getElementById('apparitionFrequencyValue').innerText = target;
    apparitionFrequency = parseRules(target);
    updateCanvas(false, true, seed);
}

document.getElementById('randomizeButton').addEventListener('click', () => {
    updateCanvas(false, true);
});

function seedApply() {
    const seedInput = document.getElementById('seedInput').value.trim();

    if (seedInput === '') {
        alert('Seed value cannot be empty.');
        return;
    }
    document.getElementById('seedValue').innerText = seedInput;

    updateCanvas(true, true, seedInput);
}