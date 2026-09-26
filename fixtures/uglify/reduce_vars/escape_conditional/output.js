function baz(s) {
    return s ? foo : bar;
}
function foo() {}
function bar() {}
(function() {
    var thing = baz();
    if (thing !== baz())
        console.log("FAIL");
    else
        console.log("PASS");
})();
