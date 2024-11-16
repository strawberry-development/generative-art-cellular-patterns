let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;

let mouseX;
let mouseY;

const mouseCoordinatesElement = document.getElementById('mouseCoordinates');
const zoomLevelElement = document.getElementById('zoomLevel');

canvasElement.style.cursor = 'grab';

canvasElement.addEventListener('wheel', (event) => {
    event.preventDefault();

    // Get the center of the canvas
    const canvasCenterX = canvasElement.width / 2;
    const canvasCenterY = canvasElement.height / 2;

    // Calculate mouse position before zoom relative to the center
    const mouseBeforeZoomX = (event.offsetX - canvasCenterX - panX * zoomLevel) / zoomLevel;
    const mouseBeforeZoomY = (event.offsetY - canvasCenterY - panY * zoomLevel) / zoomLevel;

    // Adjust zoom level
    const zoomAmount = event.deltaY > 0 ? 0.9 : 1.1;
    const newZoomLevel = Math.max(0.5, Math.min(zoomLevel * zoomAmount, 10)); // Limit zoom level

    // Update zoom level and pan offsets to keep mouse position stable
    zoomLevel = newZoomLevel;
    zoomLevelElement.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;

    // Adjust pan based on the new zoom level
    panX = (event.offsetX - canvasCenterX) / zoomLevel - mouseBeforeZoomX;
    panY = (event.offsetY - canvasCenterY) / zoomLevel - mouseBeforeZoomY;

    draw(canvasCtx);
});

canvasElement.addEventListener('mousedown', (event) => {
    isPanning = true;

    // Get the center of the canvas
    const canvasCenterX = canvasElement.width / 2;
    const canvasCenterY = canvasElement.height / 2;

    // Start positions adjusted to the center
    startX = event.offsetX - canvasCenterX - panX * zoomLevel;
    startY = event.offsetY - canvasCenterY - panY * zoomLevel;

    canvasElement.style.cursor = 'grabbing';
});

canvasElement.addEventListener('mousemove', (event) => {
    if (isPanning) {
        // Get the center of the canvas
        const canvasCenterX = canvasElement.width / 2;
        const canvasCenterY = canvasElement.height / 2;

        // Update pan positions relative to the center
        panX = (event.offsetX - canvasCenterX - startX) / zoomLevel;
        panY = (event.offsetY - canvasCenterY - startY) / zoomLevel;
        draw(canvasCtx);
    }

    // Update mouse coordinates relative to the center and the current pan/zoom
    const canvasCenterX = canvasElement.width / 2;
    const canvasCenterY = canvasElement.height / 2;

    mouseX = Math.floor((event.offsetX - canvasCenterX - panX * zoomLevel) / zoomLevel);
    mouseY = Math.floor((event.offsetY - canvasCenterY - panY * zoomLevel) / zoomLevel);
    mouseCoordinatesElement.textContent = `Mouse Coords: (${mouseX}, ${mouseY})`;
});

canvasElement.addEventListener('mouseup', () => {
    isPanning = false;
    canvasElement.style.cursor = 'grab';
});

canvasElement.addEventListener('mouseleave', () => {
    isPanning = false;
    canvasElement.style.cursor = 'grab';
});

function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    zoomLevelElement.textContent = `Zoom: 100%`;
    draw(canvasCtx);
}