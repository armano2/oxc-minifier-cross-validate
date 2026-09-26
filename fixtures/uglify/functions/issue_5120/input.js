var a = function f() {
    function g() {
        f || g();
    }
    g();
    return f.valueOf();
};
console.log(a() === a ? "PASS" : "FAIL");
