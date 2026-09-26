var a = "PASS";
function f(b = a = "FAIL") {
    console.log(a, b);
}
f(42);
