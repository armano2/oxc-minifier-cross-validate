function f1(a, b) {
    console.log(a && (b = a) && b);
}
function f2(a, b) {
    console.log(a && (b = a) || b);
}
function f3(a, b) {
    console.log(a || (b = a) && b);
}
function f4(a, b) {
    console.log(a || (b = a) || b);
}
f1(42, "foo");
f1(null, true);
f2(42, "foo");
f2(null, true);
f3(42, "foo");
f3(null, true);
f4(42, "foo");
f4(null, true);
