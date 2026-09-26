console.log(function(a = console.log("foo")) {
    return "bar";
}(void console.log("baz")));
