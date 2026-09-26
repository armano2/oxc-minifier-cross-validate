var a = "PASS";
(function() {
    for (var i = 0; i < 2; i++)
        try {
            b = void 0;
            while (!console);
            var b = b && (a = b) || "FAIL";
            return;
        } finally {
            continue;
        }
})();
console.log(a);
