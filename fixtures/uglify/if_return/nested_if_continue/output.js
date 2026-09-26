function f(n) {
    for (var i = 0;
        "number" == typeof n
            && (0 === n
                ? console.log("even", i)
                : 1 === n
                ? console.log("odd", i)
                : i++),
        0 <= (n -= 2););
}
f(37);
f(42);
