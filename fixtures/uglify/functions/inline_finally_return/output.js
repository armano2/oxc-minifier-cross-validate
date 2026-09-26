console.log(function() {
    try {
        throw "FAIL";
    } finally {
        while (console.log("PASS"));
        return 42;
    }
}());
