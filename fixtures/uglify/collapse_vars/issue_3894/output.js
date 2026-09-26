function log(msg) {
    console.log(msg ? "FAIL" : "PASS");
}
var a, c;
void log(-(a = c = 0));
log(a);
log(c);
