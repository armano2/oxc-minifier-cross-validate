var a = "FAIL";
try {
    a = 0 in (a = "PASS");
} catch (e) {}
console.log(a);
