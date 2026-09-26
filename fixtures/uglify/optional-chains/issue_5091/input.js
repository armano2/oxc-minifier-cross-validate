function f(a) {
    var b = a.p;
    var c;
    b?.[c = "FAIL 2"];
    return b || c;
}
console.log(f("FAIL 1") || "PASS");
