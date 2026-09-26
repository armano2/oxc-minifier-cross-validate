console.log(function() {
    if (console.log("foo"))
        return 42;
    else
        while (console.log("bar"));
    return 42;
}());
