function f(a) {
    var b = `foo${a = "PASS"}`;
    for (var c in f && b)
        b.p;
    return a;
}
console.log(f("FAIL"));
