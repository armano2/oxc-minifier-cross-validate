function n(o, e, u) {
    "use asm";
    function d(n, o) {
        n = n | 0;
        o = o | 0;
        return n + o | 0;
    }
    return {
        add: d
    };
}
console.log(new n().add("foo", 42));
