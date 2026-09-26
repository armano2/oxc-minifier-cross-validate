function f() {
    try {
        throw 42;
    } catch (e) {
        return console.log("foo"), "bar";
    } finally {
        console.log("baz");
    }
    return "bar";
}
console.log(f());
