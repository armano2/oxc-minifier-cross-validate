function f() {
    var a = function g() {
        if (0) {
            var g = 42;
            f();
        }
        g || console.log("PASS");
    };
    a(a);
}
f();
