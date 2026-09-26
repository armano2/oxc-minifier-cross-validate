function f(a) {
    var b = (a = 2, 1 / 0), c = 3;
    var d = a + b;
    console.log(d);
    return f;
}
f();
