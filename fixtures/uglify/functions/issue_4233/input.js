(function() {
    try {
        var a = function() {};
        try {
            throw 42;
        } catch (a) {
            (function() {
                console.log(typeof a);
            })();
            var a;
        }
    } catch (e) {}
})();
