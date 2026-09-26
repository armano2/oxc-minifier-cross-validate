console.log("foo");
(async function() {
    console.log("bar");
    for (var a of [ "baz" ])
        return void await {
            then(r) {
                console.log("moo");
                r(a);
            },
        };
})().then(console.log);
console.log("moz");
