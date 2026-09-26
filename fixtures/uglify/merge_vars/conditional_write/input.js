var a = "FAIL", b;
if (console)
    a = "PASS";
b = [a, 42].join();
console.log(b);
