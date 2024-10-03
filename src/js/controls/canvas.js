function updateCanvas(size = false, initFlag = false, seed = null) {
    if (size) {
        updateCanvasSize();
    }

    if (initFlag) {
        if (seed) {
            init(seed);
        } else {
            init();
        }
    }

    draw(originalCtx);
}

document.getElementById('aspectRatio').addEventListener('change', (e) => {
    updateAspectRatio(e.target.value.split('/'));
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateAspectRatio(target) {
    ASPECT_RATIO = parseInt(target[0]) / parseInt(target[1]);
    document.getElementById('aspectRatioValue').innerText = target.join(':');
    CANVAS_WIDTH = parseInt(document.getElementById('canvasWidth').value);
    CANVAS_HEIGHT = CANVAS_WIDTH / ASPECT_RATIO;
}

document.getElementById('canvasWidth').addEventListener('input', (e) => {
    updateCanvasWidth(e.target.value);
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
});

function updateCanvasWidth(target) {
    CANVAS_WIDTH = parseInt(target);
    CANVAS_HEIGHT = CANVAS_WIDTH / ASPECT_RATIO;
    document.getElementById('canvasWidthValue').innerText = target;
}

document.getElementById('customSizeCheckbox').addEventListener('change', (e) => {
    const isCustomSize = e.target.checked;
    const customWidthInput = document.getElementById('customWidth');
    const customHeightInput = document.getElementById('customHeight');
    const aspectRatioSelect = document.getElementById('aspectRatio');
    const canvasWidthSlider = document.getElementById('canvasWidth');

    // enable/disable custom size inputs
    customWidthInput.disabled = !isCustomSize;
    customHeightInput.disabled = !isCustomSize;

    // Disable aspect ratio and canvas width slider when custom size is enabled
    aspectRatioSelect.disabled = isCustomSize;
    canvasWidthSlider.disabled = isCustomSize;

    if (isCustomSize) {
        updateCustomSize(customWidthInput.value, customHeightInput.value);
    } else {
        // If custom size is disabled, revert to aspect ratio settings
        const seed = document.getElementById('seedValue').innerText;
        updateCanvas(true, true, seed);
    }
});

// Add event listeners for the custom width and height inputs
document.getElementById('customWidth').addEventListener('input', (e) => {
    const customWidth = e.target.value;
    const customHeight = document.getElementById('customHeight').value;
    updateCustomSize(customWidth, customHeight);
});

document.getElementById('customHeight').addEventListener('input', (e) => {
    const customHeight = e.target.value;
    const customWidth = document.getElementById('customWidth').value;
    updateCustomSize(customWidth, customHeight);
});

function updateCustomSize(width, height) {
    CANVAS_WIDTH = parseInt(width);
    CANVAS_HEIGHT = parseInt(height);
    const seed = document.getElementById('seedValue').innerText;
    updateCanvas(true, true, seed);
}

document.getElementById('backgroundColor').addEventListener('input', (e) => {
    updateBackgroundColor(e.target.value);
    updateCanvas();
});

function updateBackgroundColor(target) {
    backgroundColor = target;
}