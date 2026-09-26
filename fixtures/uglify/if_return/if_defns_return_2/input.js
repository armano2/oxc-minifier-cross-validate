function f(a, b, c) {
    if (v())
        return a();
    if (w())
        return b();
    if (x()) {
        var d = c();
        return y(d);
    }
    return z();
}
