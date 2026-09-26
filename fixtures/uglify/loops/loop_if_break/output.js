function f(a, b) {
    try {
        for (;a && !b;) {
            var d = false;
            throw d;
            var c;
        }
    } catch (e) {
        console.log("E:", e);
    }
    console.log(a, b, c, d);
}
f(0, 0);
f(0, 1);
f(1, 0);
f(1, 1);
