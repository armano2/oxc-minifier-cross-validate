function log(msg) {
    console.log(msg ? "FAIL" : "PASS");
}
var a, c;
(function(b) {
    a = c = 0,
    log(b);
})(-0);
log(a);
log(c);
