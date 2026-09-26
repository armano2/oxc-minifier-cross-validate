(function(a) {
    (async function() {
        await 42;
        console.log(a);
    })();
    a = "PASS";
})("FAIL");
