var log = console.log;
var o = {
    get [(a = "FAIL 1", "PASS")]() {
        a = "FAIL 2";
    },
};
var a = "PASS", b;
o[b = a];
log(b);
