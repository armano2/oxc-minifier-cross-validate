(async function() {
    try {
        for await (var a of console.log("PASS"));
    } catch (e) {}
})();
