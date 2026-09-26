var a = 1, b = 42;
function f(a) {
    b <<= a;
}
f();
console.log(a, b);
