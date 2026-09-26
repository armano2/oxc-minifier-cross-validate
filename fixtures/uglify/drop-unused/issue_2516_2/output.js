function foo() {
    Baz = function(x) {
        (function(x) {
            var value = (4 - 1) * (x || never_called());
            console.log(6 == value ? "PASS" : value);
        }).call(null, x);
    };
}
var Baz;
foo();
Baz(2);
