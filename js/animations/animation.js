function animate() {
    if (!animationRunning) return;

    update();

    setTimeout(() => {
        draw(originalCtx);
        requestAnimationFrame(animate);
    }, 100 / animationSpeed);
}
