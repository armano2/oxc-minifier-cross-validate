var a = true;
(function() {
    (function(b, c) {
        var d = async function() {
            c = await null;
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
