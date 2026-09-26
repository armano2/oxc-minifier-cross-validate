var a = "FAIL";
(function([
    {
        [function() {
            for (a in { PASS: null });
        }()]: b,
    },
]) {})([ 42 ]);
console.log(a);
