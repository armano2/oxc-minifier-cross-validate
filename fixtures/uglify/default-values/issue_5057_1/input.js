var a = 42;
(function() {
    var b = function(c = (console.log("foo"), b = a)) {
        a && console.log("bar");
    }();
})();
