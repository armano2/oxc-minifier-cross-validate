var b, c, a = {};
[ b, c ] = [ a.p = {}, a.p ];
console.log(b === c ? "PASS" : "FAIL");
