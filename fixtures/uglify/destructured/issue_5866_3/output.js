var a = {};
var { p: b } = [ a, a.p = "PASS" ][0];
console.log(b);
