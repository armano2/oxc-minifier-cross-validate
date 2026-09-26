var a = "FAIL";
var o = {
    get p() {
        return a;
    }
};
a = "PASS";
console.log(o.p, a);
