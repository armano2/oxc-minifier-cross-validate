({
    ...{
        get p() {
            console.log("PASS");
        },
    },
    get q() {
        console.log("FAIL");
    },
});
