console.log(function(c) {
    ({
        a: 3,
        b: 4,
    });
    return {
        x: c.a,
        y: c.b,
    };
}({
    a: 1,
    b: 2,
}));
