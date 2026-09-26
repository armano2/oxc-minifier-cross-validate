var foo = function(bar) {
    function n(a, b) {
        return a + b;
    }
    function runSumAll(arg) {
        return arg.reduce(n, 0);
    }
    bar.baz = function(arg) {
        var n = runSumAll(arg);
        return (n.get = 1), n;
    };
    return bar;
};
var bar = foo({});
console.log(bar.baz([1, 2, 3]));
