console.log("foo");
(async function() {
    console.log("bar");
    await async function() {
        for (var a of [ "baz" ])
            return {
                then(r) {
                    console.log("moo");
                    r(a);
                },
            };
    }();
})().then(console.log);
console.log("moz");
