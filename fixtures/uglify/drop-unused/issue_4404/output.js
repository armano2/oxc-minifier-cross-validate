function f(a) {
    arguments[0] = "PASS";
    console.log(a);
}
f("FAIL");
