({
    p() {
        console.log("FAIL 1");
    },
    *q() {
        console.log("FAIL 2");
    },
    async r() {
        console.log("FAIL 3");
    },
    async *s() {
        console.log("PASS");
    },
}).s().next();
