var yield = "PASS";
(function*() {
    (function() {
        console.log(yield);
    })();
})().next();
