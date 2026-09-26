var a = "FAIL";
var o = { a: "PASS" };
o.p = {
    q() {
        return this.a;
    },
}.q;
console.log(o.p());
