var a = "FAIL";
try {
    var b;
    b[0] = (a = "PASS", 0);
    a = 1 + a;
} catch (c) {
}
console.log(a);
