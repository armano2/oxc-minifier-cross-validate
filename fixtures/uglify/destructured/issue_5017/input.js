var a = function() {};
var b = c = a;
var c = [ c ] = [ c ];
console.log(c[0] === a ? "PASS" : "FAIL");
