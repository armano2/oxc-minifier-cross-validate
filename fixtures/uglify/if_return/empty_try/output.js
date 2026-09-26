console.log(function() {
    return function() {
        try {} finally {}
        return "PASS";
    };
}()());
