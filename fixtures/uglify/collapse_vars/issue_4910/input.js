var a = "foo", b;
var c = b = a;
1 && c[a = "bar"];
console.log(a, b);
