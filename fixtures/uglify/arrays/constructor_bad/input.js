try {
    Array(NaN);
    console.log("FAIL1");
} catch (ex) {
    try {
        new Array(NaN);
        console.log("FAIL2");
    } catch (ex) {
        console.log("PASS");
    }
}
try {
    Array(3.14);
    console.log("FAIL1");
} catch (ex) {
    try {
        new Array(3.14);
        console.log("FAIL2");
    } catch (ex) {
        console.log("PASS");
    }
}
