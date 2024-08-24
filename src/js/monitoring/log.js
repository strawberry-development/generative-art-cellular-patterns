(function() {
    const originalConsoleLog = console.log;

    const logElement = document.getElementById('log');

    console.log = function(...args) {
        const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');

        logElement.textContent += message + '\n';

        originalConsoleLog.apply(console, args);
    };
})();