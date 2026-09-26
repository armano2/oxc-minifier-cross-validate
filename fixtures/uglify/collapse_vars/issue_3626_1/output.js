var a = "foo", b = 42;
a.p && (b = a) && a;
console.log(a, b);
