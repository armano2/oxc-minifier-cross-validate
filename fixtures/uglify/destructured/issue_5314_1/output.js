A = this;
(function() {
    (function({
        [console.log(this === A ? "PASS" : "FAIL")]: a,
    }) {})(42);
})();
