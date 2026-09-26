function foo() {
    Baz = function(x) {
        (function(x) {
            var trouble = x || never_called();
            var value = (4 - 1) * trouble;
            console.log(6 == value ? "PASS" : value);
        }).call(null, x);
    };
}
var Baz;
foo();
Baz(2);
