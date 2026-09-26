var o, a = 6, b = 7, c;
function f() {
    c = a * b;
    o.p(c);
}
try {
    f();
} catch (e) {
    console.log(c);
}
