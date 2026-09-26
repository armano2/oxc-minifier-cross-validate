try {
    (function(a) {
        [ a.p ] = 42;
    })(console.log("PASS"));
} catch (e) {}
