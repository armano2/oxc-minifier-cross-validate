console.log("foo");
(async function() {
    try {
        console.log("bar");
    } finally {
        return await "baz";
    }
})().then(console.log);
console.log("moo");
