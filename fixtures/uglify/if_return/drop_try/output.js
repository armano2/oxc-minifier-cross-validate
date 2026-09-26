function f() {
    try {
        console.log("foo");
    } finally {
        console.log("baz");
    }
    return "bar";
}
console.log(f());
