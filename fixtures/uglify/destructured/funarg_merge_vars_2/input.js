var a = 0;
(function f({
    [a]: b,
}) {
    var a = typeof b;
    console.log(a);
})([ 42 ]);
