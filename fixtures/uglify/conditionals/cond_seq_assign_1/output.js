function f(a) {
    var t;
    t = a ? (t = "foo", "bar") : (console.log(t), 42),
    console.log(t);
}
f(f),
f();
