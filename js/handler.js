const scripts = [
    'js/seed.js',
    'js/controls.js',
    'js/colorPalette.js',
    'js/render.js',
    'js/hideSlowedCanvas.js',
    'js/animation.js',
    'js/record.js',
    'js/main.js',
    'js/theme.js',
    'js/localStorage.js'
];

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

async function loadAllScripts() {
    for (const script of scripts) {
        try {
            await loadScript(script);
            console.log(`Successfully loaded ${script}`);
        } catch (error) {
            console.error(error);
        }
    }
}

loadAllScripts().then(() => {
    console.log('All scripts have been loaded.');
});
