console.log(
    function() {
        var x = 1;
        return x;
    }(),
    function() {
        function z() {}
        return z;
    }()
);
