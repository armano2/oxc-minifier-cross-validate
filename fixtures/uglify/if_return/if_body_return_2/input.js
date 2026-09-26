var c = "PASS";
function f(a, b) {
    if (0 + a) {
        if (b) throw new Error(c);
        return 42;
    }
    return true;
}
console.log(f(0, 0));
console.log(f(0, 1));
console.log(f(1, 0));
try {
    f(1, 1);
    console.log("FAIL");
} catch (e) {
    console.log(e.message);
}
