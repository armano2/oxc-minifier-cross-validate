function f(x, y) {
    do {
        if (x) {
            console.log(x);
            break;
        }
    } while (console.log(y), false);
}
f(null, "PASS");
f(42, "FAIL");
