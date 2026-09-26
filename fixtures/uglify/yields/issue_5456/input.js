var a = true;
(function() {
    (function(b, c) {
        var d = function*() {
            c = null;
        }();
        var e = function() {
            if (c)
                console.log(typeof d);
            while (b);
        }();
    })(function(i) {
        return console.log("foo") && i;
    }(a));
})();
