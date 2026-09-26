function f() {
    var c, a = {};
    function g() {
        a.p;
    }
    g(console.log("PASS"));
    c && c.q;
    return;
}
f();
