console.log(function(a = console.log("FAIL 1")) {
    return a() ? "PASS" : "FAIL 2";
}(function() {
    return 42;
}));
