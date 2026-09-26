function f(a) {
    b = a,
    void (b = 42);
    var b = this;
    console.log(typeof b);
}
f();
