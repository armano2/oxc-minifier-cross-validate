function f(num) {
    var x = "" + num, y = null;
    [
        x + 1 + 2,
        x * 1 * 2,
        +x + 1 + 2,
        1 + x + 2 + 3,
        1 | x | 2 | 3,
        1 + x-- + 2 + 3,
        1 + (x*y + 2) + 3,
        1 + (2 + x + 3),
        1 + (2 + ~x + 3),
        -y + (2 + ~x + 3),
        1 & (2 & x & 3),
        1 + (2 + (x |= 0) + 3),
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(42);
