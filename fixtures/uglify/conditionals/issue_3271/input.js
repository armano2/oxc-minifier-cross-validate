function f(a) {
    var i = 0, b = [];
    if (a) {
        b[i++] = 4,
        b[i++] = 1;
    } else {
        b[i++] = 3,
        b[i++] = 2,
        b[i++] = 1;
    }
    return b;
}
console.log(f(0).pop(), f(1).pop());
