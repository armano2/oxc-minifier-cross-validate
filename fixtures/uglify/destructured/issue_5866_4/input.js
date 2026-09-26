var a = {}, b;
[ { p: b } ] = [ a, a.p = "PASS" ];
console.log(b);
