[
    () => {
        console.log("FAIL 1");
    },
    function*() {
        console.log("FAIL 2");
    },
    async () => {
        console.log("FAIL 3");
    },
    async function*() {
        console.log("PASS");
    },
][3]().next();
