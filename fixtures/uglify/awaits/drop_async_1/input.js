console.log(function(a) {
    (async function() {
        a *= 7;
    })();
    return a;
}(6));
