function f(a) {
    var b, c;
    if (a) {
        b = Object.create(null);
        c = Object.create(null);
    }
    return b === c;
}
console.log(f(0), f(1));
