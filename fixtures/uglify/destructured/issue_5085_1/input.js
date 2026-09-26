var a = "PASS";
var [ b ] = [ 42, a ], c = b ? 0 : a = "FAIL";
console.log(a);
