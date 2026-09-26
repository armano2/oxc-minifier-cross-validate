(function() {
    var a;
    (function() {
        console.log(a);
    })(a);
    var b = function() {};
    b && console.log(typeof b);
})();
