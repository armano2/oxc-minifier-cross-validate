var a;
function f(b) {
    a = b;
}
a = "foo";
console.log(a) || (a = "bar");
console.log(a, f("baz"));
console.log(a);
