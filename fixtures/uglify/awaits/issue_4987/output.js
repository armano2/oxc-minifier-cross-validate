(async function() {
    try {
        await 0;
    } finally {
        console.log("foo");
    }
})();
console.log("bar");
