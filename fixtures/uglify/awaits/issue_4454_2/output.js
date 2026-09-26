function f(a) {
    (async function(c = console.log(a)) {})();
    var b = 42..toString();
    console.log(b);
}
f("PASS");
