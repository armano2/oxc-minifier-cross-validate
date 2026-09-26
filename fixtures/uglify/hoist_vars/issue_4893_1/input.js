function f() {
    function g() {}
    var a = null;
    var b = null;
    var c = null;
    b.p += a = 42;
    f;
}
try {
    f();
} catch (e) {
    console.log("PASS");
}
