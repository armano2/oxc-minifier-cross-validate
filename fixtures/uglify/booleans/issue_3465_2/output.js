console.log(function f(a) {
    if (!a) console.log(f(42));
    return typeof a;
}() ? "PASS" : "FAIL");
