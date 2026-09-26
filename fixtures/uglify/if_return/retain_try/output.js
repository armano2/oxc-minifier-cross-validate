function f() {
    try {
        return console.log("foo");
    } finally {
        console.log("bar");
    }
    return console.log("foo");
}
f();
