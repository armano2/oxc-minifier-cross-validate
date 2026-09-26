var a = "FAIL", b, c;
try {
    b = c.p = b = 0;
} catch (e) {
    b += 42;
    b && (a = "PASS");
}
console.log(a);
