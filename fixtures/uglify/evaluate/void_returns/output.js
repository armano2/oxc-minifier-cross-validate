(function() {
    function g(b) {
        if (b) console.log("FAIL");
    }
    while (1) {
        console.log("PASS");
        try {
            if (console) return;
        } catch (e) {
            return g(e);
        }
    }
})();
console.log(void 0);
