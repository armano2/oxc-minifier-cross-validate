console.log(function() {
    function f(arguments) {
        console.log(arguments);
        (function() {
            while (console.log("foo"));
        })();
    }
    f("bar");
    return arguments;
}("baz")[0]);
