console.log("foo");
(async function() {
    console.log("bar");
    for (var a of [ "baz" ])
        return a;
})().then(console.log);
console.log("moo");
