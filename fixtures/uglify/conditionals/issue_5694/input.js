FORCE_EXEC = "async()=>{}";
var a = "foo";
// Node.js v0.12~6 (vm): foo
console.log((NaN = a) ? NaN : 42);
