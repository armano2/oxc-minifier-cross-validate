(async function() {
    (async function() {
        for await (var k of []);
    })();
    console.log("foo");
})();
console.log("bar");
