!function() {
    (function() {
        try {
            !function(b) {
                (void 0)[1] = "foo";
            }();
            console.log("FAIL");
        } catch (e) {
            console.log("PASS");
        }
    })();
}();
