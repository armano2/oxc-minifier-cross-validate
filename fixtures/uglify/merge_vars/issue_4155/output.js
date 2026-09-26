(function() {
    try {
        throw "PASS";
    } catch (e) {
        var a;
        a = NaN,
        void console.log(e, a);
    }
    var e = function() {};
    e && console.log(typeof e);
})();
