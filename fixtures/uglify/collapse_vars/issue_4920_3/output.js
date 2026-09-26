var log = console.log;
var o;
var a = "PASS", b;
({
    get PASS() {
        a = "FAIL";
    },
})[b = a];
log(b);
