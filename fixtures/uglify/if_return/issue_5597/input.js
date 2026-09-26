function f(a) {
    if (a) L: {
        return;
        var b;
    } else
        return "FAIL";
}
console.log(f(42) || "PASS");
