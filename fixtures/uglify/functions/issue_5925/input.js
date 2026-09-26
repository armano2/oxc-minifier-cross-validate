var a = 42;
console.log(function() {
    function f() {
        return +a - 41;
    }
    var b = f(f);
    a--;
    return b;
}() ? "PASS" : "FAIL");
