// Function to save all parameters to localStorage
function saveSettings() {
    const settings = {
        seed: document.getElementById('seedInput').value,
        cellSize: document.getElementById('cellSize').value,
        animationSpeed: document.getElementById('animationSpeed').value,
        recordDuration: document.getElementById('recordDuration').value,
        aspectRatio: document.getElementById('aspectRatio').value,
        canvasWidth: document.getElementById('canvasWidth').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        colorPalette: document.getElementById('colorPalette').value,
        surviveRules: document.getElementById('surviveRules').value,
        birthRules: document.getElementById('birthRules').value,
    };

    localStorage.setItem('settings', JSON.stringify(settings));
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    if (settings) {
        document.getElementById('seedInput').value = settings.seed || '1234567890';
        document.getElementById('cellSize').value = settings.cellSize || 12;
        document.getElementById('animationSpeed').value = settings.animationSpeed || 1;
        document.getElementById('recordDuration').value = settings.recordDuration || 10;
        document.getElementById('aspectRatio').value = settings.aspectRatio || '16/9';
        document.getElementById('canvasWidth').value = settings.canvasWidth || 800;
        document.getElementById('backgroundColor').value = settings.backgroundColor || '#1f1f1f';
        document.getElementById('colorPalette').value = settings.colorPalette || 'blackWhite';
        document.getElementById('surviveRules').value = settings.surviveRules || '2,3';
        document.getElementById('birthRules').value = settings.birthRules || '3';
    }
}

// Function to export settings as a JSON file
function exportSettings() {
    const settings = localStorage.getItem('settings');

    if (settings) {
        const blob = new Blob([settings], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('No settings to export.');
    }
}

function importSettings(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const settings = JSON.parse(e.target.result);

        if (settings) {
            localStorage.setItem('settings', JSON.stringify(settings));
            loadSettings();
        }
    };

    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    /*
    document.getElementById('exportSettings').addEventListener('click', exportSettings);

    document.getElementById('importSettingsButton').addEventListener('click', function() {
        document.getElementById('importSettings').click();
    });
    document.getElementById('importSettings').addEventListener('change', importSettings);
    */
});