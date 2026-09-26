var a = {};
var [ b, c ] = [ a.p = {}, a.p ];
console.log(b === c ? "PASS" : "FAIL");
