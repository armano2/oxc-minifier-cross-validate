var a = 0;
a = a + 1;
var a = function f(b) {
    return function() {
        return b;
    };
}(2);
console.log(typeof a);
