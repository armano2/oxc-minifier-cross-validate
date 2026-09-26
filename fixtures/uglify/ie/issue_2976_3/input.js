console.log(function f() {
    var a;
    return a === f ? "FAIL" : "PASS";
}());
