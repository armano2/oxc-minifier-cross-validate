function f() {
    return this;
}
console.log(function() {
    return f();
}() ? "PASS" : "FAIL");
