let fpsElement = document.getElementById('fps');
let lastFrameTime = performance.now();
let frameCount = 0;

function updateFPS(now) {
    frameCount++;

    let deltaTime = now - lastFrameTime;

    if (deltaTime >= 1000) { // Update FPS every second
        let fps = Math.round((frameCount / deltaTime) * 1000);
        fpsElement.textContent = `FPS: ${fps}`;
        frameCount = 0;
        lastFrameTime = now;
    }

    requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);