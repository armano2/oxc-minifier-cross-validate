function f() {
    try {
        var undefined = typeof f;
        if (!f) return undefined;
        return;
    } catch (e) {
        return "FAIL";
    }
    FAIL;
}
console.log(f());
