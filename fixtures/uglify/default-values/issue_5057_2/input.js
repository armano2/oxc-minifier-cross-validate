(function f(a) {
    (function(b = console.log("FAIL")) {})(a);
})(42);
console.log(typeof b);
