var a = 1;
function f() {
    return a;
}
try {
    throw 2;
} catch (a) {
    function g() {
        return a;
    }
    console.log(a, f(), g());
}
console.log(a, a, g());
