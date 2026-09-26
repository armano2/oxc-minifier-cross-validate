function* f() {
    (function() {
        h`foo`;
    })();
    function h(s) {
        console.log(s[0]);
    }
    h([ "bar" ]);
}
f().next();
