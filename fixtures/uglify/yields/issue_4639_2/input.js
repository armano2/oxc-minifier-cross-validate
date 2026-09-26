(function*() {
    console.log(function() {
        return typeof yield;
    }());
})().next();
