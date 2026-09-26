function f() {
    try {
        throw 42;
    } catch (e) {
        console.log("foo");
    } finally {
        console.log("baz");
    }
    return "bar";
}
console.log(f());
