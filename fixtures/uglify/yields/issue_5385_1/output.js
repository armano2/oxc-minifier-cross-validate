(async function*() {
    (function() {
        try {
            return console.log("foo");
        } finally {
            return console.log("bar");
        }
        console.log("baz");
    })();
})().next();
console.log("moo");
