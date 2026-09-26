console.log(function() {
    if (console)
        return "foo";
    else {
        while (console.log("bar"));
        return "baz";
        return;
    }
}());
