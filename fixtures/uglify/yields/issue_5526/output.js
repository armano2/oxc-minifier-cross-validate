(async function*() {
    try {
        while (console.log("foo"));
        return void 0;
    } finally {
        console.log("bar");
    }
})().next();
console.log("baz");
