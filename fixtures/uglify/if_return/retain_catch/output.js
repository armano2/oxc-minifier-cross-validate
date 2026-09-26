function f() {
    try {
        throw 42;
    } catch (e) {
        return console.log("foo");
    } finally {
        console.log("bar");
    }
    return console.log("foo");
}
f();
