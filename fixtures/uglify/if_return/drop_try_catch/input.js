function f(a) {
    try {
        if (a())
            return console.log("foo"), console.log("baz");
    } catch (e) {
        return console.log("bar"), console.log("baz");
    }
    return console.log("baz");
}
f(function() {
    return 42;
});
f(function() {});
f();
