function f(num) {
    var x = "" + num, y = null;
    [
        x + "12",
        2 * x,
        +x + 1 + 2,
        1 + x + "23",
        3 | x,
        1 + x-- + 2 + 3,
        x*y + 2 + 1 + 3,
        2 + x + 3 + 1,
        2 + ~x + 3 + 1,
        2 + ~x + 3,
        0 & x,
        2 + (x |= 0) + 3 + 1,
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(42);
