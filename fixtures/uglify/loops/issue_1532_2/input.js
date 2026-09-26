function f(x, y) {
    do {
        if (x) {
            console.log(x);
            break;
        }
        console.log(y);
    } while (false);
}
f(null, "PASS");
f(42, "FAIL");
