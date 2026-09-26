(async function*() {
    try {
        return function() {
            while (console.log("foo"));
        }();
    } finally {
        console.log("bar");
    }
})().next();
console.log("baz");
