var b = function(a) {
    return (a = 0) == (a && this > (a += 0));
}();
console.log(b ? "PASS" : "FAIL");
