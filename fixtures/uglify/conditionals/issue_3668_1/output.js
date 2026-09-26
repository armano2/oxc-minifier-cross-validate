function f() {
    try {
        var undefined = typeof f;
        if (!f) return undefined;
    } catch (e) {
        return "FAIL";
    }
}
console.log(f());
