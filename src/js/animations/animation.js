function animate() {
    if (!animationRunning) return;

    update();

    setTimeout(() => {
        draw(canvasCtx);
        requestAnimationFrame(animate);
    }, 100 / animationSpeed);
}
