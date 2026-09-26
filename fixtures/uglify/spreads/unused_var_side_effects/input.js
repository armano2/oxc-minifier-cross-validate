(function f(a) {
    var b = {
        ...a,
    };
})({
    get p() {
        console.log("PASS");
    },
});
