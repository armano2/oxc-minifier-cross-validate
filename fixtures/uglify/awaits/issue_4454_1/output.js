function f(a) {
    (async function(b = console.log(a)) {})();
    var await = 42..toString();
    console.log(await);
}
f("PASS");
