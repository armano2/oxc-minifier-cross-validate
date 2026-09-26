(async function() {
    return {
        p(await) {},
    }.p;
})().then(function(a) {
    console.log(typeof a);
});
