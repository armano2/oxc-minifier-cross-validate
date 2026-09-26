(function({
    [function() {
        (function({
            [function() {
                console.log(typeof f, typeof g, typeof h);
            }()]: a
        }) {
            function f() {}
        })(1);
        function g() {}
    }()]: b
}) {
    function h() {}
})(2);
