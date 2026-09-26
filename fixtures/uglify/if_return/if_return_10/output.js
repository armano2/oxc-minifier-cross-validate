!function() {
    var a;
    return console.log("foo") || !console.log("bar") && (a = console.log("baz"), void 0);
}();
