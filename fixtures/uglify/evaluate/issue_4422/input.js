console.log(function f(a) {
    a = "FAIL 1";
    arguments[0] = "PASS";
    return a;
}("FAIL 2"));
