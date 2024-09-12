(function() {
    const originalConsoleLog = console.log;


    console.log = function(...args) {
        //const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
        originalConsoleLog.apply(console, args);
    };
})();