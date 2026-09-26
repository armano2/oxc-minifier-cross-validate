function f(a, b) {
    a -= 42;
    if (a < 0) a = 0;
    b.a = a;
}
var m = {}, n = {};
f(13, m);
f("foo", n);
console.log(m.a, n.a);
