function f(x, y) {
    for (; !x && (console.log(y), false););
}
f(null, "PASS");
f(42, "FAIL");
