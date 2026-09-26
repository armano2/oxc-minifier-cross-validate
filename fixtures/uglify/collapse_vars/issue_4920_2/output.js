var o;
var a = "PASS", b;
({
    get PASS() {
        a = "FAIL";
    },
})[b = a];
console.log(b);
