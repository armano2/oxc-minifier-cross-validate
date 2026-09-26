var o = {
    get PASS() {
        a = "FAIL";
    },
};
var a = "PASS", b;
o[b = a];
console.log(b);
