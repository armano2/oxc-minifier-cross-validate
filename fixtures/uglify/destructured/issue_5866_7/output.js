var a = {};
var [ { p: b }, c ] = [ a, a.p = {} ];
console.log(b === c ? "PASS" : "FAIL");
