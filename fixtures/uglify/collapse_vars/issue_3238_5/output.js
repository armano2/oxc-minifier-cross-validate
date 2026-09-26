function f(a) {
    var b, c;
    if (a) {
        b = a ? [] : 42;
        c = a ? [] : 42;
    }
    return b === c;
}
console.log(f(0), f(1));
