var a = "FAIL", b = false;
a = "PASS";
b ??= a;
console.log(a);
