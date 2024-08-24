document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch(event.key.toLowerCase()) {
            case 's':
                event.preventDefault();
                startButtonLaunch();
                break;
            case 'r':
                event.preventDefault();
                resetLaunch();
                break;
        }
    }
});