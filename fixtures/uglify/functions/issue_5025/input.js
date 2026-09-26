function f(a) {
    function g() {
        b = 42;
    }
    g(b = a);
    var b = this;
    console.log(typeof b);
}
f();
