var Math = {
    square: function(n) {
        return n * n;
    }
};
console.log((function(factory) {
    return factory();
})(function() {
    return function(Math) {
        return function(n) {
            return Math.square(n);
        };
    }(Math);
})(3));
