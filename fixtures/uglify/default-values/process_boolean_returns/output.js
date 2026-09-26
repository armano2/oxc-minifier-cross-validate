console.log(function(a = console.log("FAIL 1")) {
    return 42 ? "PASS" : "FAIL 2";
}(function() {
    return 1;
}));
