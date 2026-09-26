function baz(s) {
    return s ? function() {} : function() {};
}
(function() {
    var thing = baz();
    if (thing !== baz())
        console.log("PASS");
    else
        console.log("FAIL");
})();
