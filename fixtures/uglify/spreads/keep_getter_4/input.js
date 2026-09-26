var o = {
    get p() {
        console.log("PASS");
    },
};
({
    q: o,
    ...o,
});
