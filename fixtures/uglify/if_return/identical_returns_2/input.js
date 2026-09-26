console.log(function() {
    if (console.log("foo"))
        while (console.log("FAIL"));
    else
        return "bar";
    return "bar";
}());
