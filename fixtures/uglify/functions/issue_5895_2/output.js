(function() {
    for (var a in [ 1, 2 ])
        try {
            b = void 0;
            void b[b = 42];
            var b;
            while (!console);
            return;
        } catch (e) {
            console.log("foo");
        }
})();
