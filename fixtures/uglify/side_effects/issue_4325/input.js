(function f() {
    (function(b, c) {
        try {
            c.p = 0;
        } catch (e) {
            console.log("PASS");
            return b;
        }
        c;
    })(f++);
})();
