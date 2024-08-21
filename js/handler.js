const paths = [
    'js/data/defaultConfig.js',

    'js/core/seed.js',
    'js/ui/controls.js',
    'js/ui/colorPalette.js',
    'js/core/timer.js',
    'js/core/render.js',
    'js/animations/animation.js',
    'js/core/record.js',
    'js/core/main.js',
    'js/core/shortcut.js',
    'js/ui/theme.js',
    'js/data/localStorage.js'
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
    for (const script of paths) {
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
