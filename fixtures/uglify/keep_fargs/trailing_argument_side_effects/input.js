function f() {
    return "FAIL";
}
console.log(function(a, b) {
    return b || "PASS";
}(f()));
