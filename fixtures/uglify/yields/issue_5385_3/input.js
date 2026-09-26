(async function*() {
    return function() {
        try {
            throw console.log("foo");
        } catch (e) {
            return console.log("bar");
        }
    }();
})().next();
console.log("moo");
