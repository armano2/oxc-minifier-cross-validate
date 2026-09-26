var log = console.log, a = "FAIL";
var [ b = a ] = (a = "PASS", []);
log(a, b);
