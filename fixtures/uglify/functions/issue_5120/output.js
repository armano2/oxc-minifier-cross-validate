function a() {
    (function g() {
        a || g();
    })();
    return a.valueOf();
}
console.log(a() === a ? "PASS" : "FAIL");
