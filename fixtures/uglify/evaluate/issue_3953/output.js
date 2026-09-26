function f(a) {
    (a += 0 * (a = 0)) && console.log("PASS");
}
f(1);
