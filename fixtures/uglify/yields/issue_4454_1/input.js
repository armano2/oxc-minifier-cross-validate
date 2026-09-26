function f(a) {
    (function*(b = console.log(a)) {})();
    var yield = 42..toString();
    console.log(yield);
}
f("PASS");
