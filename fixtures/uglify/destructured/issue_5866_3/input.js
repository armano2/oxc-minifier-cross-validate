var a = {};
var [ { p: b } ] = [ a, a.p = "PASS" ];
console.log(b);
