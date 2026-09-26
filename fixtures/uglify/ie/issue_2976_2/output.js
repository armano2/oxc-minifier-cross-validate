console.log(function f() {
    var n;
    return n === f ? "FAIL" : "PASS";
}());
