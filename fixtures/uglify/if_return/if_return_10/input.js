!function() {
    if (console.log("foo"))
        return 42;
    if (console.log("bar"))
        return null;
    var a = console.log("baz");
}();
