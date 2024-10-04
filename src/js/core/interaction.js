let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;

const mouseCoordinatesElement = document.getElementById('mouseCoordinates');
const zoomLevelElement = document.getElementById('zoomLevel');

originalCanvas.addEventListener('wheel', (event) => {
    event.preventDefault();

    const mouseX = (event.offsetX - panX * zoomLevel) / zoomLevel;
    const mouseY = (event.offsetY - panY * zoomLevel) / zoomLevel;

    const zoomAmount = event.deltaY > 0 ? 0.9 : 1.1;
    const newZoomLevel = Math.max(0.5, Math.min(zoomLevel * zoomAmount, 10)); // Limit zoom level

    panX -= (mouseX * newZoomLevel - mouseX * zoomLevel);
    panY -= (mouseY * newZoomLevel - mouseY * zoomLevel);

    zoomLevel = newZoomLevel;
    zoomLevelElement.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;

    draw(originalCtx);
});

originalCanvas.addEventListener('mousedown', (event) => {
    isPanning = true;
    startX = event.offsetX - panX * zoomLevel;
    startY = event.offsetY - panY * zoomLevel;
});

originalCanvas.addEventListener('mousemove', (event) => {
    if (isPanning) {
        panX = (event.offsetX - startX) / zoomLevel;
        panY = (event.offsetY - startY) / zoomLevel;
        draw(originalCtx);
    }

    const mouseX = (event.offsetX - panX * zoomLevel) / zoomLevel;
    const mouseY = (event.offsetY - panY * zoomLevel) / zoomLevel;
    mouseCoordinatesElement.textContent = `Mouse Coords: (${Math.floor(mouseX)}, ${Math.floor(mouseY)})`;
});

originalCanvas.addEventListener('mouseup', () => {
    isPanning = false;
});

originalCanvas.addEventListener('mouseleave', () => {
    isPanning = false;
});

function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    zoomLevelElement.textContent = `Zoom: 100%`;
    draw(originalCtx);
}