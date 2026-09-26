var log = console.log;
var a = f, b = log();
function f(...[ c = a = "PASS" ]) {}
f((a = "FAIL", b));
log(a);
