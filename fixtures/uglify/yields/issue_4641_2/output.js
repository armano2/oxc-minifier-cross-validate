console.log(typeof async function*() {
    try {
        return void 0;
    } finally {
        console.log("PASS");
    }
}().next().then);
