function f(a) {
    var t;
    a ? (t = "foo", a = "bar") : (console.log(t), t = 42),
    console.log(t);
}
f(f),
f();
