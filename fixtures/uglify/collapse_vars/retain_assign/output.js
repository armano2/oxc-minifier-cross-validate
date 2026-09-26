var a = 42, b, c = "FAIL";
b = a;
b++ && (c = "PASS");
console.log(c);
