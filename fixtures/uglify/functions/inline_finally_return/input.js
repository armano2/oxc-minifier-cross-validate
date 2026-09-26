console.log(function() {
    try {
        throw "FAIL";
    } finally {
        return function() {
            while (console.log("PASS"));
        }(), 42;
    }
}());
