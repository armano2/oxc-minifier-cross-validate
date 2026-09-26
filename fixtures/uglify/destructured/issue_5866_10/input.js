var a = {}, b, c;
[ b, { p: c } ] = [ a.p = {}, a ];
console.log(b === c ? "PASS" : "FAIL");
