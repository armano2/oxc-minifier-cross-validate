var a, b = false;
a = "PASS",
b ?? (a = "FAIL"),
console.log(a);
