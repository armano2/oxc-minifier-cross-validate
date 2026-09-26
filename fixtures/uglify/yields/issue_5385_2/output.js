(async function*() {
    return function() {
        try {
            return console.log("foo");
        } finally {
            return console.log("bar");
        }
    }();
})().next();
console.log("moo");
