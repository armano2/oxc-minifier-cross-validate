function f(a) {
    var b = "foo";
    if (a) {
        while (console.log("bar"));
        console.log(b);
    } else {
        while (console.log("baz"));
        console.log(b);
    }
}
f();
f(42);
