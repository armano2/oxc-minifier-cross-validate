function f(a, b) {
    try {
        while (a) {
            if (b) {
                break;
                var c = 42;
                console.log(c);
            } else {
                var d = false;
                throw d;
            }
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
