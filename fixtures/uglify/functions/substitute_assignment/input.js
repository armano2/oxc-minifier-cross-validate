function f(a, b, c) {
    a[b] = c;
}
var o = {};
f(o, 42, null);
f(o, "foo", "bar");
for (var k in o)
    console.log(k, o[k]);
