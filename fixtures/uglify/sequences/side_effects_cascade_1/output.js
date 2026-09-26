function f(a, b) {
    b.a = a = (a -= 42) < 0 ? 0 : a;
}
var m = {}, n = {};
f(13, m),
f("foo", n),
console.log(m.a, n.a);
