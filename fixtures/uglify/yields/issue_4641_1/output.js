console.log(typeof async function*() {
    try {
        console.log("foo");
        return;
    } finally {
        console.log("bar");
    }
}().next().then);
