(function(a) {
    ({
        ...a,
    });
})({
    get p() {
        console.log("PASS");
    },
});
