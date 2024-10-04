performance.mark('pageStart');

window.addEventListener('load', function() {
    performance.mark('pageEnd');
    performance.measure('pageLoad', 'pageStart', 'pageEnd');

    const [measure] = performance.getEntriesByName('pageLoad');
    const loadTimeElement = document.getElementById('load-time');
    loadTimeElement.textContent = `Page loaded in ${measure.duration.toFixed(2)} ms`;

    // Clear performance entries to prevent memory leaks
    performance.clearMarks();
    performance.clearMeasures();
});

/*
*   File need to be included in this order otherwise there well be error due to missing function.
*/
const paths = [
    // initial values
    'js/data/defaultConfig.js',
    'js/core/seed.js',
    // controls
    'js/controls/animation.js',
    'js/controls/canvas.js',
    'js/controls/cell.js',
    'js/controls/main.js',
    'js/controls/interaction.js',
    'js/controls/record.js',
    'js/controls/resetConfig.js',
    // rest
    'js/ui/colorPalette.js',
    'js/ui/menu.js',
    'js/monitoring/log.js',
    'js/monitoring/fps.js',
    'js/core/timer.js',
    'js/core/render.js',
    'js/animations/animation.js',
    'js/core/interaction.js',
    'js/core/record.js',
    'js/core/main.js',
    'js/core/shortcut.js',
    'js/ui/theme.js',
    'js/ui/hover-change.js',
    'js/ui/responsive.js',
    // end
    'js/data/localStorage.js'
];

// Load a single script and return a promise
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = function() {
            resolve(src);
        };
        script.onerror = function() {
            reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
    });
}

// Sequentially load all scripts
function loadAllScriptsInOrder(scripts) {
    scripts.reduce(function(promise, script) {
        return promise.then(function() {
            return loadScript(script).then(function(loadedScript) {
                console.log(`Successfully loaded ${loadedScript}`);
            });
        });
    }, Promise.resolve()) // Start with a resolved Promise
        .then(function() {
            console.log('All scripts have been loaded.');
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Start loading scripts in order
loadAllScriptsInOrder(paths);