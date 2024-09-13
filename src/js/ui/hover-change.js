const toggleElements = document.querySelectorAll('.toggleEm');

toggleElements.forEach(toggle => {
    const controlsDiv = toggle.closest('.controls');

    toggle.addEventListener('mouseenter', () => {
        controlsDiv.style.opacity = '0.5';
    });

    toggle.addEventListener('mouseleave', () => {
        controlsDiv.style.opacity = '1';
    });
});