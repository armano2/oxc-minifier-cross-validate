var a = "PASS", b;
try {
    b[42] = (b.q = null, a = "FAIL 1", !0);
    console.log("FAIL 2")
} catch (e) {
    console.log(a);
}
