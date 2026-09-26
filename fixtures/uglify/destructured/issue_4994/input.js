var a = "FAIL";
(function([
    {
        [function() {
            for (a in { PASS: null });
        }()]: b,
    },
]) {
    var a;
})([ 42 ]);
console.log(a);
