console.log("foo");
(async function() {
    console.log("bar");
    return async function() {
        for (var a of [ "baz" ])
            return a;
    }();
})().then(console.log);
console.log("moo");
