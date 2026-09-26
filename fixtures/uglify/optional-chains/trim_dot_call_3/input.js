try {
    ({ p: null })?.p();
} catch (e) {
    console.log("PASS");
}
