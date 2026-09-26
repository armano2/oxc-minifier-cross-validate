var o = {
    get p() {
        console.log("PASS");
    },
};
({
    ...o,
});
