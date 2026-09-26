function f1(y) {
    // Neither the non-constant while condition `c` will be
    // replaced, nor the non-constant `x` in the body.
    var x = y, c = 3 - y;
    while (c) { return x; }
    var z = y * y;
    return z;
}
function f2(y) {
    // The constant `x` will be replaced in the while body.
    var x = 7;
    while (y) { return x; }
    var z = y * y;
    return z;
}
function f3(y) {
    // The non-constant `n` will not be replaced in the while body.
    var n = 5 - y;
    while (y) { return n; }
    var z = y * y;
    return z;
}
