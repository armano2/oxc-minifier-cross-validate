function f(a) {
    try {
        if (a())
            console.log("foo");
    } catch (e) {
        console.log("bar");
    }
    return console.log("baz");
}
f(function() {
    return 42;
});
f(function() {});
f();
