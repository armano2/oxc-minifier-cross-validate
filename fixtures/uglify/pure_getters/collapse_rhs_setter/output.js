try {
    console.log({
        set length(v) {
            throw "PASS";
        }
    }.length = "FAIL");
} catch (e) {
    console.log(e);
}
