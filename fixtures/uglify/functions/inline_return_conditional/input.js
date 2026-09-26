console.log(function() {
    return console ? "foo" : function() {
        while (console.log("bar"));
        return "baz";
    }();
}());
