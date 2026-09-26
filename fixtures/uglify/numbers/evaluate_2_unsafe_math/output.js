function f(num) {
    var x = "" + num, y = null;
    [
        x + "12",
        2 * x,
        +x + 3,
        1 + x + "23",
        3 | x,
        6 + x--,
        x*y + 6,
        6 + x,
        6 + ~x,
        5 + ~x,
        0 & x,
        6 + (x |= 0),
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(42);
