var b, c, a = {};
[ { p: b }, c ] = [ a, a.p = {} ];
console.log(b === c ? "PASS" : "FAIL");
