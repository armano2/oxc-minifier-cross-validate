function log(value) {
    console.log(value);
    return value;
}
async function f(a) {
    var b = log(a), c = b;
    log(b);
    log(c);
}
f("PASS");
