console.log(function f() {
    return f[0], (f = 42);
}());
