function f(a, b) {
    function g() {}
    var a = g;
    var c = b;
    c.p;
    console.log(typeof a);
}
f("FAIL", 42);
