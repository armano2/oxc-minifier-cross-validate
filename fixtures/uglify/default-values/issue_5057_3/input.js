(function(a) {
    (function f(b) {
        (function(a = console.log("FAIL 1")) {})(b);
        console.log(a);
    })("FAIL 2");
})("PASS");
