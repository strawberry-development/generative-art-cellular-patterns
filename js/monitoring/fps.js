let fpsElement = document.getElementById('fps');
let lastFrameTime = performance.now();
let fps = 0;
let frameCount = 0;

function updateFPS() {
    let now = performance.now();
    let deltaTime = now - lastFrameTime;
    frameCount++;

    if (deltaTime >= 1000) { // Update FPS every second
        fps = Math.round((frameCount / deltaTime) * 1000);
        fpsElement.textContent = `FPS: ${fps}`;
        frameCount = 0;
        lastFrameTime = now;
    }

    requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);