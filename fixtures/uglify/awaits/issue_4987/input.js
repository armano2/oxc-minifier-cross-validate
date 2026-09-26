(async function() {
    try {
        await 42;
    } finally {
        console.log("foo");
    }
})();
console.log("bar");
