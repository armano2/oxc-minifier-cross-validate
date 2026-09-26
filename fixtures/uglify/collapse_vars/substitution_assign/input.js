function f1(a, b) {
    f1 = b = a;
    console.log(a, b);
}
function f2(a, b) {
    a = 1 + (b = a);
    console.log(a, b);
}
function f3(a, b) {
    b = 1 + (b = a);
    console.log(a, b);
}
function f4(a, b) {
    b = 1 + (a = b);
    console.log(a, b);
}
f1(42, "foo");
f2(42, "foo");
f3(42, "foo");
f4("bar", 41);
