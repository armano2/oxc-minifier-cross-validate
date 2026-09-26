var a = 0, b = "PASS";
a++,
c &&= b = a;
var c;
console.log(b);
