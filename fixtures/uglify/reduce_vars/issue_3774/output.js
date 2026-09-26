var f = function() {
    function g() {
        if (!g.p) {
            g.p = 1;
            console.log("PASS");
        }
    }
    return function() {
        g();
    };
}();
f();
f();
