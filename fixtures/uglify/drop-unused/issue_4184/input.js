(function() {
    var a = function() {}, b = [ a, 1 && b, a = {} ];
    try {
        throw 42;
    } catch (a) {
        {
            console.log(a);
        }
    }
})();
