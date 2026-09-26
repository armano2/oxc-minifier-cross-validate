function log(msg) {
    console.log(msg);
}
var a = "FAIL";
try {
    a = "PASS";
    0 in null;
    log("FAIL", a);
} catch (e) {}
log(a);
