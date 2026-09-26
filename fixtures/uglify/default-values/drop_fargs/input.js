console.log(function(a = 42, b = console.log("foo"), c = true) {
    return "bar";
}(console.log("baz"), "moo", false));
