document.getElementById('showSlowedCanvas').addEventListener('change', function () {
    const slowedCanvasContainer = document.getElementById('slowedCanvasContainer');
    if (this.checked) {
        slowedCanvasContainer.style.display = 'flex';
    } else {
        slowedCanvasContainer.style.display = 'none';
    }
});