function f1(a, b) {
    console.log(a && a, a);
}
function f2(a, b) {
    console.log(a && (b = a), b);
}
f1(42, "foo");
f1(null, true);
f2(42, "foo");
f2(null, true);
