var a = "q", o = {
    p: "PASS",
};
o.p = o.p;
o[a] = o[a];
console.log(o.p, o[a]);
