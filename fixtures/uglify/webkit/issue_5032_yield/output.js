function log(value) {
    console.log(value);
    return value;
}
function *f(a) {
    var a = log(a), c = a;
    log(a);
    log(c);
}
f("PASS").next();
