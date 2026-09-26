var o = { Infinity: "PASS" };
var vInfinity = "Infinity";
with (o) vInfinity = Infinity;
console.log(vInfinity);
