function baz() {
    return function() {}, bar;
}
function bar() {}
(function() {
    var thing = baz();
    if (thing !== baz())
        console.log("FAIL");
    else
        console.log("PASS");
})();
