var a = "foo";
(async function() {
    console.log(a, await a, a, await a);
})();
a = "bar";
