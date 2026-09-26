function f(a) {
    (function*(c = console.log(a)) {})();
    var b = 42..toString();
    console.log(b);
}
f("PASS");
