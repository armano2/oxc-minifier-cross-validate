A = "FAIL";
B = "PASS";
function f() {
    console.log(function({}, a) {
        return a;
    }(null, A = B));
}
try {
    f();
} catch (e) {
    console.log(A);
}
