var a = {};
var b = { p: (a = { q: {} }).q }.p;
console.log(a.q === b ? "PASS" : "FAIL");
