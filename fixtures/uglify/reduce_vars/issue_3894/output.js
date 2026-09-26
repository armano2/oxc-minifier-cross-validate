function log(msg) {
    console.log(msg ? "FAIL" : "PASS");
}
var a;
void log(-(a = 0));
