(function(t) {
    t = {};
    ({
        get p() {},
        q: (console.log("PASS"), +t),
    }).r;
})();
