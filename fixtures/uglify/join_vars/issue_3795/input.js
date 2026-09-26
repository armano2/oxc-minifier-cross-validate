var a = "FAIL";
function f(b, c) {
    for (var i = 5; c && i; --i) return -1;
    a = "PASS";
}
var d = f(a = 42, d);
console.log(a, d);
