var a = "foo";
console.log(a);
function f(b) {
    var b;
    console.log(b);
    b = "bar";
    console.log(b);
}
f("baz");
var d = "moo";
console.log(d);
