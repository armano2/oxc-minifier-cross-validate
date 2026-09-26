function f(a) {
    return function() {
        try {
            return a;
        } finally {
            var b = 0;
        }
    }(a++ && this());
}
var c = f();
console.log(c);
