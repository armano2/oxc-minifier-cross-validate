console.log(function(a) {
    try {
        while (a)
            var e = function() {};
    } catch (e) {
        return function() {
            return e;
        };
    }
}(!console));
