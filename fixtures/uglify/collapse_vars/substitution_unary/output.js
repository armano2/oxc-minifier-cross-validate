function f1(a, b) {
    console.log(typeof a, a, a);
}
function f2(a, b) {
    console.log(void a, a, a);
}
function f3(a, b) {
    console.log(delete (b = a), a, b);
}
f1(42, "foo");
f2(42, "foo");
f3(42, "foo");
