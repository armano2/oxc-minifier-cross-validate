(async function() {
    while (console.log("foo"));
    await 0;
    console.log("bar");
})();
console.log("baz");
