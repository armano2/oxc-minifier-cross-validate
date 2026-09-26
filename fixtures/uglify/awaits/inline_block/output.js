console.log("foo");
(async function() {
    console.log("bar");
    for (var a of [ "baz" ])
        return void await a;
})().then(console.log);
console.log("moo");
