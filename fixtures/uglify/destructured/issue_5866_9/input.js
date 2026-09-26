var a = {};
var [ b, { p: c } ] = [ a.p = {}, a ];
console.log(b === c ? "PASS" : "FAIL");
