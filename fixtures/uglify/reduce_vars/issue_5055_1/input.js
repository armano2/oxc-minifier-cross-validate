var a = "PASS";
function f() {
    console.log(a || "FAIL");
}
f(0 && (a = 0)(f(this)));
