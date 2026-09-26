try {
    new function() {}(...42);
} catch (e) {
    console.log("PASS");
}
