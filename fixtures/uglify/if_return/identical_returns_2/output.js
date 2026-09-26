console.log(function() {
    if (console.log("foo"))
        while (console.log("FAIL"));
    return "bar";
}());
