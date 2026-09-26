function f() {
    try {
        return console.log("foo"), FAIL;
    } catch (e) {
        return console.log("bar"), "FAIL";
    } finally {
        return console.log("baz"), console.log("moo");
    }
    return console.log("moo");
}
console.log(f());
