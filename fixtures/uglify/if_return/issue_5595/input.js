function f(a) {
    if (a) {
        var b;
        if (b++)
            return "FAIL";
    } else
        return "PASS";
}
console.log(f());
