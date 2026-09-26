var a = "foo", b = 42, c = null;
a && a.p && (b = a) && c++ + a;
console.log(a, b, c);
