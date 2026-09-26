function f() {
    return "FAIL";
}
console.log(function(b) {
    return b || "PASS";
}(void f()));
