console.log(void 0, void 0);
console.log(true, false);
try {
    console.log(null.a);
} catch (e) {
    console.log("PASS");
}
try {
    console.log((void 0).a);
} catch (e) {
    console.log("PASS");
}
