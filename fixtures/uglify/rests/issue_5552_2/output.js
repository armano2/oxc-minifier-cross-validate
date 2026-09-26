var log = console.log;
var a = f;
function f(...{ [a = "PASS"]: b }) {}
f((a = "FAIL", 42));
log(a);
