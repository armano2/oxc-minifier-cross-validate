var a, b;
function f({
    [function() {
        if (++a)
            return 42;
    }()]: c
}) {}
f(b = f);
console.log(typeof b);
