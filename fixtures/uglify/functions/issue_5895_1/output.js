(function() {
    for (var a in [ 1, 2 ])
        try {
            b = void 0;
            var b;
            b[b = 42];
            while (!console);
            return;
        } catch (e) {
            console.log("foo");
        }
})();
