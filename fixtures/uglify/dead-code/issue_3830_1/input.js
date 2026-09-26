var o = {
    set p(v) {
        o = o.p = o = v;
    }
};
o.p = "PASS";
console.log(o);
