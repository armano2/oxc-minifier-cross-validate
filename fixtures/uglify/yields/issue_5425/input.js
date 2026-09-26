var a = "FAIL";
var b = function* f() {}(a ? a = "PASS" : 42);
console.log(a, typeof f);
