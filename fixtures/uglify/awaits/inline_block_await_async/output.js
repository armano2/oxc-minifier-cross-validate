(async function() {
    console.log("foo");
    while (await console.log("bar"));
    console.log("baz");
    await 0;
    console.log("moo");
})().then(console.log);
console.log("moz");
