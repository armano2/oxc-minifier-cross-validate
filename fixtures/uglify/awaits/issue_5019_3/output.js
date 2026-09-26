for (var i in "foo") {
    (function(a) {
        (async function() {
            console.log(await "async", a);
        })();
    })(i);
    console.log("sync", i);
}
