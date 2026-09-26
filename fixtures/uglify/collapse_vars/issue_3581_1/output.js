var a = "PASS", b = "FAIL";
try {
    b = "PASS";
    if (a) throw 0;
    b = 1 + b;
    a = "FAIL";
} catch (e) {}
console.log(a, b);
