function f() {
    try {
        a;
        var b;
        return b;
    } catch (e) {
        var a = "FAIL";
        const b = null;
        return a;
    }
}
console.log(f());
