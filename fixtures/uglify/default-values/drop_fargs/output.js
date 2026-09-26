console.log(function(b = console.log("foo")) {
    return "bar";
}((console.log("baz"), "moo")));
