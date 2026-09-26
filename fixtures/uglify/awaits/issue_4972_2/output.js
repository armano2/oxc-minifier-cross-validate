console.log("foo");
(async function() {
    try {
        console.log("bar");
    } finally {
        return "baz";
    }
})().then(console.log);
console.log("moo");
