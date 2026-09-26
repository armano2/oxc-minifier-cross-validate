(function(a) {
    a = console;
    (function() {
        return 42;
        console.log("FAIL");
    })();
    a.log("PASS");
})();
