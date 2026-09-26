var a = 1;
var b;
var c = b = a;
console || c(a++);
--b;
console.log(a, b);
