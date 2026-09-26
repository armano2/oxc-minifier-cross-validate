var Math = {
    square: function(n) {
        return n * n;
    },
    cube: function(n) {
        return n * n * n;
    }
};
console.log(function(Math) {
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
}()(2));
console.log(Math.square(3), Math.cube(3));
