var Math = {
    square: function(n) {
        return n * n;
    },
    cube: function(n) {
        return n * n * n;
    }
};
console.log(function(factory) {
    return factory();
}(function() {
    return function(Math) {
        return function(n) {
            Math = {
                square: function(x) {
                    return "(SQUARE" + x + ")";
                },
                cube: function(x) {
                    return "(CUBE" + x + ")";
                }
            };
            return Math.square(n) + Math.cube(n);
        };
    }(Math);
})(2));
console.log(Math.square(3), Math.cube(3));
