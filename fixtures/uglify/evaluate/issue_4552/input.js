var a = function f(b) {
    return function() {
        b++;
        try {
            return b;
        } catch (e) {}
    }();
}();
console.log(a);
