var log = console.log;
(function() {
    return a = "PASS",
        a = log(a),
        d = log,
        void (a && log(d));
    var a, d;
})();
