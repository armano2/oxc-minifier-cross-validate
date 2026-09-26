var a, b;
function* f(c = (b = 42, console.log("PASS"))) {}
b = f();
