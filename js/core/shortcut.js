document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        startButtonLaunch();
    }

    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        resetLaunch();
    }
});