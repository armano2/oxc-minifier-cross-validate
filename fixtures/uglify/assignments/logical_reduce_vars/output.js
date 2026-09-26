var a = "PASS", b = 42;
b ??= a = "FAIL";
console.log(a);
