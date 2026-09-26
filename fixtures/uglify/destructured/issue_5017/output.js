var a = function() {};
var b = a;
var c = [ c ] = [ c = a ];
console.log(c[0] === a ? "PASS" : "FAIL");
