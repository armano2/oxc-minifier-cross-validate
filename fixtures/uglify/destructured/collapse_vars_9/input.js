console.log(function(a) {
    try {
        var b = function([ c ]) {
            if (c)
                return "FAIL 1";
        }();
        a = "FAIL 2";
        return b;
    } catch (e) {
        return a;
    }
}("PASS"));
