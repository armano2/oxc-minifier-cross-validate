var a = "PASS";
function f() {
    return a;
}
try {
    throw a;
} catch {
    function g() {
        return a;
    }
    console.log(a, f(), g());
}
console.log(a, f(), g());
