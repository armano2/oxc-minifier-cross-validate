A = 42;
function f(b) {
    return b >> 0;
}
var a = f(42 in []);
console.log(f(A));
