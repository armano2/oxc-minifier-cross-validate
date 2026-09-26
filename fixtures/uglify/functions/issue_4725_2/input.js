var o = {
    f() {
        return function() {
            while (console.log("PASS"));
        }();
    }
};
o.f();
