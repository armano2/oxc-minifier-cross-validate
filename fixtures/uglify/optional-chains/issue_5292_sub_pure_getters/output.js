var o = {
    get p() {
        console.log("foo");
    }
};
o?.[console.log("bar")];
