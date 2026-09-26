(async function() {
    await async function f() {
        console.log(f.length);
    }();
})();
