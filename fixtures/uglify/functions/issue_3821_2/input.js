var a = "PASS";
function f(g, b) {
    return g(), b;
}
console.log(f(function() {
    a = "FAIL";
}, a));
