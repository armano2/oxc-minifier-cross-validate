var [ a ] = "P", b, o = {};
[ { 1: o.p } ] = [ "FAIL" ];
({ foo: [ o.q ] } = { foo: "S" });
[ b = "S" ] = [];
console.log(a + o.p + o.q + b);
