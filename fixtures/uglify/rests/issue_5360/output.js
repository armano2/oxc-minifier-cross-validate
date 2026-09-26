var a;
console.log(function({ p: {}, ...b }) {
    return b.q;
}({
    p: ~a && ([ a ] = []),
    q: "PASS",
}));
