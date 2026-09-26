function f1(a, b) {
    console.log(f1 = a, a);
}
function f2(a, b) {
    console.log(a = 1 + (b = a), b);
}
function f3(a, b) {
    console.log(a, b = 1 + (b = a));
}
function f4(a, b) {
    b = 1 + (a = b);
    console.log(a, b);
}
f1(42, "foo");
f2(42, "foo");
f3(42, "foo");
f4("bar", 41);
