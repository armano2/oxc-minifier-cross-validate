function f(a) {
    var b, c;
    if (a) {
        b = Error();
        c = Error();
    }
    return b === c;
}
console.log(f(0), f(1));
