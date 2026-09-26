A = 1;
var a = 1, b;
console.log(function f() {
    return a-- && f(b = A, b);
}());
