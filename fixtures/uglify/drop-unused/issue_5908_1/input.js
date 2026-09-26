var a = function(b) {
    function f() {}
    b = f.prototype;
    b.p = 42;
    b.q = "PASS";
    return f;
}();
console.log(a.prototype.q);
