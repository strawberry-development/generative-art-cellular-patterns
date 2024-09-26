const pageLoad = performance.now();

window.addEventListener('load', () => {
    const loadTime = performance.now() - pageLoad;
    const loadTimeElement = document.getElementById('load-time');
    loadTimeElement.textContent = `Page load in ${loadTime.toFixed(2)} ms`;
});

const paths = [
    'js/data/defaultConfig.js',

    'js/core/seed.js',
    'js/ui/controls.js',
    'js/ui/colorPalette.js',
    'js/ui/windows.js',
    'js/monitoring/log.js',
    'js/monitoring/fps.js',
    'js/core/timer.js',
    'js/core/render.js',
    'js/animations/animation.js',
    'js/core/record.js',
    'js/core/main.js',
    'js/core/shortcut.js',
    'js/ui/theme.js',
    'js/ui/hover-change.js',
    'js/ui/responsive.js',
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
