function f() {
    return "PASS";
    ({
        p: 42,
        get p() {},
    });
}
console.log(f());
