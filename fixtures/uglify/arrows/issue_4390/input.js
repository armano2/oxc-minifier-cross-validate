function log() {
    console.log.apply(console, arguments);
}
var a = 42, b = "FAIL";
b = "PASS";
(c => log(b, c))(a);
log(b);
