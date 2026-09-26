var a = 0, b = "PASS";
function f(c) {
    a++,
    c &&= b = a;
}
f();
console.log(b);
