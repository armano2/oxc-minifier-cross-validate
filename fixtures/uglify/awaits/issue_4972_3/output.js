console.log("foo");
try {
    (async function() {
        return "bar";
    })().then(console.log);
} finally {
    console.log("baz");
}
console.log("moo");
