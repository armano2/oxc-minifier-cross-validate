function log(msg) {
    console.log(msg);
}
var a = 42, b = [ "PASS" ], c = [ "FAIL" ];
log(...a ? b : c);
