(function(a, b) {
    a = b = function() {};
    b.p = a;
    b = a = function() {};
    a.q = b;
})();
