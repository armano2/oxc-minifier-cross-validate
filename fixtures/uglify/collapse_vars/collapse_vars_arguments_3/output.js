function log(a, b) {
    console.log(b);
}
function f(c) {
    var args = arguments;
    console.log(c);
    var d = args[0];
    log(c = "FAIL", d);
}
f();
f("PASS");
