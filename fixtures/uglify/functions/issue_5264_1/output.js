console.log(function() {
    (function(arguments) {
        console.log(arguments);
        while (console.log("foo"));
    })("bar");
    return arguments;
}("baz")[0]);
