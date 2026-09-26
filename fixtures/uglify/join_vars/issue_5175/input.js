function log(f) {
    console.log(f(), A.p);
}
log(function() {
    return (A = {}).p = "PASS";
});
