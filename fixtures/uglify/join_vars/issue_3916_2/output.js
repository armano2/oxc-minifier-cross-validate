var log = console.log, o = {
    p: "FAIL 1",
    __proto__: {
        get p() {
            return "FAIL 2";
        },
        set p(u) {
            log("FAIL 3");
        },
        set q(v) {
            log("PASS 1");
        },
        get q() {
            return "PASS 3";
        },
    },
};
o.p = "PASS 2";
o.q = "FAIL 4";
log(o.p);
log(o.q);
