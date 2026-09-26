console.log(true.a, false.a);
console.log(true.valueOf(), false.valueOf());
try {
    console.log(null.a);
} catch (e) {
    console.log("PASS");
}
try {
    console.log(undefined.a);
} catch (e) {
    console.log("PASS");
}
