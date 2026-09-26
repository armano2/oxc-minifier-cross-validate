function f(a) {
    var b, c;
    if (a) {
        b = a && {};
        c = a && {};
    }
    return b === c;
}
console.log(f(0), f(1));
