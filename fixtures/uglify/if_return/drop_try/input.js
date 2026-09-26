function f() {
    try {
        return console.log("foo"), "bar";
    } finally {
        console.log("baz");
    }
    return "bar";
}
console.log(f());
