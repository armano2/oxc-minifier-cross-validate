console.log(function() {
    return function() {
        while (console.log("foo"));
        return "bar";
    }() || function() {
        while (console.log("baz"));
        return "moo";
    }();
}());
