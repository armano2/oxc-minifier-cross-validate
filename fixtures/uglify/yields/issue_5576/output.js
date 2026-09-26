(async function*() {
    try {
        while (console.log("foo"));
    } finally {
        console.log("bar");
    }
})().next();
console.log("baz");
