try {
    (function(a) {
        var b = 1;
        (function f() {
            try {
                b-- && f();
            } catch (c) {}
            console.log(a);
            a = 42 in (a = "bar");
        })();
    })("foo");
} catch (e) {}
