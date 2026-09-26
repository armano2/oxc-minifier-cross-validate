function f(a) {
    var b, c;
    if (a) {
        b = new Date();
        c = new Date();
    }
    return b === c;
}
console.log(f(0), f(1));
