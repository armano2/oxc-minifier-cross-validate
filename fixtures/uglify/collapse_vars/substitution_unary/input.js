function f1(a, b) {
    console.log(typeof (b = a), a, b);
}
function f2(a, b) {
    console.log(void (b = a), a, b);
}
function f3(a, b) {
    console.log(delete (b = a), a, b);
}
f1(42, "foo");
f2(42, "foo");
f3(42, "foo");
