(function(a, b) {
    a = function f() {
        if (a)
            if (b--)
                setImmediate(f);
            else
                console.log("FAIL");
        else
            console.log("PASS");
    }();
})(42, 1);
