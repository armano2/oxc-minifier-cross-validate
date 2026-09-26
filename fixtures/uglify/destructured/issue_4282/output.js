(function(a) {
    ({
        [a = "bar"]: 0[console.log(a)],
    } = 0);
})("foo");
