var a = "FAIL";
var o = {
    set FAIL(v) {
        a = o[a] = a = v;
    }
};
o[a] = "PASS";
console.log(a);
