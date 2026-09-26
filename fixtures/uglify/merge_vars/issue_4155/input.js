(function() {
    try {
        throw "PASS";
    } catch (e) {
        var a;
        (function() {
            console.log(e, a);
        })(a = NaN);
    }
    var e = function() {};
    e && console.log(typeof e);
})();
