function animateOriginal() {
    if (!animationRunning) return;
    update();
    draw(originalCtx);
    requestAnimationFrame(animateOriginal);
}

function animateSlowed() {
    if (!animationRunning) return;
    if (!document.getElementById('showSlowedCanvas').checked) return;
    update();
    draw(slowedCtx);
    setTimeout(animateSlowed, 100);
}