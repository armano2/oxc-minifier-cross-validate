function f() {
    function g() {
        return function() {};
    }
    var a = g();
    (function() {
        this && a && console.log("PASS");
    })();
}
f();
