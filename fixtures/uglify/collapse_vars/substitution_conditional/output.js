function f1(a, b) {
    console.log(a ? a : a, a, a);
}
function f2(a, b) {
    console.log(a ? b = a : b, a, b);
}
function f3(a, b) {
    console.log(a ? a : b = a, a, b);
}
f1("foo", "bar");
f1(null, true);
f2("foo", "bar");
f2(null, true);
f3("foo", "bar");
f3(null, true);
