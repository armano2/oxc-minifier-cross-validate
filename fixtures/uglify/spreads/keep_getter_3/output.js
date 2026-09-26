({
    ...function() {
        return {
            get p() {
                console.log("PASS");
            },
        };
    }(),
});
