var a = 42;
function f() {
    var b = a;
    b = 5 & b;
    return 100 + b;
}
console.log(f());
