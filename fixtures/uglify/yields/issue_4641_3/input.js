console.log(typeof async function*() {
    try {
        return void "FAIL";
    } finally {
        console.log("PASS");
    }
}().next().then);
