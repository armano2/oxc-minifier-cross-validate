function f() {
    do {
        (function() {
            var a = {
                p: [ a ] = [],
            };
        })();
    } while (console.log("PASS"));
}
f();
