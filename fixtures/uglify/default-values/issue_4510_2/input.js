var o = {
    p: void 0,
};
var {
    p: a = console.log("PASS"),
} = {
    p: null,
    ...o,
};
