function f(a) {
    var a = a.p;
    var c;
    a?.[c = "FAIL 2"];
    return a || c;
}
console.log(f("FAIL 1") || "PASS");
