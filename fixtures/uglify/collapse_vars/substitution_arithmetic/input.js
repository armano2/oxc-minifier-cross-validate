function f1(a, b) {
    console.log((b = a) + a, b);
}
function f2(a, b) {
    console.log(a - (b = a), b);
}
function f3(a, b) {
    console.log(a / (b = a) + b, b);
}
f1(42, "foo");
f2(42, "foo");
f3(42, "foo");
