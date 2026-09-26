do {
    (function() {
        var a, b = 42 && (console[a = b] = a++);
        while (console.log("PASS"));
    })();
} while (!console);
