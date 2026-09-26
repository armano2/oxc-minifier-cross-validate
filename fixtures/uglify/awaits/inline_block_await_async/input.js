(async function() {
    console.log("foo");
    await (async function() {
        while (await console.log("bar"));
        console.log("baz");
    })();
    console.log("moo");
})().then(console.log);
console.log("moz");
