console.log("foo");
try {
    (async function() {
        return await "bar";
    })().then(console.log);
} finally {
    console.log("baz");
}
console.log("moo");
