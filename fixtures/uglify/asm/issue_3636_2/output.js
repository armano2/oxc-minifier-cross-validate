var n = function(n, o, e) {
    "use asm";
    function r(n, o) {
        n = n | 0;
        o = o | 0;
        return n + o | 0;
    }
    return {
        add: r
    };
};
console.log(new n().add("foo", 42));
