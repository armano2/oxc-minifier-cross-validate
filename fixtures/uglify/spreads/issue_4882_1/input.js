var o = {
    p: "PASS",
    ... {
        __proto__: {
            p: "FAIL 1",
            q: "FAIL 2",
        },
    },
};
console.log(o.p);
console.log(o.q);
