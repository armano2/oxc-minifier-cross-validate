var m = {};
var fn = Function("n,o,t", "o.exports=42");
fn(null, m, m.exports);
console.log(m.exports);
