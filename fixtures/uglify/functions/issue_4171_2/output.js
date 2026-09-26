console.log(function(a) {
    try {
        while (a);
    } catch (e) {
        return function() {
            return e;
        };
    } finally {
        function e() {}
    }
}(!console));
