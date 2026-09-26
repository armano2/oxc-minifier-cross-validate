function f(a) {
    if (!a)
        return "FAIL";
}
console.log(f(42) || "PASS");
