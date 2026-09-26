(async function() {
    var f = async function(a, b, c) {
        return b + a + c + c;
    };
    console.log(await f("A", "P", "S"));
})();
