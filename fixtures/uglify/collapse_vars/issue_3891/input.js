function log(a) {
    console.log(typeof a);
}
log(function f() {
    try {
        do {
            var b = function() {}();
        } while (f = 0, b.p);
    } catch (e) {
        var f;
        b;
    }
});
