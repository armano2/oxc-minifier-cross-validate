var a = "FAIL", d = function() {
    if (void 0) return -1;
    a = "PASS";
}(a = 42);
console.log(a, d);
