({
    ...(console.log("foo"), {
        get p() {
            console.log("bar");
        },
    }),
});
