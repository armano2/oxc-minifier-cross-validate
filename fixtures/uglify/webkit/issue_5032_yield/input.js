function log(value) {
    console.log(value);
    return value;
}
function *f(a) {
    var b = log(a), c = b;
    log(b);
    log(c);
}
f("PASS").next();
