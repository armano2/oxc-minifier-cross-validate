(function f() {
    new function(a) {
        console.log(typeof f, 2 ** 30, typeof this);
    }(A = 0);
})();
