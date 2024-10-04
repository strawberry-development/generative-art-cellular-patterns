document.getElementById('resetConfig').addEventListener('click', () => {
    resetConfig();
});

function resetConfig() {
    document.getElementById('seedValue').innerText = defaultConfig.seedValue;
    document.getElementById("seedInput").value = Number(defaultConfig.seedValue);
    document.getElementById("cellSize").value = defaultConfig.cellSize;
    document.getElementById("cellSizeValue").innerText = defaultConfig.cellSize;
    document.getElementById("recordDuration").value = defaultConfig.recordDuration;
    document.getElementById("recordDurationValue").innerText = defaultConfig.recordDuration;
    document.getElementById("aspectRatio").value = defaultConfig.aspectRatio;
    document.getElementById("aspectRatioValue").innerText = defaultConfig.aspectRatio;
    document.getElementById("canvasWidth").value = defaultConfig.canvasWidth;
    document.getElementById("canvasWidthValue").innerText = defaultConfig.canvasWidth;
    document.getElementById("backgroundColor").value = defaultConfig.backgroundColor;
    document.getElementById("colorPalette").value = defaultConfig.colorPalette;
    document.getElementById("surviveRules").value = defaultConfig.surviveRules;
    document.getElementById("birthRules").value = defaultConfig.birthRules;
    document.getElementById("animationSpeed").value = defaultConfig.animationSpeed;

    updateCellSize(defaultConfig.cellSize);
    updateRecordDuration(defaultConfig.recordDuration);
    updateAspectRatio(defaultConfig.aspectRatio.split('/'));
    updateCanvasWidth(defaultConfig.canvasWidth);
    updateBackgroundColor(defaultConfig.backgroundColor);
    updateColorPalette(defaultConfig.colorPalette);
    updateSurviveRules(defaultConfig.surviveRules);
    updateBirthRules(defaultConfig.birthRules);
    updateAnimationSpeed(defaultConfig.animationSpeed);
    
    updateCanvas(true);
}