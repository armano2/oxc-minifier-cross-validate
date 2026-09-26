(function(a = console.log("foo"), b = console.log("bar")) {
    console.log("baz");
}(void console.log("moo"), 42));
