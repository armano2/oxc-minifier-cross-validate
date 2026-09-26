function g() {
    return this;
}
console.log(typeof function() {
    function f() {}
    f.g = g;
    return f.g();
}());
