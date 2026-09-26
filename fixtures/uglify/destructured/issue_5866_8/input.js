var a = {}, b, c;
[ { p: b }, c ] = [ a, a.p = {} ];
console.log(b === c ? "PASS" : "FAIL");
