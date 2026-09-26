var a = 42, b = "PASS";
a[a = null];
a?.[b = "FAIL"];
console.log(b);
