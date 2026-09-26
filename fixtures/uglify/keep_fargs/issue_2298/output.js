!function() {
    (function() {
        try {
            !function() {
                (void 0)[1] = "foo";
            }();
            console.log("FAIL");
        } catch (e) {
            console.log("PASS");
        }
    })();
}();
