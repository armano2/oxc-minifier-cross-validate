var a = {};
var { p: { q: b } } = { p: a = { q: {} } };
console.log(a.q === b ? "PASS" : "FAIL");
