console.log("foo");
(async function() {
    try {
        return await "bar";
    } finally {
        console.log("baz");
    }
})().then(console.log);
console.log("moo");
