var a = function f() {
    function g(b) {
        return f();
    }
    while (1) {
        console.log("PASS");
        try {
            if (console) return;
        } catch (e) {
            return g(e);
        }
    }
}();
console.log(a);
