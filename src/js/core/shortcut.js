document.addEventListener('keydown', function(event) {
    const toggleShortcuts = document.getElementById('toggleShortcuts');

    if (toggleShortcuts.checked) {
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
    }
});