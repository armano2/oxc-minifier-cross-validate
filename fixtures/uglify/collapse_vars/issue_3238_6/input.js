function f(a) {
    var b, c;
    if (a) {
        b = a && 0 || [];
        c = a && 0 || [];
    }
    return b === c;
}
console.log(f(0), f(1));
