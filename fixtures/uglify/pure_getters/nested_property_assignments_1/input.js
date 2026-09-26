var f;
((f = function() {
    console.log("FAIL");
}).p = f).q = console.log("PASS");
