console.log(function() {
    return f;
    function f() {
        try {} finally {}
        return "PASS";
    }
}()());
