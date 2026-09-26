console.log(function(a) {
    async function f() {
        a = "PASS";
        null.p += "PASS";
    }
    f();
    return a;
}("FAIL"));
