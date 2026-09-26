function f(x, y) {
    // circular reference
    function g() {
        return h();
    }
    function h() {
        return g();
    }
    return x + y;
}
