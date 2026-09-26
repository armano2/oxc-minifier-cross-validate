var log = console.log;
var o = {
    get PASS() {
        a = "FAIL";
    },
};
var a = "PASS", b;
o[b = a];
log(b);
