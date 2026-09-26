(function(a) {
    return a = function*() {
        console.log(typeof a);
    }();
})().next();
