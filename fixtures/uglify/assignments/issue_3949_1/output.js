var a = 42;
function f() {
    var b = a;
    b >>= 2;
    return 100 + b;
}
console.log(f());
