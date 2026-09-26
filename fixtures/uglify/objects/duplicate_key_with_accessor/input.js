[
    {
        a: 0,
        b: 1,
        a: 2,
        set b(v) {},
    },
    {
        a: 3,
        b: 4,
        get a() {
            return 5;
        },
        a: 6,
        b: 7,
        a: 8,
        b: 9,
    },
].forEach(function(o) {
    for (var k in o)
        console.log(k, o[k]);
});
