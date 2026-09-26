var a;
[ {
    p: {},
    ...a
} ] = [ {
    p: (console.log("PASS"), {
        q: a,
    } = 42),
} ];
