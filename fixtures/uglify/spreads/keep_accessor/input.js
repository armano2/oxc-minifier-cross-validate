var o = {
    ...{
        get p() {
            console.log("GET");
            return this.r;
        },
        set q(v) {
            console.log("SET", v);
        },
        r: 42,
    },
    r: null,
};
for (var k in o)
    console.log(k, o[k]);
