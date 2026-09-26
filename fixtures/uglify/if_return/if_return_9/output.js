!function() {
    var a;
    return console.log("foo") || (a = console.log("bar"), void 0);
}();
