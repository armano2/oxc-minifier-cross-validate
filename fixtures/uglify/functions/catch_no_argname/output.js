var a = "PASS";
try {
    throw a;
} catch {
    function g() {
        return a;
    }
    console.log(a, a, g());
}
console.log(a, a, g());
