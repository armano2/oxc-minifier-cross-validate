var a = "q", o = {
    p: "FAIL",
    get q() {
        return "PASS";
    },
    set q(v) {
        this.p = v;
    },
};
o.p = o.p;
o[a] = o[a];
console.log(o.p, o[a]);
