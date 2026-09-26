function f(a) {
    var b;
    return {
        p: b = a,
        q: b,
        r: b,
    };
}
console.log(f("PASS").r);
