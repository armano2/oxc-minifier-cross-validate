(function() {
    var a = function f() {
        (function() {
            console.log(typeof f);
        })();
    };
    while (a());
})();
