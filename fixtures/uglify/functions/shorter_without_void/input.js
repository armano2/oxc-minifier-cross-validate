var a;
function f(b) {
    a = b;
}
f("foo");
console.log(a) || f("bar");
console.log(a, f("baz"));
console.log(a);
