function f() {
    try {
        var undefined = typeof f;
        return f ? void 0 : undefined;
    } catch (e) {
        return "FAIL";
    }
    FAIL;
}
console.log(f());
