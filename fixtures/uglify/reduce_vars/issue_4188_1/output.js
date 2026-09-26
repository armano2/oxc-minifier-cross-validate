(function() {
    try {
        while (A)
            var a = function() {}, b = a;
    } catch (a) {
        console.log(function() {
            return typeof a;
        }(), typeof b);
    }
})();
