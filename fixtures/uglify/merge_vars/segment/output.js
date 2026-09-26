var a = "foo";
console.log(a);
for (var b, i = 0; i < 1; i++) {
    var b = "bar";
    console.log(b);
    b = "baz";
    console.log(b);
}
var a = "moo";
console.log(a);
