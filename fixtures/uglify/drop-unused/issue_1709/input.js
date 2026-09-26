console.log(
    function x() {
        var x = 1;
        return x;
    }(),
    function z() {
        function z() {}
        return z;
    }()
);
