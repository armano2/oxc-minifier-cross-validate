function log(msg) {
    console.log(msg ? "FAIL" : "PASS");
}
var a;
(function(b) {
    a = 0,
    log(b);
})(-0);
