console.log(typeof function f(a = function() {
    f = 42;
    return f;
}()) {
    var f;
    return a;
}());
