(function() {
    try {
        throw 42;
    } catch (a) {
        console.log(function() {
            return typeof a;
        }(), typeof b);
    }
    while (!console)
        var a = function() {}, b = a;
})();
