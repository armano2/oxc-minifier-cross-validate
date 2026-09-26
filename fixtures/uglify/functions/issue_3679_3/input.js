(function() {
    var f = function() {};
    f.p = "PASS";
    f.g = function() {
        console.log(f.p);
    };
    f.g();
})();
