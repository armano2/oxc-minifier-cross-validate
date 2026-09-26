function* f() {
    function g() {
        h`foo`;
    }
    g();
    function h(s) {
        console.log(s[0]);
    }
    h([ "bar" ]);
}
f().next();
