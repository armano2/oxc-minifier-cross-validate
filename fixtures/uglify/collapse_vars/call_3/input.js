(function(a) {
    a = console;
    (function() {
        a = {
            log: function() {
                console.log("PASS");
            }
        }
    })();
    a.log("FAIL");
})();
