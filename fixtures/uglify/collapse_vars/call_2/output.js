(function(a) {
    (function() {
        return 42;
        console.log("FAIL");
    })();
    (a = console).log("PASS");
})();
