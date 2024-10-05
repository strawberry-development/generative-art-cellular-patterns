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

originalCanvas.style.cursor = 'grab';

originalCanvas.addEventListener('wheel', (event) => {
    event.preventDefault();

    const mouseBeforeZoomX = (event.offsetX - panX * zoomLevel) / zoomLevel;
    const mouseBeforeZoomY = (event.offsetY - panY * zoomLevel) / zoomLevel;

    const zoomAmount = event.deltaY > 0 ? 0.9 : 1.1;
    const newZoomLevel = Math.max(0.5, Math.min(zoomLevel * zoomAmount, 10)); // Limit zoom level

    zoomLevel = newZoomLevel;
    zoomLevelElement.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;

    panX = event.offsetX / zoomLevel - mouseBeforeZoomX;
    panY = event.offsetY / zoomLevel - mouseBeforeZoomY;

    draw(originalCtx);
});

originalCanvas.addEventListener('mousedown', (event) => {
    isPanning = true;
    startX = event.offsetX - panX * zoomLevel;
    startY = event.offsetY - panY * zoomLevel;

    originalCanvas.style.cursor = 'grabbing';
});

originalCanvas.addEventListener('mousemove', (event) => {
    if (isPanning) {
        panX = Math.floor((event.offsetX - startX) / zoomLevel);
        panY = Math.floor((event.offsetY - startY) / zoomLevel);
        draw(originalCtx);
    }

    mouseX = Math.floor((event.offsetX - panX * zoomLevel) / zoomLevel);
    mouseY = Math.floor((event.offsetY - panY * zoomLevel) / zoomLevel);
    mouseCoordinatesElement.textContent = `Mouse Coords: (${mouseX}, ${mouseY})`;
});

originalCanvas.addEventListener('mouseup', () => {
    isPanning = false;
    originalCanvas.style.cursor = 'grab';
});

originalCanvas.addEventListener('mouseleave', () => {
    isPanning = false;
    originalCanvas.style.cursor = 'grab';
});

function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    zoomLevelElement.textContent = `Zoom: 100%`;
    draw(originalCtx);
}