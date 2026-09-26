function f(n) {
    var i = 0;
    do {
        if ("number" == typeof n) {
            if (0 === n) {
                console.log("even", i);
                continue;
            }
            if (1 === n) {
                console.log("odd", i);
                continue;
            }
            i++;
        }
    } while (0 <= (n -= 2));
}
f(37);
f(42);
