var a = "PASS";
(function() {
    for (var i = 0; i < 2; i++)
        try {
            return function() {
                while (!console);
                var b = b && (a = b) || "FAIL";
            }();
        } finally {
            continue;
        }
})();
console.log(a);
