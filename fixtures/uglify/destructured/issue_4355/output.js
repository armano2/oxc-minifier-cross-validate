var a;
(function({
    [function() {
        for (a in "foo");
    }()]: b,
}) {})(0);
console.log(a);
