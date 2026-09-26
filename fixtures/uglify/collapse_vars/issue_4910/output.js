var a = "foo", b;
var c = b = a;
1 && b[a = "bar"];
console.log(a, b);
