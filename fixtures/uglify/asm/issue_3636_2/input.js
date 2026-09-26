var n = function(stdlib, foreign, buffer) {
    "use asm";
    function add(x, y) {
        x = x | 0;
        y = y | 0;
        return x + y | 0;
    }
    return {
        add: add
    };
};
console.log(new n().add("foo", 42));
