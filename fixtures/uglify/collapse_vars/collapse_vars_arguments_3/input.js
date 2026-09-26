function log(a, b) {
    console.log(b);
}
function f(c) {
    var args = arguments;
    console.log(c);
    var d = args[0];
    c = "FAIL";
    log(c, d);
}
f();
f("PASS");
