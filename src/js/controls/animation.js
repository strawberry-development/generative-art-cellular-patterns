document.getElementById('animationSpeed').addEventListener('input', (event) => {
    updateAnimationSpeed(parseFloat(event.target.value));
});

function updateAnimationSpeed(target) {
    animationSpeed = target;
    document.getElementById('animationSpeedValue').innerText = `${target}x`;
}