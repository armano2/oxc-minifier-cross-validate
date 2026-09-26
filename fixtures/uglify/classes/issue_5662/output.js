console.log(new (function() {
    var g = function(a) {
        return a;
    };
    return class {
        h(b) {
            return g(b);
        }
    };
}())().h("PASS"));
